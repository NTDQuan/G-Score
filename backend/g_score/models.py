from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator

# Create your models here.
class ScoreModel(models.Model):
    id = models.IntegerField(primary_key=True)
    math = models.FloatField(validators=[MinValueValidator(0), MaxValueValidator(10)], null=True, blank=True)
    literature = models.FloatField(validators=[MinValueValidator(0), MaxValueValidator(10)], null=True, blank=True)
    physics = models.FloatField(validators=[MinValueValidator(0), MaxValueValidator(10)], null=True, blank=True)
    foreign_language = models.FloatField(validators=[MinValueValidator(0), MaxValueValidator(10)], null=True, blank=True)
    chemistry = models.FloatField(validators=[MinValueValidator(0), MaxValueValidator(10)], null=True, blank=True)
    biology = models.FloatField(validators=[MinValueValidator(0), MaxValueValidator(10)], null=True, blank=True)
    history = models.FloatField(validators=[MinValueValidator(0), MaxValueValidator(10)], null=True, blank=True)
    geography = models.FloatField(validators=[MinValueValidator(0), MaxValueValidator(10)], null=True, blank=True)
    civic_education = models.FloatField(validators=[MinValueValidator(0), MaxValueValidator(10)], null=True, blank=True)
    foreign_language_code = models.CharField(max_length=2, null=True, blank=True)