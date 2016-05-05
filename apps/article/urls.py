from django.conf.urls import include, url
from django.contrib import admin
from apps.article import views


urlpatterns = [
    url(r'^search/', include('haystack.urls')),
    url(r'^searching/', views.articles_search, name='articles_search_view'),
    url(r'^test_searching/', views.index_search, name='test_search_view'),
    url(r'^set_favorites/', views.SetLikedView.as_view(), name='set_liked_view'),
    url(r'^set_useful/', views.SetUsefulView.as_view(), name='set_useful_view'),
    url(r'^set_read/', views.SetReadView.as_view(), name='set_read_view'),
    url(r'^set_visited/', views.SetVisitedView.as_view(), name='set_visited_view'),
    url(r'^set_searched/', views.SetSearchedView.as_view(), name='set_searched_view'),
    url(r'^get_categories/', views.GetCategoriesView.as_view(), name='get_categories_view'),
    url(r'^get_articles/', views.GetArticlesByStaticShortcutsView.as_view(), name='get_article_by_static_shortcuts'),
    url(r'^sort_articles/', views.SortArticlesView.as_view(), name='sort_article_view'),
    url(r'^show_article_from_shorcuts/', views.ShowArticleFromShortcutView.as_view(), name='show_article_from_shorcuts'),
    url(r'^add_article_to_shortcut/', views.AddArticleToShortcutView.as_view(), name='add_article_to_shortcut'),
    url(r'^create_shortcut/', views.CreateShortcutView.as_view(), name='create_shortcut'),
    url(r'^show_article/', views.ShowArticleView.as_view(), name='ShowArticle'),
]

