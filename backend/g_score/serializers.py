from rest_framework import serializers
from .models import *

class ScoreSerializer(serializers.ModelSerializer):
    class Meta:
        model = ScoreModel
        fields = ['id', 'math', 'literature', 'physics', 'foreign_language', 'chemistry', 'biology', 'history',
                  'geography', 'civic_education', 'foreign_language_code']