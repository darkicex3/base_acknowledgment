from django.contrib import admin
# -- ARTICLE APP MODELS --
from apps.poll.models import Poll, Question, Choice


class PollAdmin(admin.ModelAdmin):
    list_display = ['title', 'id', 'publish_date']
    list_filter = ['publish_date']
    ordering = ['id']


class QuestionAdmin(admin.ModelAdmin):
    list_display = ['title']
    ordering = ['title']


class ChoiceAdmin(admin.ModelAdmin):
    list_display = ['title', 'votes', 'type']
    list_editable = ['type']


admin.site.register(Poll, PollAdmin)
admin.site.register(Question, QuestionAdmin)
admin.site.register(Choice, ChoiceAdmin)
