from django.test import TestCase

# Create your tests here.
from django.urls import reverse

from articleapp.models import Article, Category
from articleapp.serializers import ArticleSerializer


class Helper:
    def create_if_db_empty(self):
        if Article.objects.count() == 0:
            Article.objects.create(title="test", content="test")

class ViewTests(TestCase):




    def test_get_all_articles(self):
        response = self.client.get("http://localhost:8000/articles/")
        self.assertEquals(response.status_code, 200)

    def test_post_article_no_category(self):
        response = self.client.post("http://localhost:8000/articles/",
                                    {"title": "test",
                                     "content": "test",

                                     "article_status": "HIDDEN"
                                     })
        self.assertEquals(response.status_code, 400)
        self.assertEquals(response.data, "Category is not found")

    def test_post_article_with_category(self):
        if Category.objects.count() == 0:
            category = Category()
            category.name = "test_category"
            category.save()

        response = self.client.post("http://localhost:8000/articles/",
                                    {"title": "test",
                                     "content": "test",
                                     "category": 1,
                                     "article_status": "HIDDEN"
                                     })
        self.assertEquals(response.status_code, 201)

    def test_get_article_by_id(self):
        if Article.objects.count() == 0:
            Article.objects.create(title="test", content="test")
        response = self.client.get("http://localhost:8000/articles/1")
        self.assertEquals(response.status_code, 200)

    def test_delete_article_by_id(self):
        Helper.create_if_db_empty()
        response = self.client.delete("http://localhost:8000/articles/1")
        self.assertEquals(response.status_code, 200)
