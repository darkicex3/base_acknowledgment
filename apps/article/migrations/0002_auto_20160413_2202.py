# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models
import apps.article.models
from django.conf import settings
import datetime


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('article', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Feedback',
            fields=[
                ('id', models.AutoField(verbose_name='ID', primary_key=True, serialize=False, auto_created=True)),
                ('alert_useless_actived', models.BooleanField(default=False)),
                ('max_useless', models.IntegerField(null=True)),
                ('alert_view_actived', models.BooleanField(default=False)),
                ('min_view', models.IntegerField(null=True)),
                ('useless', models.IntegerField(default=0)),
                ('useful', models.IntegerField(default=0)),
                ('favorite', models.IntegerField(default=0)),
                ('view', models.IntegerField(default=0)),
                ('comment', models.TextField(max_length=100)),
            ],
            options={
                'verbose_name': 'Feedback',
                'verbose_name_plural': 'Manage Feedbacks',
            },
        ),
        migrations.CreateModel(
            name='Tag',
            fields=[
                ('id', models.AutoField(verbose_name='ID', primary_key=True, serialize=False, auto_created=True)),
                ('name', models.CharField(unique=True, max_length=64)),
            ],
            options={
                'verbose_name_plural': 'Tags',
            },
        ),
        migrations.RemoveField(
            model_name='articletag',
            name='article',
        ),
        migrations.RemoveField(
            model_name='articletag',
            name='tags',
        ),
        migrations.AlterModelOptions(
            name='article',
            options={'verbose_name_plural': 'Articles'},
        ),
        migrations.AlterModelOptions(
            name='category',
            options={'verbose_name_plural': 'Categories'},
        ),
        migrations.AlterModelManagers(
            name='category',
            managers=[
            ],
        ),
        migrations.AddField(
            model_name='article',
            name='author',
            field=models.ForeignKey(to=settings.AUTH_USER_MODEL, default=1),
        ),
        migrations.AddField(
            model_name='article',
            name='description',
            field=models.TextField(help_text="If omitted, the description will be determined by the first bit of the article's content.", blank=True),
        ),
        migrations.AddField(
            model_name='article',
            name='expiration_date',
            field=models.DateTimeField(null=True, help_text='Leave blank if the article does not expire.', blank=True),
        ),
        migrations.AddField(
            model_name='article',
            name='is_active',
            field=models.BooleanField(default=False, editable=False),
        ),
        migrations.AddField(
            model_name='article',
            name='keywords',
            field=models.TextField(help_text='If omitted, the keywords will be the same as the article tags.', blank=True),
        ),
        migrations.AddField(
            model_name='article',
            name='publish_date',
            field=models.DateTimeField(default=datetime.datetime.now, help_text='The date and time this article shall appear online.'),
        ),
        migrations.AddField(
            model_name='article',
            name='thumbnail',
            field=models.FileField(null=True, upload_to=apps.article.models.get_upload_filename),
        ),
        migrations.AlterField(
            model_name='article',
            name='content',
            field=models.TextField(default=''),
        ),
        migrations.AlterField(
            model_name='article',
            name='title',
            field=models.CharField(max_length=100),
        ),
        migrations.DeleteModel(
            name='ArticleTag',
        ),
        migrations.DeleteModel(
            name='Tags',
        ),
        migrations.AddField(
            model_name='article',
            name='feedback',
            field=models.ForeignKey(to='article.Feedback', editable=False, default=1),
        ),
        migrations.AddField(
            model_name='article',
            name='tags',
            field=models.ManyToManyField(to='article.Tag', help_text='Tags that describe this article.', blank=True),
        ),
    ]
