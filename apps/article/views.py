from django.http import JsonResponse
from apps.article.models import Tag, Article, Category, UserArticle, Feedback
from django.views.generic import View
import datetime
from django.core.exceptions import ObjectDoesNotExist
from attachments.models import Attachment
from django.shortcuts import render
import simplejson as json
from django.http import HttpResponse
from haystack.query import SearchQuerySet
from django.contrib.auth.decorators import login_required


@login_required
def index_search(request):
    return render(request, 'article/base.html')


@login_required
def articles_search(request):
    tags = request.GET.get('in')
    sort = request.GET.get('by')

    print(tags)
    suggestions = []

    sqs = SearchQuerySet().autocomplete(title_auto__startswith=request.GET.get('q'))

    # if sort != '':
    #     sqs.order_by(sort)

    if tags != '':
        tag = Tag.objects.get(name=tags)
        for i in sqs:
            for a in i.tags:
                tmp = Tag.objects.get(pk=a)
                if tmp.name == tag.name:
                    suggestions.append(i.title)
    else:
        suggestions = [result.title for result in sqs]

    # Make sure you return a JSON object, not a bare list.
    # Otherwise, you could be vulnerable to an XSS attack.
    the_data = json.dumps({
        'results': suggestions
    })
    return HttpResponse(the_data, content_type='application/json')


class GetCategoriesView(View):
    @login_required
    def get(self, *args, **kwargs):

        context = {}
        node_id = self.request.GET.get('node_id')
        previous = self.request.GET.get('previous')

        if node_id is None:
            tags = Tag.objects.all().filter(level=0)
        else:
            node_category = Tag.objects.all().get(pk=node_id)
            if previous == 'false':
                tags = node_category.get_children()
            else:
                tags = node_category.get_previous_parent().get_children()

        for tag in tags:
            context.update({tag.id: str(tag.name)})

        return JsonResponse(context)


class SetLikedView(View):
    def get(self, *args, **kwargs):
        context = {}

        article_id = self.request.GET.get('id')
        action = self.request.GET.get('action')
        print(article_id, action)
        q = Article.objects.get(id=article_id)
        user = self.request.user

        try:
            p = UserArticle.objects.get(user_id=user.id, article_id=article_id)

            if action == 'true':
                p.favorites = True
                q.favorite_counter += 1
            else:
                p.favorites = False
                q.favorite_counter -= 1

            p.save()

        except ObjectDoesNotExist:
            if action == 'true':
                UserArticle.objects.create(user_id=user.id, article_id=article_id, favorites=True)
                q.favorite_counter += 1

        context.update({'favorite_counter': q.favorite_counter})
        q.save()

        return JsonResponse(context)


class SetUsefulView(View):
    def get(self, *args, **kwargs):
        context = {}

        article_id = self.request.GET.get('id')
        action = self.request.GET.get('action')
        print(article_id, action)
        q = Article.objects.get(id=article_id)
        user = self.request.user

        try:
            p = UserArticle.objects.all().get(user_id=user.id, article_id=article_id)

            if action == 'true':
                p.useful = True
                q.useful_counter += 1
            else:
                p.useful = False
                q.useful_counter -= 1

            p.save()

        except ObjectDoesNotExist:
            if action == 'true':
                UserArticle.objects.create(user_id=user.id, article_id=article_id, useful=True)
                q.useful_counter += 1

        context.update({'useful_counter': q.useful_counter})
        q.save()

        return JsonResponse(context)


class SetReadView(View):
    def get(self, *args, **kwargs):
        context = {}

        article_id = self.request.GET.get('id')
        q = Article.objects.get(id=article_id)
        user = self.request.user
        q.view_counter += 1
        q.save()

        return JsonResponse(context)


class SetVisitedView(View):
    def get(self, *args, **kwargs):
        context = {}

        article_id = self.request.GET.get('id')
        user = self.request.user

        try:
            p = UserArticle.objects.all().get(user_id=user.id, article_id=article_id)
            p.visited = True
            p.date_visited = datetime.datetime.now()
            p.save()

        except ObjectDoesNotExist:
            UserArticle.objects.create(user_id=user.id, article_id=article_id, visited=True,
                                       date_visited=datetime.datetime.now())

        return JsonResponse(context)


class SetSearchedView(View):
    def get(self, *args, **kwargs):
        context = {}

        article_id = self.request.GET.get('article_id')
        user = self.request.user

        try:
            p = UserArticle.objects.all().get(user_id=user.id, article_id=article_id)
            p.searched = True
            p.date_searched = datetime.datetime.now()
            p.save()

        except ObjectDoesNotExist:
            UserArticle.objects.create(user_id=user.id, article_id=article_id, searched=True,
                                       date_searched=datetime.datetime.now())

        return JsonResponse(context)


class CreateShortcutView(View):
    @login_required
    def get(self, *args, **kwargs):
        context = {}
        shortcut_name = self.request.GET.get('shortcut_name')
        category = Category.objects.create(name=shortcut_name)

        if category:
            context['success'] = True

        return JsonResponse(context)


class AddArticleToShortcutView(View):
    @login_required
    def get(self, *args, **kwargs):
        context = {}
        article_id = self.request.GET.get('article_id')
        shortcut_id = self.request.GET.get('shortcut_id')

        article = Article.objects.get(pk=article_id)
        category = Category.objects.get(pk=shortcut_id)

        if category.articles.add(article):
            context['success'] = True

        return JsonResponse(context)


class ShowArticleFromShortcutView(View):
    @login_required
    def get(self, *args, **kwargs):
        context = {}
        shortcut_id = self.request.GET.get('shortcut_id')
        category = Category.objects.get(pk=shortcut_id)

        for article in Category.articles.exclude(status='w').exclude(status='d'):
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
    def get(self, user, **kwargs):

        context = {}
        articles = []
        get_by = self.request.GET.get('by')
        display = self.request.GET.get('display')
        user = self.request.user

        if "#" not in get_by:

            try:

                tab_index = []
                tab_model = []

                [tab_index.append(i.pk) for i in SearchQuerySet().models(Article)]
                [tab_model.append(str(i.id)) for i in Article.objects.all()]

                if not set(tab_index) == set(tab_model):
                    context.update({'msg': '<p style="padding: 16px;">Index error in the search engine.'
                                           '<br><br>1. You have to run'
                                           ' \'python3.5 manage.py rebuild_index\' command in the terminal.'
                                           '<br><br>Or<br><br>2. Start'
                                           ' elasticsearch if it is not.</p>'})
                    return JsonResponse(context)

                p = SearchQuerySet().models(Article).exclude(status='d').exclude(status='w')

                if not Article.objects.all().filter(status='p') or not p:
                    raise ObjectDoesNotExist
                q = p[0]
            except IndexError:
                context.update({'msg': '<p style="padding: 16px;">No articles available, please add new ones '
                                       'or contact an administrator.</p>'})
                return JsonResponse(context)
            except ObjectDoesNotExist:
                context.update({'msg': '<p style="padding: 16px;">No articles available, please add new ones '
                                       'or contact an administrator.</p>'})
                return JsonResponse(context)

            # GET HOME ARTICLES BY USEFUL COUNTER
            if get_by == 'Home':
                articles = p.order_by('-modified')
            # GET MOST USED ARTICLES
            elif get_by == 'Most Used':
                articles = p.order_by('-useful_counter')
            # GET MOST VIEWED ARTICLES
            elif get_by == 'Most Viewed':
                articles = p.order_by('-view_counter')
            # GET MOST LOVED ARTICLES
            elif get_by == 'Most Loved':
                articles = p.order_by('-favorite_counter')
            # GET LAST UPDATES
            elif get_by == 'Last Updates':
                for i in p.order_by('-modified'):
                    x = Article.objects.get(pk=i.__getattribute__('pk'))
                    if x.modified != x.publish_date:
                        x.publish_date = x.modified
                        articles.append(x)
            # GET RECENT ARICLES
            elif get_by == 'Recent':
                articles = p.order_by('publish_date')
            # GET FAVORITES FOR CURRENT USER
            elif get_by == 'Favorites':
                try:
                    ids = user.get_related_favorites()
                    for i in ids:
                        articles.append(Article.objects.get(id=i))
                    print(articles[0])
                except ObjectDoesNotExist:
                    context.update({'msg': 'You do not like any item :('})
                    return JsonResponse(context)
                except IndexError:
                    context.update({'msg': 'You do not like any item :('})
                    return JsonResponse(context)
            # GET HISTORIC FOR CURRENT USER
            elif get_by == 'Historic':
                try:
                    ids = user.get_related_articles_viewed()
                    for i in ids:
                        articles.append(Article.objects.get(id=i, status='p'))
                    print(articles[0])
                except ObjectDoesNotExist:
                    context.update({'msg': 'Nothing for the moment :( Visit an article !'})
                    return JsonResponse(context)
                except IndexError:
                    context.update({'msg': 'Nothing for the moment :( Visit an article !'})
                    return JsonResponse(context)
            # GET ARTICLES BY Categories OR TAGS
            else:
                # BY Categories
                if get_by is not None:
                    try:
                        p = Category.objects.get(name=get_by)
                        articles = p.articles.all()
                    except ObjectDoesNotExist:
                        context.update({'msg': 'No articles :( You can add new '
                                               'ones in <strong>' + get_by + '</strong> from admin interface !'})
                        return JsonResponse(context)
                    except IndexError:
                        context.update({'msg': 'No articles :( You can add new '
                                               'ones in <strong>' + get_by + '</strong> from admin interface !'})
                        return JsonResponse(context)
        # BY TAGS
        else:
            try:
                get_by = get_by.replace("#", "")
                tag = Tag.objects.get(name=get_by)
                p = Article.objects.all()
                for i in p:
                    for a in i.tags.all():
                        if a.name == tag.name:
                            articles.append(i)
                if articles is None:
                    raise ObjectDoesNotExist
            except ObjectDoesNotExist:
                context.update({'msg': 'There isn\'t articles with the tag'
                                       ' <strong>' + get_by + '</strong> for the moment :('})
                return JsonResponse(context)
            except IndexError:
                context.update({'msg': 'There isn\'t articles with the tag'
                                       ' <strong>' + get_by + '</strong> for the moment :('})
                return JsonResponse(context)

        key = 0

        for article in articles:

            try:
                UserArticle.objects.get(user_id=user.id, article_id=article.pk, favorites=True)
                favorites = "ok"
            except ObjectDoesNotExist:
                favorites = "ko"

            try:
                UserArticle.objects.get(user_id=user.id, article_id=article.pk, readed=True)
                readed = "ok"
            except ObjectDoesNotExist:
                readed = "ko"

            try:
                UserArticle.objects.get(user_id=user.id, article_id=article.pk, useful=True)
                bigup = "ok"
            except ObjectDoesNotExist:
                bigup = "ko"

            tags = ''

            bookmarkclass = 'bookmarkLink'

            art = Article.objects.get(id=article.pk)
            for a in art.tags.all()[:4]:
                tags += '<span class="badge bookmarkBadge"><span class="add-tags" style="display:none">' \
                        '<i class="material-icons">add_circle</i>' \
                        '</span><a id="#' + a.name + '" class="' + bookmarkclass + '" href="#">' + a.name + \
                        '</a></span>'

            if get_by == 'Last Updates' and display != 'list':
                time = article.modified.strftime("%d %B %Y %H:%M")
                update = 'ok'
            else:
                time = article.publish_date.strftime("%d %b %Y")
                update = 'ko'

            key += 1
            context.update({key: {
                'id': article.pk,
                'title': article.title,
                'author': str(article.author),
                'desc': article.description,
                'pub_date': time,
                'useful': article.useful_counter,
                'views': article.view_counter,
                'loved': article.favorite_counter,
                'ok': 'ok',
                'tags': tags,
                'favorites': favorites,
                'bigup': bigup,
                'read': readed,
                'last_update': update,
                'modified': article.modified.strftime("%d %B %Y %H:%M"),
            }})

        return JsonResponse(context)


class SortArticlesView(View):
    @login_required
    def get(self, *args, **kwargs):
        context = {}

        # LOGIC HERE

        return JsonResponse(context)


class ShowArticleView(View):
    def get(self, *args, **kwargs):
        context = {}
        article_id = self.request.GET.get('id')
        user = self.request.user
        article = Article.objects.get(id=article_id)

        try:
            UserArticle.objects.get(user_id=user.id, article_id=article.pk, favorites=True)
            favorites = "ok"
        except ObjectDoesNotExist:
            favorites = "ko"

        try:
            UserArticle.objects.get(user_id=user.id, article_id=article.pk, readed=True)
            readed = "ok"
        except ObjectDoesNotExist:
            readed = "ko"

        try:

            UserArticle.objects.get(user_id=user.id, article_id=article.pk, useful=True)
            bigup = "ok"
        except ObjectDoesNotExist:
            bigup = "ko"

        tags = ''

        bookmarkclass = 'bookmarkLink'

        art = Article.objects.get(id=article.pk)
        for a in art.tags.all()[:7]:
            tags += '<span class="badge bookmarkBadge"><span class="add-tags" style="display:none">' \
                    '<i class="material-icons">add_circle</i>' \
                    '</span><a id="#' + a.name + '" class="' + bookmarkclass + '" href="#">' + a.name + \
                    '</a></span>'

        attachments = ''
        for a in Attachment.objects.attachments_for_object(art):
            attachments += '<a class="attachment-file" href = "' + a.attachment_file.url + '" >PDF</a>'
        context.update({'id': article.pk,
                        'title': article.title,
                        'author': str(article.author),
                        'desc': article.content,
                        'ok': 'ok',
                        'pub_date': article.publish_date.strftime("%d %B %Y"),
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


class GetSortingMethodsView(View):
    def get(self, *args, **kwargs):
        context = {}

        return JsonResponse(context)


class GetPollsView(View):
    def get(self, *args, **kwargs):
        context = {}

        return JsonResponse(context)


class GetFeedback(View):
    def get(self, *args, **kwargs):
        context = {}
        feedback_choice = self.request.GET.get('feedback_choice')
        feedback_text = self.request.GET.get('feedback_text')
        article_id = self.request.GET.get('id')
        user = self.request.user

        print(feedback_choice, feedback_text, user, article_id)

        obj = Feedback.objects.create(date=datetime.datetime.now(), author=user, rate=feedback_choice,
                                      explanation=feedback_text, article=Article.objects.get(id=article_id))

        obj.save()

        print(obj)

        return JsonResponse(context)
