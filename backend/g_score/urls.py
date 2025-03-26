from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import *

router = DefaultRouter()
router.register(r'student', StudentViewSet, basename='student')
router.register(r'score', ScoreViewSet, basename='score')
router.register(r'subject', SubjectViewSet, basename='subject')
urlpatterns = [
    path('', include(router.urls)),
]