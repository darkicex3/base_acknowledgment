from django.conf.urls import url
from apps.users import views


urlpatterns = [
    url(r'^login/', views.LoginView.as_view(), name='login_view'),
    url(r'^register/', views.RegisterView.as_view(), name='register_view'),
    url(r'^logout/', views.LogoutView.as_view(), name='logout_view'),
    url(r'^is_connected/', views.LoginRequired.as_view(), name='is_connected_view')
]
