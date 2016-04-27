from django.http import JsonResponse
from apps.article.models import Category, Article, Shortcut, UserArticle
from django.shortcuts import render_to_response
from django.views.generic import View
from haystack.query import SearchQuerySet
from django.core.exceptions import ObjectDoesNotExist


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

        if node_id is None:
            categories = Category.objects.all().filter(level=0)
        else:
            node_category = Category.objects.all().get(pk=node_id)
            if previous == 'false':
                categories = node_category.get_children()
            else:
                categories = node_category.get_previous_parent().get_children()

        for category in categories: context.update({category.id: str(category.name)})

        return JsonResponse(context)


class SetLikedView(View):
    def get(self, *args, **kwargs):
        context = {}

        article_id = self.request.GET.get('article_id')
        liked = self.request.GET.get('liked')
        current_user = self.request.user

        print(article_id)
        print(current_user)
        print(liked)

        try:
            p = UserArticle.objects.all().get(user_id=current_user.id, article_id=article_id)

            if liked == 'true':
                p.favorites = True
            else:
                p.favorites = False

            p.save()

        except ObjectDoesNotExist:
            if liked == 'true':
                UserArticle.objects.create(user_id=current_user.id, article_id=article_id, favorites=True)

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
            try:
                articles = SearchQuerySet().models(Article).order_by('-publish_date').exclude(status='d').exclude(status='w')
            except ObjectDoesNotExist:
                context.update({'msg': 'You don\'t have any articles ;('})
                return JsonResponse(context)
        elif get_by == 'Most Used':
            try:
                articles = SearchQuerySet().models(Article).order_by('-useful_counter').exclude(status='d').exclude(status='w')
            except ObjectDoesNotExist:
                context.update({'msg': 'You don\'t have any articles ;('})
                return JsonResponse(context)
        elif get_by == 'Most Viewed':
            try:
                articles = SearchQuerySet().models(Article).order_by('-view_counter').exclude(status='d').exclude(status='w')
            except ObjectDoesNotExist:
                context.update({'msg': 'You don\'t have any articles ;('})
                return JsonResponse(context)
        elif get_by == 'Most Loved':
            try:
                articles = SearchQuerySet().models(Article).order_by('-favorite_counter').exclude(status='d').exclude(status='w')
            except ObjectDoesNotExist:
                context.update({'msg': 'You don\'t have any articles ;('})
                return JsonResponse(context)
        elif get_by == 'Favorites':
            try:
                ids = current_user.get_related_favorites()
                print(ids)
                for i in ids:
                    articles.append(Article.objects.get(id=i, status='p'))
                p = articles[0]
            except ObjectDoesNotExist:
                context.update({'msg': 'You don\'t have favorites ;('})
                return JsonResponse(context)
            except IndexError:
                context.update({'msg': 'You don\'t have favorites ;('})
                return JsonResponse(context)
        elif get_by == 'Historic':
            try:
                articles = current_user.get_related_articles_viewed()
            except ObjectDoesNotExist:
                context.update({'msg': 'You don\'t visit an article for the moment ;('})
                return JsonResponse(context)
        elif get_by == 'Last Update':
            try:
                articles = SearchQuerySet().models(Article).order_by('updated_at').exclude(status='d').exclude(status='w')
            except ObjectDoesNotExist:
                context.update({'msg': 'There isn\'t updates for the moment ;('})
                return JsonResponse(context)
        elif get_by == 'Recent':
            try:
                articles = SearchQuerySet().all().order_by('publish_date')
            except ObjectDoesNotExist:
                context.update({'msg': 'There isn\'t recent update for the moment ;('})
                return JsonResponse(context)
        else:
            context['error'] = True
            return JsonResponse(context)

        key = 0

        for article in articles:

            try:
                UserArticle.objects.get(user_id=current_user.id, article_id=article.pk, favorites=True)
                favorites = "ok"
            except ObjectDoesNotExist:
                favorites = "ko"

            print(favorites)

            key += 1
            context.update({key: {
                'id':       article.pk,
                'title':    article.title,
                'author':   str(article.author),
                'desc':     article.description,
                'pub_date': article.publish_date.strftime("%d %B %Y %H:%M"),
                'useful':   article.useful_counter,
                'viewed':   article.view_counter,
                'loved':    article.favorite_counter,
                'ok': 'ok',
                'tags': '#Company #Work #Public',
                'favorites': favorites
            }})

        return JsonResponse(context)


class SortArticlesView(View):
    def get(self, *args, **kwargs):

        context = {}

        # LOGIC HERE

        return JsonResponse(context)
