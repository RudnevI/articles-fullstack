# Generated by Django 4.0 on 2022-01-20 15:18

import datetime
from django.db import migrations, models
from django.utils.timezone import utc


class Migration(migrations.Migration):

    dependencies = [
        ('articleapp', '0002_alter_article_creation_datetime'),
    ]

    operations = [
        migrations.AlterField(
            model_name='article',
            name='creation_datetime',
            field=models.DateTimeField(default=datetime.datetime(2022, 1, 20, 15, 18, 39, 765488, tzinfo=utc)),
        ),
    ]