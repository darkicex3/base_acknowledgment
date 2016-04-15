from django.conf.urls import include, url
from django.contrib import admin
from apps.article import views


urlpatterns = [
    url(r'^search/', include('haystack.urls')),
    url(r'^search_ajax/', views.SearchAjaxView.as_view(), name='ajax_search_view'),
    url(r'^get_categories/', views.GetCategoriesView.as_view(), name='get_categories_view'),

]
