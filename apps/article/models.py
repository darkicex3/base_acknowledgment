from six import python_2_unicode_compatible
from django.db import models
from mptt.models import TreeForeignKey, MPTTModel


@python_2_unicode_compatible
class Category(MPTTModel):
    class Meta:
        verbose_name_plural = 'categories'
        app_label = 'article'

    name = models.CharField(max_length=50, blank=True, null=True)
    parent = TreeForeignKey('self', null=True, blank=True, related_name='children')

    def __str__(self):
        return self.name or self.code or ''

DEFAULT_CATEGORY_ID = 1
class Article(models.Model):
    category = models.ForeignKey(Category, on_delete=models.CASCADE, default=DEFAULT_CATEGORY_ID)
    title = models.CharField(max_length=200)
    content = models.CharField(max_length=1000000)

class Tags(models.Model):
    title = models.CharField(max_length=200)

class ArticleTag(models.Model):
    tags = models.ManyToManyField(Tags)
    article = models.ManyToManyField(Article)

