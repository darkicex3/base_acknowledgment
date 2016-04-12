from django.contrib import admin
from django_mptt_admin.admin import DjangoMpttAdmin
from apps.article.models import Category, Tags, Article, ArticleTag


class CategoryAdmin(DjangoMpttAdmin):
    pass


admin.site.register(Category, CategoryAdmin)

admin.site.register(Tags)
admin.site.register(Article)
admin.site.register(ArticleTag)
