from django.db.models.signals import pre_save
from django.contrib.auth.models import User
from .models import Product

def updateUser(sender, instance, **kwargs):
    user = instance
    if user.email != '':
        user.username = user.email

def create_product(sender,instance, **kwargs):
    pass

pre_save.connect(updateUser, sender=User)
pre_save.connect(create_product,sender=Product)