from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from rest_framework import status
from base.serializers import OrderSerializer
from base.models import Product, Order, OrderItem, ShippingAddress
from datetime import datetime

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def addOrders(request):
    user = request.user
    print(request.user)
    data = request.data
    orderItems = data['orderItems']
    if orderItems and len(orderItems) == 0:
        return Response({'Details': 'No Orders found'}, status=status.HTTP_400_BAD_REQUEST)
    # else:
    #     1. Create an order
    order = Order.objects.create(
        user=user,
        tax_price=data['taxPrice'],
        shipping_price=data['shippingPrice'],
        total_price=data['totalPrice'],
        payment_method=data['paymentMethod'],
    )
    #     2. Create a shipping addresss
    shippingAddress = ShippingAddress.objects.create(
        order=order,
        address=data['shippingAddress']['address'],
        city=data['shippingAddress']['city'],
        country=data['shippingAddress']['country'],
        postal_code=data['shippingAddress']['postalCode'],
    )
    #     3. Create order items and connect them to order
    for i in orderItems:
        p = Product.objects.get(_id=i['product'])
        item = OrderItem.objects.create(
            product=p,
            order=order,
            name=p.name,
            price=i['price'],
            quantity=i['qnty'],
            image=p.image.url.split('/')[2],
        )
        print(p.image.url.split('/')[2])
        #     4. Update Product count_in_stock
        p.count_in_stock -= i['qnty']
        p.save()

    serializer = OrderSerializer(order, many=False)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getMyOrders(request):
    user = request.user
    order = user.order_set.all()
    serializer = OrderSerializer(order, many=True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAdminUser])
def getOrders(request):
    order = Order.objects.all()
    serializer = OrderSerializer(order, many=True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getOrderById(request, id):
    user = request.user
    try:
        order = Order.objects.get(_id=id)
        if user.is_staff or order.user == user:
            serializer = OrderSerializer(order, many=False)
            return Response(serializer.data)
        else:
            return Response({'detail': 'Not authorized'}, status=status.HTTP_400_BAD_REQUEST)
    except:
        return Response({'deatil': 'Order does not exists'}, status=status.HTTP_404_NOT_FOUND)
    # return Response({'error': 'idontknow'}, status=status.HTTP_401_UNAUTHORIZED)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def payOrderById(request, id):
    order = Order.objects.get(_id=id)
    order.is_paid = True
    order.paid_at = datetime.now()
    order.save()
    return Response('order Paid')

@api_view(['PUT'])
@permission_classes([IsAdminUser])
def deliverOrderById(request, id):
    order = Order.objects.get(_id=id)
    order.is_delivered = True
    order.delivered_at = datetime.now()
    order.save()
    return Response('order Paid')