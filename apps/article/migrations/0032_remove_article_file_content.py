# -*- coding: utf-8 -*-
# Generated by Django 1.9.6 on 2016-05-31 01:13
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('article', '0031_auto_20160530_2012'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='article',
            name='file_content',
        ),
    ]
