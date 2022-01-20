from django.db import models

# Create your models here.
from django.utils import timezone


class Category(models.Model):
    parent_id = models.ForeignKey('self', on_delete=models.SET_NULL, null=True)
    name = models.CharField(max_length=100)


class Article(models.Model):
    title = models.CharField(max_length=100)
    content = models.CharField(max_length=100000)
    creation_datetime = models.DateTimeField(default=timezone.now())
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True)
    HIDDEN = 'HIDDEN'
    PUBLIC = 'PUBLIC'
    ARTICLE_STATUS_CHOICES = [
        (HIDDEN, 'Hidden'),
        (PUBLIC, 'Public')
    ]
    article_status = models.CharField(
        max_length=30,
        choices=ARTICLE_STATUS_CHOICES,
        default=PUBLIC
    )


class ArticleUser(models.Model):
    user_info = models.CharField(max_length=10000)
    article_id = models.ForeignKey(Article, on_delete=models.SET_NULL, null=True)
    user_id = models.IntegerField(null=True)


class Tag(models.Model):
    tag_name = models.CharField(max_length=100)
    article_id = models.ManyToManyField(Article)


class Comment(models.Model):
    user_name = models.CharField(max_length=100)
    content = models.CharField(max_length=10000)
    article = models.ForeignKey(Article, on_delete=models.CASCADE)
