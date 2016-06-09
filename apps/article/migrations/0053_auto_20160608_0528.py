# -*- coding: utf-8 -*-
# Generated by Django 1.9.6 on 2016-06-08 10:28
from __future__ import unicode_literals

import datetime
from django.db import migrations, models
from django.utils.timezone import utc


class Migration(migrations.Migration):

    dependencies = [
        ('article', '0052_auto_20160608_0224'),
    ]

    operations = [
        migrations.AlterField(
            model_name='article',
            name='publish_date',
            field=models.DateTimeField(default=datetime.datetime(2016, 6, 8, 10, 28, 7, 146033, tzinfo=utc), help_text='By default the article will be publish once you publish the article. But you can set your own date to publish this article later automatically.'),
        ),
    ]
