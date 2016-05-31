# -*- coding: utf-8 -*-
# Generated by Django 1.9.6 on 2016-05-30 02:48
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('auth', '0007_alter_validators_add_error_messages'),
        ('article', '0017_article_authorized_group'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='article',
            name='authorized_group',
        ),
        migrations.AddField(
            model_name='article',
            name='authorized_group',
            field=models.ManyToManyField(blank=True, help_text='Choose one or several group you want to allow access to this specific article.', to='auth.Group'),
        ),
    ]
