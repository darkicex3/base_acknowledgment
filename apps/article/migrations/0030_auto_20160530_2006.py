# -*- coding: utf-8 -*-
# Generated by Django 1.9.6 on 2016-05-31 01:06
from __future__ import unicode_literals

import django.core.files.storage
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('article', '0029_article_file_content'),
    ]

    operations = [
        migrations.AlterField(
            model_name='article',
            name='file_content',
            field=models.FileField(default='/attachment/article_files/test.pdf', storage=django.core.files.storage.FileSystemStorage(location='/media/'), upload_to='article_files'),
        ),
    ]
