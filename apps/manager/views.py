from django.http import JsonResponse
from apps.article.models import Category, Article, Shortcut
from django.views.generic import View


class ManageSidebarShortcutsShowingView(View):
    def get(self, *args, **kwargs):

        context = {}
        node_id = self.request.GET.get('node_id')
        previous = self.request.GET.get('previous')

        if node_id is None:
            shortcuts = Shortcut.objects.all().filter(level=0)
        else:
            node_shortcut = Shortcut.objects.all().get(pk=node_id)
            if previous == 'false':
                shortcuts = node_shortcut.get_children()
            else:
                shortcuts = node_shortcut.get_previous_parent().get_children()

        for shortcut in shortcuts:
            if shortcut.activated:
                context.update({shortcut.id: {
                    'name': shortcut.name,
                    'state': shortcut.activated,
                    'icon': shortcut.icon
                }})

        return JsonResponse(context)


class ManageSidebarShortcutsEditingView(View):
    def post(self, *args, **kwargs):

        context = {'success': True}

        for key, value in self.request.POST.items():
            shortcut = Shortcut.objects.get(key)
            shortcut.activated = value

        return JsonResponse(context)


class ManageSidebarShortcutsInsertingView(View):
    def post(self, *args, **kwargs):

        context = {}
        shortcut_name = self.request.POST('shortcut_name')
        q = Shortcut.objects.create(shortcut_name=shortcut_name)

        if q:
            context.update({q.id: {'success': True}})

        return JsonResponse(context)











