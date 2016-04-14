from django.contrib.auth.models import User
from six import python_2_unicode_compatible
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

    # active_alert_comment = models.BooleanField(default=False)
    # negative_keywords = models.TextField(default=NEGATIVE_WORDS)
    #
    # active_injuries_control = models.BooleanField(default=True)
    # injuries_keywords = models.TextField(default=INJURIES)

    useless = models.IntegerField(default=0)
    useful = models.IntegerField(default=0)
    favorite = models.IntegerField(default=0)
    view = models.IntegerField(default=0)
    comment = models.TextField(max_length=100)


class Article(models.Model):
    class Meta:
        verbose_name_plural = 'Articles'
        app_label = 'article'

    IS_ACTIVE = False

    is_active = models.BooleanField(default=IS_ACTIVE, editable=False)
    feedback = models.ForeignKey(Feedback, on_delete=models.CASCADE, editable=False, default=DEFAULT_FEEDBACK_ID)

    author = models.ForeignKey(User, on_delete=models.CASCADE, default=DEFAULT_AUTHOR_ID)
    publish_date = models.DateTimeField(default=datetime.datetime.now, help_text=publish_date_help)
    expiration_date = models.DateTimeField(blank=True, null=True,  help_text=expiration_date)

    title = models.CharField(max_length=100)
    description = models.TextField(blank=True, help_text=description_help)
    content = models.TextField(default='')
    thumbnail = models.FileField(null=True ,upload_to=get_upload_filename)
    category = models.ForeignKey(Category, on_delete=models.CASCADE, default=DEFAULT_CATEGORY_ID)

    keywords = models.TextField(blank=True, help_text=keywords_help)
    tags = models.ManyToManyField(Tag, help_text=tags_help, blank=True)



    # auto_tag = models.BooleanField(default=True, blank=True, help_text=auto_tag_help)
    # followup_for = models.ManyToManyField('self', symmetrical=False, blank=True, help_text=followup_for_help,related_name='followups')
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
            else :
                context['alert_view'] = ''

        if self.feedback.alert_useless_actived:
            if self.feedback.useless > self.feedback.max_useless:
                context['alert_useless'] = MSG_USELESS_ALERT
            else:
                context['alert_useless'] = ''

        return context




