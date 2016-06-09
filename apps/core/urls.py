from django.conf.urls import url
from . import views

app_name = 'core'
urlpatterns = [
    url(r'^$', views.index, name='home'),
    url(r'^poll_fab/', views.poll, name='poll'),
    url(r'^card/', views.card, name='card'),
    url(r'^daily_recap/', views.daily_recap, name='daily_recap'),
    url(r'^flex/', views.flex, name='flex'),
]
