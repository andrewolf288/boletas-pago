from django.shortcuts import render
from rest_framework import generics, permissions
from .models import *
from .serializers import *

# Create your views here.
class RemunerationView(generics.ListAPIView):
    queryset = Remuneration.objects.all()
    serializer_class = RemunerationSerializer
    permission_classes = [permissions.IsAuthenticated]
