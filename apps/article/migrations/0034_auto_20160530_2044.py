# -*- coding: utf-8 -*-
# Generated by Django 1.9.6 on 2016-05-31 01:44
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('article', '0033_article_file_content'),
    ]

    operations = [
        migrations.AlterField(
            model_name='article',
            name='file_content',
            field=models.FileField(blank=True, upload_to='/static/core/files'),
        ),
    ]
