from django.db import models
from django.contrib.auth import get_user_model
import uuid

User = get_user_model()

class RegistrationStatus(models.Model):
    state = models.CharField(max_length=1, primary_key=True)
    description = models.CharField(max_length=1, blank=False, null=False)

    def __str__(self):
        return self.description

class TypeDocument(models.Model):
    description = models.CharField(max_length=100, blank=False, null=False)
    state = models.ForeignKey(RegistrationStatus, on_delete=models.SET_NULL, default='A', null=True)

    def __str__(self):
        return self.description

class Worker(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    type_document = models.ForeignKey(TypeDocument, null=True, on_delete=models.SET_NULL)
    document = models.CharField(max_length=11, unique=True, blank=False, null=False)
    state = models.ForeignKey(RegistrationStatus, on_delete=models.SET_NULL, default='A', null=True)

    class Meta:
        verbose_name = 'Trabajador'
        verbose_name_plural = 'Trabajadores'
    
    def __str__(self):
        return f'{self.user.first_name} {self.user.last_name} - {self.document}'

class Remuneration(models.Model):
    month = models.PositiveSmallIntegerField()
    year = models.PositiveIntegerField()
    remunerationDate = models.DateTimeField()
    creationDate = models.DateTimeField()
    updateDate = models.DateTimeField()
    state = models.ForeignKey(RegistrationStatus, on_delete=models.SET_NULL, default='A', null=True)

    class Meta:
        verbose_name = 'Remuneración'
        verbose_name_plural = 'Remuneraciones'
    
    def __str__(self):
        return f'{str(self.month).zfill(2)} - {self.year}'

class Voucher(models.Model):
    remuneration = models.ForeignKey(Remuneration, on_delete=models.CASCADE)
    worker = models.ForeignKey(Worker, on_delete=models.CASCADE)
    token = models.UUIDField(default=uuid.uuid4, editable=False, unique=True)
    reviewed = models.BooleanField(default=False)
    reviewDate = models.DateTimeField()
    creationDate = models.DateTimeField(auto_created=True)
    updateDate = models.DateTimeField(auto_now_add=True)
    state = models.ForeignKey(RegistrationStatus, on_delete=models.SET_NULL, default='A', null=True)

    class Meta:
        verbose_name = 'Boleta de pago'
        verbose_name_plural = 'Boletas'

class PaymentReceiptVerification(models.Model):
    voucher = models.ForeignKey(Voucher, on_delete=models.CASCADE)
    durationReview = models.IntegerField(default=0)
    latitude = models.FloatField(null=True)
    longitude = models.FloatField(null=True)
    deviceType = models.CharField(max_length=50, blank=True, null=True)
    state = models.ForeignKey(RegistrationStatus, on_delete=models.SET_NULL, default='A', null=True)
