from django.db import models
from django.db.models import Sum, F, Count, Q, FloatField


class SubjectManager(models.Manager):
    def get_score_statistics(self, subject_id):
        return self.filter(id=subject_id).aggregate(
            lv4=Count('scores', filter=Q(scores__score__gte=8)),
            lv3=Count("scores", filter=Q(scores__score__gte=6, scores__score__lt=8)),
            lv2=Count("scores", filter=Q(scores__score__gte=4, scores__score__lt=6)),
            lv1=Count("scores", filter=Q(scores__score__lt=4))
        )

class StudentManager(models.Manager):
    def get_top_students(self, subject_list=[], top_n=10):
        return self.filter(scores__subject__in=subject_list).prefetch_related(
            'scores'
        ).annotate(
            total_score=Sum(
                F('scores__score'),
                output_field=FloatField()
            )
        ).order_by('-total_score')[:top_n]