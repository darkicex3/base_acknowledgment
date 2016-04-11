from django.conf.urls import url
from apps.prices import views


urlpatterns = [
    url(r'^update_data/', views.UpdateDataView.as_view(), name='update_data_view'),
    url(r'^create_product/', views.CreateProductView.as_view(), name='create_product_view'),
    url(r'^create_offer/', views.CreateOfferView.as_view(), name='create_offer_view'),
    url(r'^create_customer/', views.CreateCustomerView.as_view(), name='create_customer_view'),
    url(r'^', views.AuthenticationForm.as_view()),
]
