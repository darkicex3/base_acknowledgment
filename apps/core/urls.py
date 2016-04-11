from django.conf.urls import url
from . import views

app_name = 'core'
urlpatterns = [
    url(r'^$', views.index, name='home'),
    url(r'^contact/$', views.contact, name='contact'),
    url(r'^certificates/$', views.certificates, name='certificates'),
    url(r'^about/$', views.about, name='about'),
]
