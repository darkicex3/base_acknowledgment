
# -- VENDORS MODELS --
from django_mptt_admin.admin import DjangoMpttAdmin         # DJANGO MPTT ALLOW TREE VIEW
from django_summernote.admin import SummernoteModelAdmin    # DJANGO SUMMERNOTE ALLOW TEXT EDITOR FOR ARTICLES CONTENT
from attachments.admin import AttachmentInlines             # DJANGO ATTACHMENTS ALLOW ATTACHMENTS TO ARTICLES

# -- ARTICLE APP MODELS --
from apps.article.models import Category, Article, \
    Feedback, Shortcut, FeedbackManager, Comment, UserArticle, DailyRecap

# -- DJANGO ADMIN MODEL --
from django.contrib.admin.models import LogEntry            # LOG OF ALL ACTIONS PERFORM ON ADMIN INTERFACE
from django.contrib import admin

# -- MODELS FUNCTIONS --
from .functions import *                                    # ADDITIONAL FUNCTIONS FOR MODELS IN DJANGO ADMIN


class CategoryAdmin(DjangoMpttAdmin):
    pass


class DailyRecapAdmin(SummernoteModelAdmin, admin.ModelAdmin):
    list_display = ['title', 'id', 'publish_date', 'modified', 'view_counter', 'status']
    list_editable = ['status']
    list_filter = ['publish_date', 'status']
    search_fields = ['title']
    inlines = (AttachmentInlines,)
    ordering = ['title']
    actions = [make_published, make_draft, make_withdrawn, duplicate_event, deleteall]


class ArticleAdmin(SummernoteModelAdmin, admin.ModelAdmin):
    list_display = ['title', 'id', 'publish_date', 'modified',
                    'useful_counter', 'favorite_counter', 'view_counter', 'status']

    list_editable = ['status']
    list_filter = ['modified', 'publish_date', 'status']
    search_fields = ['title', 'description', 'id']
    inlines = (AttachmentInlines,)
    ordering = ['title']
    actions = [make_published, make_draft, make_withdrawn, duplicate_event, deleteall, reset_counter]


class FeedBackAdmin(admin.ModelAdmin):
    list_display = ['author', 'rate', 'date']
    ordering = ['date']
    list_filter = ['rate', 'date']
    search_fields = ['author']


class LogEntryAdmin(admin.ModelAdmin):
    list_display = ['user_id', 'change_message', 'content_type', 'action_time', 'object_id']
    ordering = ['user_id']
    list_filter = ['user_id', 'action_time', 'content_type']
    search_fields = ['change_message', 'object_id']


class ShortcutAdmin(DjangoMpttAdmin, admin.ModelAdmin):
    list_display = ['name', 'click_counter', 'activated', 'icon']
    list_editable = ['activated']
    ordering = ['name']
    actions = [make_desactivated, make_activated, duplicate_event]

admin.site.register(LogEntry, LogEntryAdmin)
admin.site.register(Category, CategoryAdmin)
admin.site.register(Article, ArticleAdmin)
admin.site.register(Shortcut, ShortcutAdmin)
admin.site.register(Feedback, FeedBackAdmin)
admin.site.register(DailyRecap, DailyRecapAdmin)
admin.site.register(FeedbackManager)
admin.site.register(Comment)

admin.site.register(UserArticle)



