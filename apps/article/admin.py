from django.contrib import admin
from django_mptt_admin.admin import DjangoMpttAdmin
from django_summernote.admin import SummernoteModelAdmin
from apps.article.models import Category, Tag, Article, Feedback, Shortcut, UserArticle


class CategoryAdmin(DjangoMpttAdmin):
    pass


def make_published(modeladmin, request, queryset):
    for o in queryset:
        o.status = 'p'
        o.save()
make_published.short_description = "Mark selected as published"


def make_draft(modeladmin, request, queryset):
    for o in queryset:
        o.status = 'd'
        o.save()
make_draft.short_description = "Mark selected as draft"


def make_withdrawn(modeladmin, request, queryset):
    for o in queryset:
        o.status = 'w'
        o.save()
make_withdrawn.short_description = "Mark selected as withdrawn"


def duplicate_event(modeladmin, request, queryset):
    for o in queryset:
        o.id = None
        o.save()
duplicate_event.short_description = "Duplicate selected record"


def deleteall(modeladmin, request, queryset):
    for a in queryset:
        a.delete()
deleteall.short_description = "Delete all selected > 999 record"


def make_activated(modeladmin, request, queryset):
    for o in queryset:
        o.activated = True
        o.save()
make_activated.short_description = "Mark selected as activated"


def make_desactivated(modeladmin, request, queryset):
    for o in queryset:
        o.activated = False
        o.save()
make_desactivated.short_description = "Mark selected as desactivated"


class ArticleAdmin(SummernoteModelAdmin):
    list_display = ['title', 'publish_date', 'updated_at',  'useful_counter', 'favorite_counter', 'view_counter',
                    'status']
    list_editable = ['status']
    list_filter = ['updated_at', 'publish_date', 'status']
    search_fields = ['title', 'content', 'description']

    ordering = ['title']
    actions = [make_published, make_draft, make_withdrawn, duplicate_event, deleteall]


class ShortcutAdmin(admin.ModelAdmin):
    list_display = ['name', 'click_counter', 'activated', 'icon', 'static']
    list_editable = ['activated']
    ordering = ['name']
    actions = [make_desactivated, make_activated, duplicate_event]


admin.site.register(Category, CategoryAdmin)
admin.site.register(Article, ArticleAdmin)
admin.site.register(Tag)
admin.site.register(Feedback)
admin.site.register(Shortcut, ShortcutAdmin)
admin.site.register(UserArticle)


