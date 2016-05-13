from django.shortcuts import render
from django.http import JsonResponse
from django.views.generic import View
from django.contrib.auth.decorators import login_required


@login_required
def index(request):
    return render(request, 'core/home.html')
