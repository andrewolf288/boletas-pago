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

class WorkerByVoucherSerializer(serializers.ModelSerializer):

    class Meta:
        model = Worker
        fields = ['id', 'user', 'workerPosition', 'typeWorker', 'document', 'workRegime', 'specialSituation', 'pensionScheme', 'codeCUSPP', 'salary', 'admissionDate', 'terminationDate', 'sede', 'costCenter', 'situation', 'hasChildren']
        depth = 1

class VoucherSerializer(serializers.ModelSerializer):
    worker = WorkerByVoucherSerializer(read_only=True)

    class Meta:
        model = Voucher
        fields = '__all__'
        depth = 1