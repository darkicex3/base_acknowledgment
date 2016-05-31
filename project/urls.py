"""novostrat URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.9/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import include, url
from django.contrib import admin
import notifications
from notifications import urls
from . import settings

urlpatterns = [
    url(r'^site_media/media/(?P<path>.*)$', 'django.views.static.serve', {'document_root': settings.MEDIA_ROOT,
                                                                          'show_indexes': True}),
    url('^inbox/notifications/', include(notifications.urls, namespace='notifications')),
    url(r'^attachments/', include('attachments.urls', namespace='attachments')),
    url(r'^summernote/', include('django_summernote.urls')),
    url(r'^manager/', include('apps.manager.urls', namespace='contents')),
    url(r'^article/', include('apps.article.urls', namespace='articles')),
    url(r'^registration/', include('apps.registration.urls', namespace='registration')),
    url(r'^', include('apps.core.urls', namespace='core')),
    url(r'^admin/', admin.site.urls),
]

