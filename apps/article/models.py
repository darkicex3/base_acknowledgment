# from django.db import models
#
# class Tags(models.Model):
#
#
# class Article(models.Model):
#
#     customer = models.ForeignKey(Customer, on_delete=models.CASCADE)
#     reference = models.CharField(max_length=200)
#     expiration_date = models.DateField(default=date.today)
#     date = models.DateField(default=date.today)
#     OFFER_STATES_CHOICES = (
#         ('ACCEPTED', 'STATE_ACCEPTED'),
#         ('WAITING', 'STATE_WAITING'),
#         ('REFUSED', 'STATE_REFUSED'),
#     )
#     status = models.CharField(max_length=10, choices=OFFER_STATES_CHOICES, default='WAITING')
#
#     def get_money_offer(self):
#         list_products = self.products.all()
#         total_price = 0
#         for e in list_products:
#             total_price = total_price + e.selling_cost
#
#         return total_price
#
# class Category(models.Model):
#     products = models.ManyToManyField(Product)
#     customer = models.ForeignKey(Customer, on_delete=models.CASCADE)
#     reference = models.CharField(max_length=200)
#     expiration_date = models.DateField(default=date.today)
#     date = models.DateField(default=date.today)
#     OFFER_STATES_CHOICES = (
#         ('ACCEPTED', 'STATE_ACCEPTED'),
#         ('WAITING', 'STATE_WAITING'),
#         ('REFUSED', 'STATE_REFUSED'),
#     )
#     status = models.CharField(max_length=10, choices=OFFER_STATES_CHOICES, default='WAITING')
#
#     def get_money_offer(self):
#         list_products = self.products.all()
#         total_price = 0
#         for e in list_products:
#             total_price = total_price + e.selling_cost
#
#         return total_price
