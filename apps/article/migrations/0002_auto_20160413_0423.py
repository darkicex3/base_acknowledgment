# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models
from django.conf import settings
import datetime


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('article', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Tag',
            fields=[
                ('id', models.AutoField(serialize=False, primary_key=True, auto_created=True, verbose_name='ID')),
                ('name', models.CharField(max_length=64, unique=True)),
                ('slug', models.CharField(null=True, max_length=64, blank=True, unique=True)),
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
            name='auto_tag',
            field=models.BooleanField(help_text='Check this if you want to automatically assign any existing tags to this article based on its content.', default=True),
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
            name='followup_for',
            field=models.ManyToManyField(to='article.Article', help_text='Select any other articles that this article follows up on.', blank=True, related_name='followups'),
        ),
        migrations.AddField(
            model_name='article',
            name='is_active',
            field=models.BooleanField(default=True),
        ),
        migrations.AddField(
            model_name='article',
            name='keywords',
            field=models.TextField(help_text='If omitted, the keywords will be the same as the article tags.', blank=True),
        ),
        migrations.AddField(
            model_name='article',
            name='publish_date',
            field=models.DateTimeField(help_text='The date and time this article shall appear online.', default=datetime.datetime.now),
        ),
        migrations.AddField(
            model_name='article',
            name='related_articles',
            field=models.ManyToManyField(to='article.Article', blank=True, related_name='_article_related_articles_+'),
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
            name='tags',
            field=models.ManyToManyField(to='article.Tag', help_text='Tags that describe this article.', blank=True),
        ),
    ]
