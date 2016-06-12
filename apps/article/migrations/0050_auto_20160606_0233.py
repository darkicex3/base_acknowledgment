# -*- coding: utf-8 -*-
# Generated by Django 1.9.6 on 2016-06-06 07:33
from __future__ import unicode_literals

import datetime
from django.db import migrations, models
from django.utils.timezone import utc


class Migration(migrations.Migration):

    dependencies = [
        ('article', '0049_auto_20160602_0441'),
    ]

    operations = [
        migrations.AddField(
            model_name='article',
            name='essential',
            field=models.BooleanField(default=False, help_text='Do you think this article is extremly IMPORTANT ?'),
        ),
        migrations.AlterField(
            model_name='article',
            name='publish_date',
            field=models.DateTimeField(default=datetime.datetime(2016, 6, 6, 7, 33, 0, 411425, tzinfo=utc), help_text='By default the article will be publish once you publish the article. But you can set your own date to publish this article later automatically.'),
        ),
    ]