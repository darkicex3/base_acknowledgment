# -*- coding: utf-8 -*-
# Generated by Django 1.9.6 on 2016-05-31 05:07
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('article', '0037_article_url_article'),
    ]

    operations = [
        migrations.AlterField(
            model_name='article',
            name='url_article',
            field=models.CharField(blank=True, default='', max_length=255),
        ),
    ]
