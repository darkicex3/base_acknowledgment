# -*- coding: utf-8 -*-
# Generated by Django 1.9.6 on 2016-05-23 08:05
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('article', '0011_remove_feedback_comments'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='feedback',
            name='article',
        ),
    ]
