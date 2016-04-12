from django.contrib.auth.models import User
from django.contrib.sites.models import Site
from six import python_2_unicode_compatible
from mptt.models import TreeForeignKey, MPTTModel
from django.db import models
from .constants import *
import datetime



@python_2_unicode_compatible
class Category(MPTTModel):
    class Meta:
        verbose_name_plural = 'Categories'
        app_label = 'article'

    name = models.CharField(max_length=50, blank=True, null=True)
    parent = TreeForeignKey('self', null=True, blank=True, related_name='children')

    def __str__(self):
        return self.name or self.code or ''


class Tag(models.Model):
    class Meta:
        verbose_name_plural = 'Tags'
        app_label = 'article'

    name = models.CharField(max_length=64, unique=True)
    slug = models.CharField(max_length=64, unique=True, null=True, blank=True)


class Article(models.Model):
    class Meta:
        verbose_name_plural = 'Articles'
        app_label = 'article'

    category = models.ForeignKey(Category, on_delete=models.CASCADE, default=DEFAULT_CATEGORY_ID)
    title = models.CharField(max_length=100)
    slug = models.SlugField(unique_for_year='publish_date', default='')
    author = models.ForeignKey(User, on_delete=models.CASCADE, default=DEFAULT_AUTHOR_ID)
    sites = models.ManyToManyField(Site, blank=True)

    keywords = models.TextField(blank=True, help_text=keywords_help)
    description = models.TextField(blank=True, help_text=description_help)
    content = models.TextField(default='')
    tags = models.ManyToManyField(Tag, help_text=tags_help, blank=True)
    auto_tag = models.BooleanField(default=True, blank=True, help_text=auto_tag_help)
    followup_for = models.ManyToManyField('self', symmetrical=False, blank=True, help_text=followup_for_help,
                                          related_name='followups')
    related_articles = models.ManyToManyField('self', blank=True)

    publish_date = models.DateTimeField(default=datetime.datetime.now(), help_text=publish_date_help)
    expiration_date = models.DateTimeField(blank=True, null=True,   help_text=expiration_date)

    is_active = models.BooleanField(default=True, blank=True)



