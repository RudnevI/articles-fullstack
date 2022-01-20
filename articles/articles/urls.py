"""articles URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.urls import path, include
from rest_framework import routers

# Routers provide an easy way of automatically determining the URL conf.
from articleapp import views

router = routers.DefaultRouter()

urlpatterns = [
    path('', include(router.urls)),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    path('articles/', views.get_post_article),
    path('categories/', views.get_post_category),
    path('articles/<int:pk>', views.article_detail),
    path('categories/<int:pk>', views.category_detail),
    path('tags/<int:pk>', views.tag_detail),
    path('tags/', views.get_post_tag),
    path('article-users/', views.get_post_article_user),
    path('article-users/<int:pk>', views.article_user_detail),
    path('articles/comments/', views.get_post_comments),
    path('articles/<int:fk>/comments', views.get_comment_by_article_id)
]
