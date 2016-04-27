from django.shortcuts import render
from django.http import JsonResponse
from apps.core.models import UserProfile
from django.shortcuts import render_to_response
from django.views.generic import View
from django.contrib.auth.models import User
from haystack.query import SearchQuerySet


def index(request):
    return render(request, 'core/home.html')


def contact(request):
    return render(request, 'core/contact.html')


def certificates(request):
    return render(request, 'core/certificates.html')


def about(request):
    return render(request, 'core/about.html')


class ChangeAvatarView(View):
    def post(self, *args, **kwargs):

        context = {0: '0'}
        # avatar = self.request.POST.get('image')
        image = self.request.FILES.get('image')
        current_user = self.request.user

        print(image)
        print(current_user)

        # q = UserProfile.objects.create(user=current_user, avatar=avatar)
        # print(q.avatar.path)
        # context.update({'image_path': q.avatar.path})

        return JsonResponse(context)
