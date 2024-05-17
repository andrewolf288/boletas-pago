from django.db import models
from django.contrib.auth import get_user_model
import uuid

User = get_user_model()

class RegistrationStatus(models.Models):
    description: models.CharField(max_length=1, blank=False, null=False)

class TypeDocument(models.Model):
    description: models.CharField(max_length=100, blank=False, null=False)
    state: models.ForeignKey(RegistrationStatus)

class Worker(models.Model):
    user: models.ForeignKey(User, on_delete=models.DO_NOTHING)
    type_document: models.ForeignKey(TypeDocument)
    document: models.CharField(unique=True, blank=False, null=False)
    state: models.ForeignKey(RegistrationStatus)

class Voucher(models.Model):
    worker: models.ForeignKey(Worker)
    token: models.UUIDField(default=uuid.uuid4, editable=False, unique=True)
    reviewed: models.BooleanField(default=False)
    reviewDate: models.DateTimeField()
    creationDate: models.DateTimeField(auto_created=True)
    updateDate: models.DateTimeField(auto_now_add=True)

class PaymentReceiptVerification(models.Model):
    durationReview: models.IntegerField()
    latitude: models.FloatField()
    longitude: models.FloatField()
    deviceType: models.CharField()