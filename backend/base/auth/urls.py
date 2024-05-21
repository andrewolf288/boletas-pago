from django.urls import path
from . import views
from .views import *

urlpatterns = [
    path('users/', views.UserList.as_view()),
]