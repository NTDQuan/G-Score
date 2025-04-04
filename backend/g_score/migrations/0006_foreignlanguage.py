# Generated by Django 5.1.7 on 2025-03-24 10:30

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("g_score", "0005_student_remove_subject_foreign_language_code_and_more"),
    ]

    operations = [
        migrations.CreateModel(
            name="ForeignLanguage",
            fields=[
                ("id", models.AutoField(primary_key=True, serialize=False)),
                ("language", models.CharField(max_length=20)),
                (
                    "student",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="foreign_languages",
                        to="g_score.student",
                    ),
                ),
            ],
            options={
                "abstract": False,
            },
        ),
    ]
