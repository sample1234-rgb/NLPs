from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from rest_framework import status
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from base.serializers import ProductSerializer
from base.models import Product, Review

import bson # objectId field

@api_view(['GET'])
def getProducts(request):
    query = request.query_params.get('keyword')
    if query is None:
        query=''
    products = Product.objects.filter(name__icontains=query)
    page = request.query_params.get('page')
    paginator = Paginator(products, 2)
    try:
        paginator.page(page)
    except PageNotAnInteger:
        paginator.page(1)
    except EmptyPage:
        paginator.page(paginator.num_pages)
    if page is None:
        page = 1
    page = int(page)

    serializer = ProductSerializer(products, many=True)
    return Response({'products': serializer.data, 'page': page, 'pages': paginator.num_pages})

@api_view(['GET'])
def getTopProduct(request):
    products = Product.objects.filter(ratings__gte=4).order_by('-ratings')
    serializer = ProductSerializer(products, many=True)
    return Response({'products':serializer.data})
    
@api_view(['GET'])
def getProduct(request, id):
    product = Product.objects.get(_id=bson.ObjectId(id))
    serializer = ProductSerializer(product, many=False)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAdminUser])
def addProduct(request):
    data = request.data
    try:
        product = Product.objects.create(
            user=request.user,
            name=data['name'],
            price=data['price'],
            brand=data['brand'],
            count_in_stock=data['stock'],
            category=data['category'],
            image=data['image'],
        )
        print(data['image'])
        serializer = ProductSerializer(product, many=False)
        return Response(serializer.data)
    except:
        message = {'error': 'User with this email already exists.'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT'])
@permission_classes([IsAdminUser])
def updateProduct(request, id):
    product = Product.objects.get(_id=bson.ObjectId(id))
    data = request.data
    product.name = data['name']
    product.price = data['price']
    product.brand = data['brand']
    product.count_in_stock = data['stock']
    product.category = data['category']
    product.image = data['image']
    product.save()
    serializer = ProductSerializer(product, many=False)
    return Response(serializer.data)

@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def delProduct(request, id):
    product = Product.objects.get(_id=bson.ObjectId(id))
    product.delete()
    return Response('Product Deleted')

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def addProductReview(request, pk):
    user_ = request.user
    product = Product.objects.get(_id=bson.ObjectId(pk))
    data = request.data
    #   1. review already exists
    if product.review_set.filter(user=user_).exists():
        return Response({'details': 'product review already exists'}, status=status.HTTP_400_BAD_REQUEST)
    #   2. No ratings given
    elif data['rating'] == 0:
        return Response({'details': 'No ratings given'}, status=status.HTTP_406_NOT_ACCEPTABLE)
    #   3. Create new review
    review = Review.objects.create(
        user=user_,
        product=product,
        name=data['title'],
        review=data['comment'],
        ratings=data['rating'],
    )
    reviews = product.review_set.all()
    product.review_num = len(reviews)
    total = 0
    for i in reviews:
        total += i.ratings
    product.ratings = total / len(reviews)
    product.save()
    return Response({'details': 'Review Added'}, status=status.HTTP_201_CREATED)