from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from django.template import RequestContext

from apps.article.models import Category


@login_required
def index(request):
    return render(request, 'core/home.html', {'nodes_static': Category.objects.all().filter(static=True),
                                              'nodes_variable': Category.objects.all().filter(static=False)},
                  context_instance=RequestContext(request))


def poll(request):
    return render(request, 'core/data.html')


def card(request):
    return render(request, 'core/card.html')


def daily_recap(request):
    return render(request, 'core/daily_recap.html')


def flex(request):
    return render(request, 'core/test_flex.html')
