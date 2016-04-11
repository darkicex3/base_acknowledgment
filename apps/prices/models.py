from django.db import models
from datetime import date
from datetime import datetime


class Product(models.Model):
    name = models.CharField(max_length=200)
    details = models.CharField(max_length=500)
    cost = models.PositiveIntegerField(default=0)
    selling_cost = models.PositiveIntegerField(default=0)
    note = models.TextField(max_length=2000)

    def get_selling_cost(self):
        return self.selling_cost

class Customer(models.Model):
    name = models.CharField(max_length=200)
    phone = models.CharField(max_length=200)
    mail = models.CharField(max_length=200)
    adresse1 = models.CharField(max_length=500)
    adresse2 = models.CharField(max_length=500)
    zip_code = models.CharField(max_length=200)
    city = models.CharField(max_length=200)
    state = models.CharField(max_length=200)
    country = models.CharField(max_length=200)
    note = models.CharField(max_length=2000)

class Offer(models.Model):
    products = models.ManyToManyField(Product)
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE)
    reference = models.CharField(max_length=200)
    expiration_date = models.DateField(default=date.today)
    date = models.DateField(default=date.today)
    OFFER_STATES_CHOICES = (
        ('ACCEPTED', 'STATE_ACCEPTED'),
        ('WAITING', 'STATE_WAITING'),
        ('REFUSED', 'STATE_REFUSED'),
    )
    status = models.CharField(max_length=10, choices=OFFER_STATES_CHOICES, default='WAITING')

    def get_money_offer(self):
        list_products = self.products.all()
        total_price = 0
        for e in list_products:
            total_price = total_price + e.selling_cost

        return total_price






