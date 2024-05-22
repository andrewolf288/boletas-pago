from rest_framework import serializers
from .models import *

class RemunerationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Remuneration
        fields = ['id', 'month', 'year', 'remunerationDate']