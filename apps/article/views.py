from django.http import JsonResponse
from apps.article.models import Category, Article, Shortcut, UserArticle
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


class SetLikedView(View):
    def get(self, *args, **kwargs):
        context = {}
        article_id = self.request.GET.get('shortcut_id')
        current_user = self.request.user

        p = UserArticle.objects.all().get(user_id=current_user.id, article_id=article_id)
        if not p:
            if UserArticle.objects.create(user_id=current_user.id, article_id=article_id, favorites=True):
                context.update({'success': True})
        else:
            p.favorites = True
            context.update({'success': True})

        return JsonResponse(context)


# class SetUsefulView(View):                                TODODODODODO
#     def get(self, *args, **kwargs):
#         context = {}
#         article_id = self.request.GET.get('shortcut_id')
#         current_user = self.request.user
#
#         return JsonResponse(context)
#
#
# class SetVisitedView(View):                               TODODODODODO
#     def get(self, *args, **kwargs):
#         context = {}
#         article_id = self.request.GET.get('shortcut_id')
#         current_user = self.request.user
#
#         return JsonResponse(context)
#
#
# class SetSearchedView(View):                              TODODODODODO
#     def get(self, *args, **kwargs):
#         context = {}
#         article_id = self.request.GET.get('shortcut_id')
#         current_user = self.request.user
#
#         return JsonResponse(context)


class CreateShortcutView(View):
    def get(self, *args, **kwargs):

        context = {}
        shortcut_name = self.request.GET.get('shortcut_name')
        shortcut = Shortcut.objects.create(name=shortcut_name)

        if shortcut:
            context['success'] = True

        return JsonResponse(context)


class AddArticleToShortcutView(View):
    def get(self, *args, **kwargs):

        context = {}
        article_id = self.request.GET.get('article_id')
        shortcut_id = self.request.GET.get('shortcut_id')

        article = Article.objects.get(pk=article_id)
        shortcut = Shortcut.objects.get(pk=shortcut_id)

        if shortcut.articles.add(article):
            context['success'] = True

        return JsonResponse(context)


class ShowArticleFromShortcutView(View):
    def get(self, *args, **kwargs):

        context = {}
        shortcut_id = self.request.GET.get('shortcut_id')
        shortcut = Shortcut.objects.get(pk=shortcut_id)

        for article in shortcut.articles.exclude(status='w').exclude(status='d'):
            context.update({article.id: {
                'title': article.title,
                'author': article.author,
                'desc': article.description,
                'pub_date': article.publish_date.strftime("%d %B %Y %H:%M"),
                'useful': article.useful_counter,
                'viewed': article.view_counter,
                'loved': article.favorite_counter
            }})

        return JsonResponse(context)


class GetArticlesByStaticShortcutsView(View):
    def get(self, *args, **kwargs):

        context = {}
        articles = []
        get_by = self.request.GET.get('get_articles_by')
        current_user = self.request.user

        if get_by == 'Home':
            articles = SearchQuerySet().models(Article).order_by('-publish_date').exclude(status='d').exclude(status='w')
        elif get_by == 'Most Used':
            articles = SearchQuerySet().models(Article).order_by('-useful_counter').exclude(status='d').exclude(status='w')
        elif get_by == 'Most Viewed':
            articles = SearchQuerySet().models(Article).order_by('-view_counter').exclude(status='d').exclude(status='w')
        elif get_by == 'Most Loved':
            articles = SearchQuerySet().models(Article).order_by('-favorite_counter').exclude(status='d').exclude(status='w')
        elif get_by == 'Favorites':
            ids = current_user.get_related_favorites()
            for i in ids:
                articles.append(Article.objects.get(id=i, status='p'))
        elif get_by == 'Historic':
            articles = current_user.get_related_articles_viewed()
        elif get_by == 'Last Update':
            return 0
        elif get_by == 'Recent':
            articles = SearchQuerySet().all().order_by('publish_date')
        else:
            context['error'] = True
            return JsonResponse(context)

        key = 0

        for article in articles:
            print(article.id)
            print(article.title)
            print(str(article.author))

            key += 1
            context.update({key: {
                'id':       article.id,
                'title':    article.title,
                'author':   str(article.author),
                'desc':     article.description,
                'pub_date': article.publish_date.strftime("%d %B %Y %H:%M"),
                'useful':   article.useful_counter,
                'viewed':   article.view_counter,
                'loved':    article.favorite_counter,
                'ok': 'ok',
                'tags': '#Company #Work #Public'
            }})

        return JsonResponse(context)


class SortArticlesView(View):
    def get(self, *args, **kwargs):

        context = {}

        # LOGIC HERE

        return JsonResponse(context)
