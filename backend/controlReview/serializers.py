from rest_framework import serializers
from .models import *

class RemunerationTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = TypeRemuneration
        fields = ['id', 'description']

class RemunerationSerializer(serializers.ModelSerializer):
    remunerationType = RemunerationTypeSerializer(read_only=True)
    
    class Meta:
        model = Remuneration
        fields = ['id', 'code', 'month', 'year', 'duration', 'remunerationType', 'remunerationDateStart', 'remunerationDateEnd']