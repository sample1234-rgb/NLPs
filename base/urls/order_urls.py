from django.urls import path
from base.views import order_views as views

urlpatterns = [
    path('', views.getOrders, name='orders'),

    path('add/', views.addOrders, name='order-add'),
    path('myOrders/', views.getMyOrders, name='myorders'),

    path('<int:id>/', views.getOrderById, name='user-Order'),
    path('<int:id>/pay/', views.payOrderById, name='pay-Order'),
    path('<int:id>/ship/', views.deliverOrderById, name='deliver-Order'),
]