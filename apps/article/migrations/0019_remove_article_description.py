# -*- coding: utf-8 -*-
# Generated by Django 1.9.6 on 2016-05-30 02:50
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('article', '0018_auto_20160529_2148'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='article',
            name='description',
        ),
    ]
