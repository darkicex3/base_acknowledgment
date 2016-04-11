from django.shortcuts import render


def index(request):
    return render(request, 'core/home.html')


def contact(request):
    return render(request, 'core/contact.html')


def certificates(request):
    return render(request, 'core/certificates.html')


def about(request):
    return render(request, 'core/about.html')
