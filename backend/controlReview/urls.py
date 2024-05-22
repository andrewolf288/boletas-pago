from django.urls import path
from . import views

urlpatterns = [
    path('remuneration/', views.RemunerationView.as_view()),
]