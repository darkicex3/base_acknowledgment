from django.db import models


class Tags(models.Model):
    title = models.CharField(max_length=200)


class Article(models.Model):
    title = models.CharField(max_length=200)
    content = models.CharField(max_length=1000000)


class ArticleTag(models.Model):
    tags = models.ManyToManyField(Tags)
    article = models.ManyToManyField(Article)


class Category(models.Model):
    title = models.CharField(max_length=200)
