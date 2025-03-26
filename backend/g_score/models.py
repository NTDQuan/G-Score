from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator

# Create your models here.
class ScoreModel(models.Model):
    class Meta:
        abstract = True

class Student(models.Model):
    student_id = models.IntegerField(primary_key=True)

class Subject(models.Model):
    id = models.AutoField(primary_key=True)
    subject = models.CharField(max_length=20, null=False, blank=False)

class Score(models.Model):
    id = models.AutoField(primary_key=True)
    student = models.ForeignKey(Student, on_delete=models.CASCADE, related_name="scores")
    subject = models.ForeignKey(Subject, on_delete=models.CASCADE, related_name="scores")
    score = models.FloatField(validators=[MinValueValidator(0), MaxValueValidator(10)], null=True, blank=True)

class ForeignLanguage(models.Model):
    id = models.AutoField(primary_key=True)
    language = models.CharField(max_length=20, null=False, blank=False)
    student = models.ForeignKey(Student, on_delete=models.CASCADE, related_name="languages")


