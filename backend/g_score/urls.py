from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import *

router = DefaultRouter()
router.register(r'score', ScoreViewSet, basename='score')
urlpatterns = [
    path('', include(router.urls)),
]