# -*- coding: utf-8 -*-
# Generated by Django 1.9.6 on 2016-05-16 08:21
from __future__ import unicode_literals

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Choice',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=200)),
                ('votes', models.IntegerField(default=0)),
                ('type', models.CharField(choices=[('0', 'Right Answer'), ('1', 'Wrong Answer')], default=('0', 'Right Answer'), help_text='This choice isright or wrong ?', max_length=1)),
            ],
        ),
        migrations.CreateModel(
            name='Poll',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(default='', max_length=255)),
                ('publish_date', models.DateTimeField()),
            ],
        ),
        migrations.CreateModel(
            name='Question',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=200)),
                ('choices', models.ManyToManyField(blank=True, to='poll.Choice')),
            ],
        ),
        migrations.AddField(
            model_name='poll',
            name='questions',
            field=models.ManyToManyField(blank=True, to='poll.Question'),
        ),
        migrations.AddField(
            model_name='poll',
            name='users',
            field=models.ManyToManyField(blank=True, editable=False, to=settings.AUTH_USER_MODEL),
        ),
    ]
