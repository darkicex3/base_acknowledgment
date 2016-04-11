from django.contrib import admin

from .models import Product, Customer, Offer

admin.site.register(Product)
admin.site.register(Customer)
admin.site.register(Offer)