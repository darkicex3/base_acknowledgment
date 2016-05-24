from django.http import JsonResponse
from apps.article.models import Tag, Article, Category
from django.views.generic import View


class ManageSidebarShortcutsShowingView(View):
    def get(self, *args, **kwargs):

        context = {}
        node_id = self.request.GET.get('node_id')
        previous = self.request.GET.get('previous')

        if node_id is None:
            try:
                shortcuts = Category.objects.all().filter(level=0)
                q = shortcuts[0]
            except IndexError:
                context.update({'msg': '<p style="padding: 16px;">No shortcuts available, please add new ones '
                                       'or contact an administrator.</p>'})

                return JsonResponse(context)
        else:
            node_shortcut = Category.objects.all().get(pk=node_id)
            if previous == 'false':
                shortcuts = node_shortcut.get_children()
            else:
                shortcuts = node_shortcut.get_previous_parent().get_children()

        for category in shortcuts:
            if category.activated:
                context.update({category.id: {
                    'name': category.name,
                    'state': category.activated,
                    'icon': category.icon
                }})

        return JsonResponse(context)


class ManageSidebarShortcutsEditingView(View):
    def post(self, *args, **kwargs):

        context = {'success': True}

        for key, value in self.request.POST.items():
            category = Category.objects.get(key)
            category.activated = value

        return JsonResponse(context)


class ManageSidebarShortcutsInsertingView(View):
    def post(self, *args, **kwargs):

        context = {}
        shortcut_name = self.request.POST('shortcut_name')
        q = Category.objects.create(shortcut_name=shortcut_name)

        if q:
            context.update({q.id: {'success': True}})

        return JsonResponse(context)











