from django.contrib import admin
from django_mptt_admin.admin import DjangoMpttAdmin
from apps.article.models import Category


class CategoryAdmin(DjangoMpttAdmin):
    pass


admin.site.register(Category, CategoryAdmin)
