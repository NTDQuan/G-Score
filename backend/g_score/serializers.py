from rest_framework import serializers
from .models import *

class SubjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subject
        fields = '__all__'

class ForeignLanguageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ForeignLanguage
        fields = ['language']

class ScoreSerializer(serializers.ModelSerializer):
    subject = SubjectSerializer()
    class Meta:
        model = Score
        fields = '__all__'

class StudentSerializer(serializers.ModelSerializer):
    scores = ScoreSerializer(many=True)
    language = serializers.SerializerMethodField()

    class Meta:
        model = Student
        fields = '__all__'

    def get_language(self, obj):
        language_instance = obj.languages.first()
        return ForeignLanguageSerializer(language_instance).data if language_instance else None