from django.contrib import admin
from django_mptt_admin.admin import DjangoMpttAdmin
from apps.article.models import Category, Tag, Article, ArticleStatus


class CategoryAdmin(DjangoMpttAdmin):
    pass


admin.site.register(Category, CategoryAdmin)

admin.site.register(Article)
admin.site.register(Tag)
admin.site.register(ArticleStatus)


