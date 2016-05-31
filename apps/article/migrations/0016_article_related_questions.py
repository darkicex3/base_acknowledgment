# -*- coding: utf-8 -*-
# Generated by Django 1.9.6 on 2016-05-28 06:05
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('poll', '0001_initial'),
        ('article', '0015_auto_20160525_2314'),
    ]

    operations = [
        migrations.AddField(
            model_name='article',
            name='related_questions',
            field=models.ManyToManyField(blank=True, help_text='Tags that describe this article.', to='poll.Question'),
        ),
    ]
