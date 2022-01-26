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
    article_id = serializers.SlugRelatedField(many=True, slug_field="id", queryset=Article.objects.all())

    class Meta:
        model = Tag
        fields = ['id', 'tag_name', 'article_id']
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
        fields = ['id', 'user_name', 'content', 'article']
        depth = 1
