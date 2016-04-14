from django.http import JsonResponse
from apps.article.models import Category
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

    def get(self, *args, **kwargs):

        context = {}

        categories = Category.objects.all().filter(level=0)
        for category in categories: context.update({category.id:str(category.name)})

        return JsonResponse(context)
