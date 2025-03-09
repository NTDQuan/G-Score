from django.db.models import ExpressionWrapper, F, FloatField
from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from .models import ScoreModel
from .serializers import ScoreSerializer


# Create your views here.
class ScoreViewSet(viewsets.ModelViewSet):
    queryset = ScoreModel.objects.all()
    serializer_class = ScoreSerializer

    @action(detail=False, methods=['get'])
    def get_statistic(self, request):
        subject = request.GET.get('subject', None)

        if not subject:
            return Response({"error": "Missing subject parameter"}, status = 400)

        valid_subjects = [
            "math", "literature", "physics", "foreign_language",
            "chemistry", "biology", "history", "geography", "civic_education"
        ]

        if subject not in valid_subjects:
            return Response({"error": "Invalid subject name"}, status=400)

        return Response({
            "subject": subject,
            "lv4": ScoreModel.objects.filter(**{f"{subject}__gte": 8}).count(),
            "lv3": ScoreModel.objects.filter(**{f"{subject}__lt": 8, f"{subject}__gte": 6}).count(),
            "lv2": ScoreModel.objects.filter(**{f"{subject}__lt": 6, f"{subject}__gte": 4}).count(),
            "lv1": ScoreModel.objects.filter(**{f"{subject}__lt": 4}).count(),
        })

    @action(detail=False, methods=['get'])
    def get_a_top_student(self, request):
        group_a_students = ScoreModel.objects.filter(
            math__isnull=False,
            physics__isnull=False,
            chemistry__isnull=False,
        )

        group_a_students = group_a_students.annotate(
            total_score=ExpressionWrapper(
                F('math') + F('physics') + F('chemistry'),
                output_field=FloatField()
            )
        )

        top_10_students = group_a_students.order_by('-total_score')[:10]

        serializer = self.get_serializer(top_10_students, many=True)
        return Response(serializer.data)