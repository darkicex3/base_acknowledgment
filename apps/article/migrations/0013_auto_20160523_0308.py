# -*- coding: utf-8 -*-
# Generated by Django 1.9.6 on 2016-05-23 08:08
from __future__ import unicode_literals

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('article', '0012_remove_feedback_article'),
    ]

    operations = [
        migrations.AddField(
            model_name='feedback',
            name='article',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='article', to='article.Article'),
        ),
        migrations.AlterField(
            model_name='feedback',
            name='author',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='author', to=settings.AUTH_USER_MODEL),
        ),
    ]
