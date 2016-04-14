import datetime
from haystack import indexes
from apps.article.models import Article, Tag, Category

class CategoryIndex(indexes.SearchIndex, indexes.Indexable):
    text = indexes.CharField(document=True, use_template=True)
    name = indexes.CharField(model_attr='name')

    content_auto = indexes.EdgeNgramField(model_attr='name')

    def get_model(self):
        return Category

    def index_queryset(self, using=None):
        """Used when the entire index for model is updated."""
        return self.get_model().objects.order_by('name')



class TagIndex(indexes.SearchIndex, indexes.Indexable):
    text = indexes.CharField(document=True, use_template=True)
    name = indexes.CharField(model_attr='name')

    content_auto = indexes.EdgeNgramField(model_attr='name')

    def get_model(self):
        return Tag

    def index_queryset(self, using=None):
        """Used when the entire index for model is updated."""
        return self.get_model().objects.order_by('name')


class ArticleIndex(indexes.SearchIndex, indexes.Indexable):

    text = indexes.CharField(document=True, use_template=True)
    title = indexes.CharField(model_attr='title')
    author = indexes.CharField(model_attr='author')

    keywords = indexes.CharField(model_attr='keywords')
    description = indexes.CharField(model_attr='description')
    content = indexes.CharField(model_attr='content')

    publish_date = indexes.DateTimeField(model_attr='publish_date')
    expiration_date = indexes.DateTimeField(model_attr='expiration_date')

    content_auto_name = indexes.EdgeNgramField(model_attr='name')
    content_auto_content = indexes.EdgeNgramField(model_attr='content')
    content_auto_description = indexes.EdgeNgramField(model_attr='description')

    def get_model(self):
        return Article

    def index_queryset(self, using=None):
        """Used when the entire index for model is updated."""
        return self.get_model().objects.filter(publish_date__lte=datetime.datetime.now())
