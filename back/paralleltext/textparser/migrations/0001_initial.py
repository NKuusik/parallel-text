# Generated by Django 5.0.7 on 2024-07-25 14:34

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Text',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=200)),
            ],
        ),
        migrations.CreateModel(
            name='Line',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('line_contents', models.CharField(max_length=400)),
                ('number', models.IntegerField(default=0)),
                ('text', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='textparser.text')),
            ],
            options={
                'unique_together': {('text', 'number')},
            },
        ),
    ]
