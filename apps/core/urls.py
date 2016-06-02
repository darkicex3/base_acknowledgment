from django.conf.urls import url
from . import views

app_name = 'core'
urlpatterns = [
    url(r'^$', views.index, name='home'),
    url(r'^poll_fab/', views.poll, name='poll'),
]
