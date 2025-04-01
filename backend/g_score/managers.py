from django.db import models
from django.db.models import Sum, F, Count, Q, FloatField


class SubjectManager(models.Manager):
    def get_score_statistics(self, subject_id):
        return self.get(id=subject_id).scores.aggregate(
            lv4=Count('score', filter=Q(score__gte=8)),
            lv3=Count("score", filter=Q(score__gte=6, score__lt=8)),
            lv2=Count("score", filter=Q(score__gte=4, score__lt=6)),
            lv1=Count("score", filter=Q(score__lt=4))
        )

class StudentManager(models.Manager):
    def get_top_students(self, subject_list=[], top_n=10):
        return self.filter(scores__subject__in=subject_list).prefetch_related(
            'scores__student'
        ).annotate(
            total_score=Sum(
                F('scores__score'),
                output_field=FloatField()
            )
        ).order_by('-total_score')[:top_n]