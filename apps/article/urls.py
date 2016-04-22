from django.conf.urls import include, url
from django.contrib import admin
from apps.article import views


urlpatterns = [
    url(r'^search/', include('haystack.urls')),
    url(r'^search_ajax/', views.SearchAjaxView.as_view(), name='ajax_search_view'),
    url(r'^get_categories/', views.GetCategoriesView.as_view(), name='get_categories_view'),
    url(r'^get_articles/', views.GetArticlesByStaticShortcutsView.as_view(), name='get_article_by_static_shortcuts'),
    url(r'^sort_articles/', views.SortArticlesView.as_view(), name='sort_article_view'),
    url(r'^show_article_from_shorcuts/', views.ShowArticleFromShortcutView.as_view(), name='show_article_from_shorcuts'),
    url(r'^add_article_to_shortcut/', views.AddArticleToShortcutView.as_view(), name='add_article_to_shortcut'),
    url(r'^create_shortcut/', views.CreateShortcutView.as_view(), name='create_shortcut'),
]

