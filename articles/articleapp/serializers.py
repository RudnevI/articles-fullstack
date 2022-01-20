from .models import Article, Category, Tag, ArticleUser, Comment
from rest_framework import serializers


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'parent_id', 'name']


class ArticleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Article
        fields = ['id', 'title', 'content', 'category', 'article_status']
        depth = 1


class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ['name', 'article']
        depth = 1


class ArticleUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = ArticleUser
        fields = ['user_info', 'article', 'user_id']
        depth = 1


class CommentSerializer(serializers.ModelSerializer):
    article = serializers.IntegerField

    class Meta:
        model = Comment
        fields = ['user_name', 'content', 'article']
        depth = 1

