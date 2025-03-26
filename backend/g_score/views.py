from django.db.models import ExpressionWrapper, F, FloatField, Sum, Q, Prefetch, Count
from django.shortcuts import render, get_object_or_404
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.exceptions import NotFound
from rest_framework.response import Response

from .models import ScoreModel, Subject, Score, Student, ForeignLanguage
from .serializers import ScoreSerializer, StudentSerializer, ForeignLanguageSerializer, SubjectSerializer


class ScoreViewSet(viewsets.ModelViewSet):
    queryset = Score.objects.all()
    serializer_class = ScoreSerializer

    @action(detail=False, methods=['get'])
    def get_statistic(self, request):
        subject_id = request.GET.get('subject')

        if not subject_id:
            return Response({"error": "Missing subject parameter"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            subject_id = int(subject_id)
            subject = Subject.objects.get(id=subject_id)
        except (ValueError, Subject.DoesNotExist):
            return Response({"error": "Invalid subject ID"}, status=status.HTTP_400_BAD_REQUEST)

        statistics = Score.objects.filter(subject=subject).aggregate(
            lv4=Count("id", filter=Q(score__gte=8)),
            lv3=Count("id", filter=Q(score__gte=6, score__lt=8)),
            lv2=Count("id", filter=Q(score__gte=4, score__lt=6)),
            lv1=Count("id", filter=Q(score__lt=4))
        )

        return Response({
            "subject": subject_id,
            **statistics
        }, status=status.HTTP_200_OK)

class SubjectViewSet(viewsets.ModelViewSet):
    queryset = Subject.objects.all()
    serializer_class = SubjectSerializer

class StudentViewSet(viewsets.ModelViewSet):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer
    lookup_field = 'student_id'

    def get(self, request, *arg, **kwargs):
        try:
            student = self.get_object()
            serializer = StudentSerializer(student)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Student.DoesNotExist:
            return Response({"error": "Student not found"}, status=status.HTTP_404_NOT_FOUND)


    @action(detail=False, methods=['get'])
    def get_a_top_student(self, request):
        group_a_students = Student.objects.annotate(
            total_score=Sum(
                F('scores__score'),
                filter=Q(scores__subject__subject__in=["toan", "vat_li", "hoa_hoc"]),
                output_field=FloatField()
            )
        ).filter(total_score__isnull=False).order_by('-total_score')[:10]

        if not group_a_students:
            return ({"message": "No students found"}, status.HTTP_404_NOT_FOUND)

        serializer = StudentSerializer(group_a_students, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)




