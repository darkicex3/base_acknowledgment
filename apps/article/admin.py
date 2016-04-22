from django.contrib import admin
from django_mptt_admin.admin import DjangoMpttAdmin
from apps.article.models import Category, Tag, Article, Feedback, Shortcut


class CategoryAdmin(DjangoMpttAdmin):
    pass


def make_published(modeladmin, request, queryset):
    queryset.update(status='p')
make_published.short_description = "Mark selected as published"


def make_draft(modeladmin, request, queryset):
    queryset.update(status='d')
make_draft.short_description = "Mark selected as draft"


def make_withdrawn(modeladmin, request, queryset):
    queryset.update(status='w')
make_withdrawn.short_description = "Mark selected as withdrawn"


def duplicate_event(modeladmin, request, queryset):
    for object in queryset:
        object.id = None
        object.save()
duplicate_event.short_description = "Duplicate selected record"


def deleteall(modeladmin, request, queryset):
    for a in queryset:
        a.delete()
deleteall.short_description = "Delete all selected > 999 record"


def make_activated(modeladmin, request, queryset):
    queryset.update(activated=True)
make_activated.short_description = "Mark selected as activated"


def make_desactivated(modeladmin, request, queryset):
    queryset.update(activated=False)
make_desactivated.short_description = "Mark selected as desactivated"


class ArticleAdmin(admin.ModelAdmin):
    list_display = ['title', 'publish_date', 'useful_counter', 'favorite_counter', 'view_counter', 'status']
    ordering = ['title']
    actions = [make_published, make_draft, make_withdrawn, duplicate_event, deleteall]


class ShortcutAdmin(admin.ModelAdmin):
    list_display = ['name', 'click_counter', 'activated', 'static']
    ordering = ['name']
    actions = [make_desactivated, make_activated, duplicate_event]


admin.site.register(Category, CategoryAdmin)
admin.site.register(Article, ArticleAdmin)
admin.site.register(Tag)
admin.site.register(Feedback)
admin.site.register(Shortcut, ShortcutAdmin)


