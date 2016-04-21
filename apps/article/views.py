from django.http import JsonResponse
from apps.article.models import Category, Article
from django.shortcuts import render_to_response
from django.views.generic import View
from haystack.query import SearchQuerySet


class SearchAjaxView(View):

    def post(self, *args, **kwargs):
        """
        :param args:
        :param kwargs:
        :return:
        """
        context = {}
        search_text = self.request.POST.get('search_text')

        articles = SearchQuerySet().autocomplete(content_auto_title=search_text,
                                                 content_auto_content=search_text,
                                                 content_auto_description=search_text)

        categories = SearchQuerySet().autocomplete(content_auto=search_text)
        tags = SearchQuerySet().autocomplete(content_auto=search_text)

        return render_to_response('search/search.html', {'articles' : articles, 'categories' : categories, 'tags' : tags})


class GetCategoriesView(View):
    def get(self):

        context = {}
        node_id = self.request.GET.get('node_id')
        previous = self.request.GET.get('previous')

        print(node_id)

        if node_id is None:
            categories = Category.objects.all().filter(level=0)
        else:
            node_category = Category.objects.all().get(pk=node_id)
            if previous == 'false':
                print(previous)
                categories = node_category.get_children()
            else:
                categories = node_category.get_previous_parent().get_children()

        for category in categories: context.update({category.id: str(category.name)})

        return JsonResponse(context)


class GetArticlesView(View):
    def get(self):

        context = {}
        get_by = self.request.GET.get('get_articles_by')
        current_user = self.request.user

        if get_by == 'home':
            articles = SearchQuerySet().order_by('publish_date')
        elif get_by == 'most_used':
            articles = SearchQuerySet().order_by('useful_counter')
        elif get_by == 'most_viewed':
            articles = SearchQuerySet().order_by('view_counter')
        elif get_by == 'most_loved':
            articles = SearchQuerySet().order_by('favorite_counter')
        elif get_by == 'favorites':
            articles = current_user.get_related_favorite()
        elif get_by == 'viewed':
            articles = current_user.get_related_articles_viewed()
        elif get_by == 'last_update':
            return 0
        elif get_by == 'recent':
            articles = SearchQuerySet().all().order_by('publish_date')
        else:
            context['error'] = True
            return JsonResponse(context)

        for article in articles: context.update({article.id: {
            'title':    article.title,
            'author':   article.author,
            'desc':     article.description,
            'pub_date': article.publish_date,
            'useful':   article.useful_counter,
            'viewed':   article.view_counter,
            'loved':    article.favorite_counter
        }})

        return JsonResponse(context)


class SortArticlesView(View):
    def get(self):

        context = {}

        # LOGIC HERE

        return JsonResponse(context)
