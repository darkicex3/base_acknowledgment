# -*- coding: utf-8 -*-
# Generated by Django 1.9.6 on 2016-05-31 05:01
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('article', '0036_auto_20160530_2342'),
    ]

    operations = [
        migrations.AddField(
            model_name='article',
            name='url_article',
            field=models.CharField(default='', max_length=255),
        ),
    ]
