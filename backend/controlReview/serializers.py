from rest_framework import serializers
from .models import *
from django.contrib.auth import get_user_model
User = get_user_model()

class UserInformationVoucherSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['first_name', 'last_name', 'email']

class WorkerByVoucherSerializer(serializers.ModelSerializer):
    user = UserInformationVoucherSerializer(read_only=True)

    class Meta:
        model = Worker
        fields = ['id', 'user', 'workerPosition', 'typeWorker', 'document', 'workRegime', 'specialSituation', 'pensionScheme', 'codeCUSPP', 'salary', 'admissionDate', 'terminationDate', 'sede', 'costCenter', 'situation', 'hasChildren']
        depth = 1
        
class PaymentReceiptVerificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = PaymentReceiptVerification
        fields = '__all__'

class VoucherSerializer(serializers.ModelSerializer):
    verification = PaymentReceiptVerificationSerializer(read_only=True)
    worker = WorkerByVoucherSerializer(read_only=True)
    class Meta:
        model = Voucher
        fields = '__all__'

class RemunerationDetailSerializer(serializers.ModelSerializer):
    vouchers = VoucherSerializer(many=True, read_only=True)
    class Meta:
        model = Remuneration
        fields = '__all__'

class RemunerationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Remuneration
        fields = ['id', 'code', 'month', 'year', 'duration', 'remunerationType', 'remunerationDateStart', 'remunerationDateEnd']
        depth = 1

class VoucherSerializer(serializers.ModelSerializer):
    worker = WorkerByVoucherSerializer(read_only=True)

    class Meta:
        model = Voucher
        fields = '__all__'
        depth = 1