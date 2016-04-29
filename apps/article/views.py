from django.http import JsonResponse
from apps.article.models import Category, Article, Shortcut, UserArticle
from django.shortcuts import render_to_response
from django.views.generic import View
import datetime, calendar
from django.contrib.auth.decorators import login_required
from haystack.query import SearchQuerySet
from django.core.exceptions import ObjectDoesNotExist
from attachments.models import Attachment


def search_titles(request):
    articles = SearchQuerySet().autocomplete(content_auto=request.POST.get('search_text', ''))

    return render_to_response('base.html', {'articles': articles})


class GetCategoriesView(View):
    # @login_required
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
    # @login_required
    def get(self, *args, **kwargs):
        context = {}

        article_id = self.request.GET.get('article_id')
        action = self.request.GET.get('action')
        current_user = self.request.user
        q = Article.objects.get(id=article_id)

        try:
            p = UserArticle.objects.get(user_id=current_user.id, article_id=article_id)

            if action == 'true':
                print(q.favorite_counter)
                p.favorites = True
                q.favorite_counter += 1
            else:
                print(q.favorite_counter)
                p.favorites = False
                q.favorite_counter -= 1

            p.save()

        except ObjectDoesNotExist:
            if action == 'true':
                UserArticle.objects.create(user_id=current_user.id, article_id=article_id, favorites=True)
                q.favorite_counter += 1

        context.update({'favorite_counter': q.favorite_counter})
        q.save()

        return JsonResponse(context)


class SetUsefulView(View):
    # @login_required
    def get(self, *args, **kwargs):
        context = {}

        article_id = self.request.GET.get('article_id')
        action = self.request.GET.get('action')
        current_user = self.request.user
        q = Article.objects.get(id=article_id)

        try:
            p = UserArticle.objects.all().get(user_id=current_user.id, article_id=article_id)

            if action == 'true':
                p.useful = True
                q.useful_counter += 1
            else:
                p.useful = False
                q.useful_counter -= 1

            p.save()

        except ObjectDoesNotExist:
            if action == 'true':
                UserArticle.objects.create(user_id=current_user.id, article_id=article_id, useful=True)
                q.useful_counter += 1

        context.update({'useful_counter': q.useful_counter})
        q.save()

        return JsonResponse(context)


class SetReadView(View):
    # @login_required
    def get(self, *args, **kwargs):
        context = {}

        article_id = self.request.GET.get('article_id')
        action = self.request.GET.get('action')
        current_user = self.request.user
        q = Article.objects.get(id=article_id)

        try:
            p = UserArticle.objects.all().get(user_id=current_user.id, article_id=article_id)

            if action == 'true':
                p.readed = True
                q.view_counter += 1
            else:
                p.readed = False
                q.view_counter -= 1

            p.save()

        except ObjectDoesNotExist:
            if action == 'true':
                UserArticle.objects.create(user_id=current_user.id, article_id=article_id, readed=True)
                q.view_counter += 1

        context.update({'readed_counter': q.view_counter})
        q.save()

        return JsonResponse(context)


class SetVisitedView(View):
    # @login_required
    def get(self, *args, **kwargs):
        context = {}

        article_id = self.request.GET.get('article_id')
        current_user = self.request.user

        try:
            p = UserArticle.objects.all().get(user_id=current_user.id, article_id=article_id)
            p.visited = True
            p.date_visited = datetime.datetime.now()
            p.save()

        except ObjectDoesNotExist:
            UserArticle.objects.create(user_id=current_user.id, article_id=article_id, visited=True,
                                       date_visited=datetime.datetime.now())

        return JsonResponse(context)


class SetSearchedView(View):
    # @login_required
    def get(self, *args, **kwargs):
        context = {}

        article_id = self.request.GET.get('article_id')
        current_user = self.request.user

        try:
            p = UserArticle.objects.all().get(user_id=current_user.id, article_id=article_id)
            p.searched = True
            p.date_searched = datetime.datetime.now()
            p.save()

        except ObjectDoesNotExist:
            UserArticle.objects.create(user_id=current_user.id, article_id=article_id, searched=True,
                                       date_searched=datetime.datetime.now())

        return JsonResponse(context)


class CreateShortcutView(View):
    # @login_required
    def get(self, *args, **kwargs):

        context = {}
        shortcut_name = self.request.GET.get('shortcut_name')
        shortcut = Shortcut.objects.create(name=shortcut_name)

        if shortcut:
            context['success'] = True

        return JsonResponse(context)


class AddArticleToShortcutView(View):
    # @login_required
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
    # @login_required
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
    # @login_required
    def get(self, *args, **kwargs):

        context = {}
        articles = []
        get_by = self.request.GET.get('get_articles_by')
        get_by_tag = self.request.GET.get('get_articles_by_tags')
        current_user = self.request.user

        if get_by == 'Home':
            try:
                articles = SearchQuerySet().models(Article).order_by('-useful_counter').exclude(status='d').exclude(status='w')
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
            if get_by is not None:
                try:
                    p = Shortcut.objects.get(name=get_by)
                    articles = p.articles.all()
                except ObjectDoesNotExist:
                    context.update({'msg': 'There isn\'t articles for the moment ;('})
                    return JsonResponse(context)
            else:
                try:
                    category = Category.objects.get(name=get_by_tag)
                    p = Article.objects.all()
                    for i in p:
                        for a in i.categories.all():
                            if a.name == category.name:
                                articles.append(i)
                    if articles is None:
                        raise ObjectDoesNotExist
                except ObjectDoesNotExist:
                    context.update({'msg': 'There isn\'t articles for the moment ;('})
                    return JsonResponse(context)

        key = 0

        for article in articles:

            try:
                UserArticle.objects.get(user_id=current_user.id, article_id=article.pk, favorites=True)
                favorites = "ok"
            except ObjectDoesNotExist:
                favorites = "ko"

            try:
                UserArticle.objects.get(user_id=current_user.id, article_id=article.pk, readed=True)
                readed = "ok"
            except ObjectDoesNotExist:
                readed = "ko"

            try:
                UserArticle.objects.get(user_id=current_user.id, article_id=article.pk, useful=True)
                bigup = "ok"
            except ObjectDoesNotExist:
                bigup = "ko"

            tags = ''

            art = Article.objects.get(id=article.pk)
            for a in art.categories.all()[:4]:
                    tags += '<a class="badge bookmarkLink" href="#">#' + a.name + '</a>'

            key += 1
            context.update({key: {
                'id':       article.pk,
                'title':    article.title,
                'author':   str(article.author),
                'desc':     article.description,
                'pub_date': article.publish_date.strftime("%d %B"),
                'useful':   article.useful_counter,
                'viewed':   article.view_counter,
                'loved':    article.favorite_counter,
                'ok': 'ok',
                'tags': tags,
                'favorites': favorites,
                'bigup': bigup,
                'read': readed,
            }})

        return JsonResponse(context)


class SortArticlesView(View):
    # @login_required
    def get(self, *args, **kwargs):

        context = {}

        # LOGIC HERE

        return JsonResponse(context)


class ShowArticleView(View):
    # @login_required
    def get(self, *args, **kwargs):
        context = {}
        article_id = self.request.GET.get('article_id')
        current_user = self.request.user

        article = Article.objects.get(id=article_id)

        try:
            UserArticle.objects.get(user_id=current_user.id, article_id=article.pk, favorites=True)
            favorites = "ok"
        except ObjectDoesNotExist:
            favorites = "ko"

        try:
            UserArticle.objects.get(user_id=current_user.id, article_id=article.pk, readed=True)
            readed = "ok"
        except ObjectDoesNotExist:
            readed = "ko"

        try:

            UserArticle.objects.get(user_id=current_user.id, article_id=article.pk, useful=True)
            bigup = "ok"
        except ObjectDoesNotExist:
            bigup = "ko"

        tags = ''

        art = Article.objects.get(id=article.pk)
        for a in art.categories.all()[:7]:
            tags += '<a class="badge bookmarkLink" href="/filter?tags=' + a.name.lower() + '">#' + a.name + ' </a>'

        attachments = ''
        for a in Attachment.objects.attachments_for_object(art):
            attachments += '<a href = "' + a.attachment_file.url + '" >' \
                                                                   '<img alt="' + a.filename + '" ' \
                                                                                               'src="http://pris' \
                                                                                               'maginario.com/es/asset'\
                                                                                               's/img/icon-pdf-flat.p' \
                                                                                               'ng"></a>'

        context.update({'id': article.pk,
                        'title': article.title,
                        'author': str(article.author),
                        'desc': article.content,
                        'ok': 'ok',
                        'pub_date': article.publish_date.strftime("%d %B %Y %H:%M"),
                        'views': article.view_counter,
                        'useful': article.useful_counter,
                        'loved': article.favorite_counter,
                        'tags': tags,
                        'favorites': favorites,
                        'read': readed,
                        'bigup': bigup,
                        'attachements': attachments,
                        })

        return JsonResponse(context)









































