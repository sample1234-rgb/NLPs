from django.urls import path
from base.views import user_views as views

urlpatterns = [
    path('', views.getUsers, name='users'),
    path('profile/', views.getUserProfile, name='user-profile'),
    path('profile/update', views.updateUserProfile, name='user-profile-update'),
    path('register/', views.registerUser, name='register'),
    path('login/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),

    path('<str:pk>/', views.getUserProfileById, name='user'),
    path('update/<str:pk>/', views.updateUserProfileById, name='user-profile-id'),
    path('delete/<str:pk>/', views.deleteUserProfile, name='user-profile-delete'),
]