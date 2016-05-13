from django.conf.urls import url
from apps.registration import views


urlpatterns = [
    url(r'^login/$', 'django.contrib.auth.views.login', name='login'),
    url(r'^logout/$', 'django.contrib.auth.views.logout', {'next_page': '/registration/login/'}, name='logout'),
]
