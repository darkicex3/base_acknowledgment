# -*- coding: utf-8 -*-
# Generated by Django 1.9.6 on 2016-06-01 01:10
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('article', '0042_auto_20160531_1951'),
    ]

    operations = [
        migrations.AlterField(
            model_name='article',
            name='content',
            field=models.TextField(blank=True, default=''),
        ),
    ]
