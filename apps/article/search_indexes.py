import datetime
from haystack import indexes
from apps.article.models import Article, Category, UserArticle


class CategoryIndex(indexes.SearchIndex, indexes.Indexable):
    text = indexes.CharField(document=True, use_template=True)
    name = indexes.CharField(model_attr='name')

    def get_model(self):
        return Category

    def index_queryset(self, using=None):
        """Used when the entire index for model is updated."""
        return self.get_model().objects.order_by('name')


class UserArticleIndex (indexes.SearchIndex, indexes.Indexable):
    text = indexes.CharField(document=True, use_template=True)
    user_id = indexes.IntegerField(model_attr='user_id')
    article_id = indexes.IntegerField(model_attr='article_id')
    favorites = indexes.BooleanField(model_attr='favorites')
    visited = indexes.BooleanField(model_attr='visited')
    searched = indexes.BooleanField(model_attr='searched')
    date_visited = indexes.DateTimeField(model_attr='date_visited')
    date_searched = indexes.DateTimeField(model_attr='date_searched')
    date_added = indexes.DateTimeField(model_attr='date_added')

    def get_model(self):
        return UserArticle

    def index_queryset(self, using=None):
        """Used when the entire index for model is updated."""
        return self.get_model().objects.order_by('user_id')


class ArticleIndex(indexes.SearchIndex, indexes.Indexable):

    text = indexes.CharField(document=True, use_template=True)
    title = indexes.CharField(model_attr='title')
    author = indexes.CharField(model_attr='author')

    status = indexes.CharField(model_attr='status')

    useful_counter = indexes.IntegerField(model_attr='useful_counter')
    favorite_counter = indexes.IntegerField(model_attr='favorite_counter')
    view_counter = indexes.IntegerField(model_attr='view_counter')

    description = indexes.CharField(model_attr='description')
    content = indexes.CharField(model_attr='content')
    categories = indexes.MultiValueField()

    publish_date = indexes.DateTimeField(model_attr='publish_date')

    content_auto = indexes.EdgeNgramField(model_attr='title')
    # content_auto_content = indexes.EdgeNgramField(model_attr='content')
    # content_auto_description = indexes.EdgeNgramField(model_attr='description')

    def prepare_categories(self, obj):
        return [category.pk for category in obj.categories.all()]

    def get_model(self):
        return Article

    def index_queryset(self, using=None):
        """Used when the entire index for model is updated."""
        return self.get_model().objects.all()
