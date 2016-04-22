from django.contrib.auth.models import User
from django.contrib import auth
from six import python_2_unicode_compatible
from haystack.query import SearchQuerySet
from mptt.models import TreeForeignKey, MPTTModel
from django.db import models
from .constants import *
import datetime


def get_upload_filename(instance, filename):
    return "uploaded_files/%s_%s" % (str(datetime.time()).replace('.', '_'), filename)


@python_2_unicode_compatible
class Category(MPTTModel):
    class Meta:
        verbose_name_plural = 'Categories'
        app_label = 'article'

    name = models.CharField(max_length=50, blank=True, null=True)
    parent = TreeForeignKey('self', null=True, blank=True, related_name='children')

    def get_previous_parent(self):
        return self.parent.parent

    def __str__(self):
        return self.name or ''


class Tag(models.Model):
    class Meta:
        verbose_name_plural = 'Tags'
        app_label = 'article'

    name = models.CharField(max_length=64, unique=True)

    def __str__(self):
        return self.name


class Feedback(models.Model):
    class Meta:
        verbose_name = 'Feedback'
        verbose_name_plural = 'Manage Feedbacks'
        app_label = 'article'

    alert_useless_actived = models.BooleanField(default=False)
    max_useless = models.IntegerField(null=True)

    alert_view_actived = models.BooleanField(default=False)
    min_view = models.IntegerField(null=True)


class UserArticle (models.Model):
    class Meta:
        verbose_name = 'User Article'
        verbose_name_plural = 'User\'s Articles'
        app_label = 'article'

    user_id = models.IntegerField(default=0)
    article_id = models.IntegerField(default=0)
    favorites = models.BooleanField(default=False)
    visited = models.BooleanField(default=False)
    searched = models.BooleanField(default=False)

    date_visited = models.DateTimeField(default=datetime.datetime.now)
    date_searched = models.DateTimeField(default=datetime.datetime.now)
    date_added = models.DateTimeField(default=datetime.datetime.now)


class Article(models.Model):
    class Meta:
        verbose_name_plural = 'Articles'
        app_label = 'article'

    status = models.CharField(max_length=1, choices=STATUS_CHOICES, default=STATUS_CHOICES[0])
    feedback = models.ForeignKey(Feedback, on_delete=models.CASCADE, default=DEFAULT_FEEDBACK_ID)

    useful_counter = models.IntegerField(default=0)
    favorite_counter = models.IntegerField(default=0)
    view_counter = models.IntegerField(default=0)

    author = models.ForeignKey(User, on_delete=models.CASCADE, default=DEFAULT_AUTHOR_ID)
    publish_date = models.DateTimeField(default=datetime.datetime.now, help_text=publish_date_help)
    expiration_date = models.DateTimeField(blank=True, null=True, help_text=expiration_date)

    title = models.CharField(max_length=100)
    description = models.TextField(blank=True, help_text=description_help)
    content = models.TextField(default='')
    # thumbnail = models.FileField(null=True, upload_to=get_upload_filename)
    category = models.ForeignKey(Category, on_delete=models.CASCADE, default=DEFAULT_CATEGORY_ID)

    keywords = models.TextField(blank=True, help_text=keywords_help)
    tags = models.ManyToManyField(Tag, help_text=tags_help, blank=True)

    # auto_tag = models.BooleanField(default=True, blank=True, help_text=auto_tag_help)
    # followup_for = models.ManyToManyField('self', symmetrical=False, blank=True, help_text=followup_for_help,related_
    # name='followups')
    # related_articles = models.ManyToManyField('self', blank=True)

    def __str__(self):
        return self.title

    def active_article(self):
        if self.publish_date >= datetime.datetime.now() and datetime.datetime.now() < self.expiration_date:
            self.IS_ACTIVE = True

    def get_feedback_alert(self):
        context = {}
        if self.feedback.alert_view_actived:
            if self.feedback.view < self.feedback.min_view:
                context['alert_view'] = MSG_VIEW_ALERT
            else:
                context['alert_view'] = ''

        if self.feedback.alert_useless_actived:
            if self.feedback.useless > self.feedback.max_useless:
                context['alert_useless'] = MSG_USELESS_ALERT
            else:
                context['alert_useless'] = ''

        return context


class Shortcut(models.Model):
    class Meta:
        verbose_name = 'Shortcut'
        verbose_name_plural = 'Shortcuts'

    name = models.CharField(max_length=300, unique=True)
    articles = models.ManyToManyField(Article, help_text=tags_help, blank=True)
    activated = models.BooleanField(default=True)
    static = models.BooleanField(default=False)
    click_counter = models.IntegerField(default=0)

    def __str__(self):
        return self.name


def get_related_favorites(self):
    q = SearchQuerySet().all().filter(user_id=self.id).filter(favorites=True).order_by('date_added')
    result = []
    for i in q:
        result.append(Article.objects.get(pk=i.article_id))

    return result


def get_related_articles_viewed(self):
    q = SearchQuerySet().all().filter(user_id=self.id).filter(viewed=True).order_by('date_viewed')
    result = []
    for i in q:
        result.append(Article.objects.all().filter().get(pk=i.article_id))

    return result


def get_related_articles_visited(self):
    q = SearchQuerySet().all().filter(user_id=self.id).filter(searched=True).order_by('date_searched')
    result = []
    for i in q:
        result.append(Article.objects.all().filter().get(pk=i.article_id))

    return result

auth.models.User.add_to_class('get_related_favorites', get_related_favorites)
auth.models.User.add_to_class('get_related_articles_viewed', get_related_favorites)
auth.models.User.add_to_class('get_related_articles_visited', get_related_favorites)

