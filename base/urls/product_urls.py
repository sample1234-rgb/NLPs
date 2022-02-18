from django.urls import path
from base.views import product_views as views

urlpatterns = [
    path('', views.getProducts, name='products'),
    path('top/', views.getTopProduct, name='top-products'),
    path('<str:id>/', views.getProduct, name='product'),
    path('update/<str:id>/', views.updateProduct, name='product-update'),
    path('delete/<str:id>/', views.delProduct, name='product-del'),
    path('add/', views.addProduct, name='product-add'),
    path('add/review/<str:pk>/', views.addProductReview, name='review-add'),
]