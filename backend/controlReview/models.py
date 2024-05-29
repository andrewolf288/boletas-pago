from django.db import models
from django.contrib.auth import get_user_model
import uuid
from django.utils import timezone
from datetime import datetime

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

class TypeRemuneration(models.Model):
    description = models.CharField(max_length=100, blank=False, null=False)
    state = models.ForeignKey(RegistrationStatus, on_delete=models.SET_NULL, default='A', null=True)

    def __str__(self):
        return self.description

class TypeWorker(models.Model):
    description = models.CharField(max_length=100, blank=False, null=False)
    state = models.ForeignKey(RegistrationStatus, on_delete=models.SET_NULL, default='A', null=True)

    def __str__(self):
        return self.description

class WorkerPosition(models.Model):
    description = models.CharField(max_length=100, blank=False, null=False)
    state = models.ForeignKey(RegistrationStatus, on_delete=models.SET_NULL, default='A', null=True)

    def __str__(self):
        return self.description

class Worker(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    workerPosition = models.ForeignKey(WorkerPosition, null=True, on_delete=models.SET_NULL)
    typeDocument = models.ForeignKey(TypeDocument, null=True, on_delete=models.SET_NULL)
    typeWorker = models.ForeignKey(TypeWorker, null=True, on_delete=models.SET_NULL)
    document = models.CharField(max_length=11, unique=True, blank=False, null=False)
    workRegime = models.CharField(max_length=100, blank=True)
    specialSituation = models.BooleanField(default=False)
    pensionScheme = models.CharField(max_length=150, blank=True)
    codeCUSPP = models.CharField(max_length=20, blank=True)
    salary = models.DecimalField(max_digits=8, decimal_places=2, default=0)
    admissionDate = models.DateField(null=True, blank=True)
    terminationDate = models.DateField(null=True, blank=True)
    sede = models.CharField(max_length=100, blank=True)
    costCenter = models.CharField(max_length=10, blank=True)
    situation = models.CharField(max_length=50, blank=True)
    hasChildren = models.BooleanField(default=False)
    state = models.ForeignKey(RegistrationStatus, on_delete=models.SET_NULL, default='A', null=True)

    class Meta:
        verbose_name = 'Trabajador'
        verbose_name_plural = 'Trabajadores'
    
    def __str__(self):
        return f'{self.user.first_name} {self.user.last_name} - {self.document}'

class Remuneration(models.Model):
    code = models.CharField(max_length=7, unique=True, editable=False)
    year = models.PositiveIntegerField()
    month = models.PositiveIntegerField()
    duration = models.PositiveIntegerField()
    remunerationType = models.ForeignKey(TypeRemuneration, null=True, default=1, on_delete=models.SET_NULL)
    remunerationDateStart = models.DateField()
    remunerationDateEnd = models.DateField()
    note = models.TextField(blank=True)
    creationDate = models.DateTimeField(auto_now_add=True)
    updateDate = models.DateTimeField(auto_now=True)
    state = models.ForeignKey(RegistrationStatus, on_delete=models.SET_NULL, default='A', null=True)

    class Meta:
        verbose_name = 'Remuneración'
        verbose_name_plural = 'Remuneraciones'
    
    def generate_code(self):
        # Obtener el último objeto y su código
        last_object = Remuneration.objects.all().order_by('id').last()
        if not last_object:
            new_code = 'PL00001'
        else:
            last_code = last_object.code
            last_number = int(last_code[2:])
            new_number = last_number + 1
            new_code = f'PL{new_number:05d}'
        return new_code

    def save(self, *args, **kwargs):
        if not self.code:
            self.code = self.generate_code()
        super().save(*args, **kwargs)
    
    def __str__(self):
        return f'{self.code} - {str(self.month).zfill(2)} - {self.year}'

class Voucher(models.Model):
    # informacion de verificacion
    remuneration = models.ForeignKey(Remuneration, related_name='vouchers', on_delete=models.CASCADE)
    token = models.UUIDField(default=uuid.uuid4, editable=False, unique=True)
    reviewed = models.BooleanField(default=False)
    reviewDate = models.DateTimeField(blank=True, null=True)
    sentEmail = models.BooleanField(default=False)
    errorSend = models.TextField(blank=True)
    sentEmailDate = models.DateTimeField(blank=True, null=True)

    #informacion del trabajador
    worker = models.ForeignKey(Worker, on_delete=models.CASCADE)

    # informacion planilla
    fechaInicioVacaciones = models.DateField(null=True, blank=True)
    fechaFinVacaciones = models.DateField(null=True, blank=True)
    diasLaborados = models.PositiveSmallIntegerField(default=0)
    diasNoLaborados = models.PositiveSmallIntegerField(default=0)
    horasLaboradas = models.CharField(max_length=10, blank=True)
    horasExtraSimples = models.CharField(max_length=10, blank=True)
    horasExtrasDobles = models.CharField(max_length=10, blank=True)
    bonificacionNocturna = models.CharField(max_length=10, blank=True)
    diasLicenciaGoceHaber = models.CharField(max_length=10, blank=True)
    diasFalta = models.PositiveSmallIntegerField(default=0)
    diasVacaciones = models.PositiveSmallIntegerField(default=0)
    diasDescansoMedico = models.PositiveSmallIntegerField(default=0)

    # remuneraciones
    haberBasico = models.DecimalField(max_digits=8, decimal_places=2, default=0)
    asignacionFamiliar = models.DecimalField(max_digits=8, decimal_places=2, default=0)
    licenciaGoceHaber = models.DecimalField(max_digits=8, decimal_places=2, default=0)
    incapacidadEnfermedad = models.DecimalField(max_digits=8, decimal_places=2, default=0)
    hrsExtSimples25 = models.DecimalField(max_digits=8, decimal_places=2, default=0)
    hrsExtSimples35 = models.DecimalField(max_digits=8, decimal_places=2, default=0)
    diaDelTrabajador = models.DecimalField(max_digits=8, decimal_places=2, default=0)
    comisionDestajo = models.DecimalField(max_digits=8, decimal_places=2, default=0)
    gratificacion = models.DecimalField(max_digits=8, decimal_places=2, default=0)
    bonoExtraordinario = models.DecimalField(max_digits=8, decimal_places=2, default=0)
    cts = models.DecimalField(max_digits=8, decimal_places=2, default=0)
    vacaciones = models.DecimalField(max_digits=8, decimal_places=2, default=0)
    utilidad = models.DecimalField(max_digits=8, decimal_places=2, default=0)
    canastaVale = models.DecimalField(max_digits=8, decimal_places=2, default=0)
    premio =  models.DecimalField(max_digits=8, decimal_places=2, default=0)

    # descuentos
    snp = models.DecimalField(max_digits=8, decimal_places=2, default=0)
    afpFondo = models.DecimalField(max_digits=8, decimal_places=2, default=0)
    afpSeguro = models.DecimalField(max_digits=8, decimal_places=2, default=0)
    afpComision = models.DecimalField(max_digits=8, decimal_places=2, default=0)
    rtaStaCategoria = models.DecimalField(max_digits=8, decimal_places=2, default=0)
    adelantos = models.DecimalField(max_digits=8, decimal_places=2, default=0)
    esSaludVida = models.DecimalField(max_digits=8, decimal_places=2, default=0)
    tardanzaPermisosDescuentos = models.DecimalField(max_digits=8, decimal_places=2, default=0)
    inasistencia = models.DecimalField(max_digits=8, decimal_places=2, default=0)
    pagoGratificaciones = models.DecimalField(max_digits=8, decimal_places=2, default=0)
    pagoCTS = models.DecimalField(max_digits=8, decimal_places=2, default=0)
    pagoVacacionesBeneficios = models.DecimalField(max_digits=8, decimal_places=2, default=0)
    otrosDescuentos = models.DecimalField(max_digits=8, decimal_places=2, default=0)
    pagoUtilidad = models.DecimalField(max_digits=8, decimal_places=2, default=0)
    entCanastaVale = models.DecimalField(max_digits=8, decimal_places=2, default=0)
    
    # aportes del empleador
    esEssalud = models.DecimalField(max_digits=8, decimal_places=2, default=0)
    senati = models.DecimalField(max_digits=8, decimal_places=2, default=0)
    sctrSaludPension = models.DecimalField(max_digits=8, decimal_places=2, default=0)
    
    # datos finales
    totalRemuneraciones = models.DecimalField(max_digits=8, decimal_places=2, default=0)
    totalDescuentos = models.DecimalField(max_digits=8, decimal_places=2, default=0)
    totalAportaciones = models.DecimalField(max_digits=8, decimal_places=2, default=0)
    netoPagar = models.DecimalField(max_digits=8, decimal_places=2, default=0)
    
    # datos de registro
    creationDate = models.DateTimeField(auto_now_add=True)
    updateDate = models.DateTimeField(auto_now=True)
    state = models.ForeignKey(RegistrationStatus, on_delete=models.SET_NULL, default='A', null=True)

    class Meta:
        verbose_name = 'Boleta de pago'
        verbose_name_plural = 'Boletas'

    def __str__(self):
        return f'{str(self.token)}'

class PaymentReceiptVerification(models.Model):
    voucher = models.OneToOneField(Voucher, related_name='verification', on_delete=models.CASCADE)
    latitude = models.FloatField(null=True, blank=True)
    longitude = models.FloatField(null=True, blank=True)
    deviceType = models.CharField(max_length=50, blank=True)
    datetimeStartSession = models.DateTimeField(null=True, blank=True)
    datetimeEndSession = models.DateTimeField(null=True, blank=True)
    durationReview = models.IntegerField(default=0)
    downloadPDF = models.BooleanField(default=False)
    ipAddress = models.GenericIPAddressField(null=True, blank=True)
    state = models.ForeignKey(RegistrationStatus, on_delete=models.SET_NULL, default='A', null=True)

    def save(self, *args, **kwargs):
        # Convertir datetimeStartSession y datetimeEndSession a objetos datetime si son cadenas
        if isinstance(self.datetimeStartSession, str):
            self.datetimeStartSession = datetime.fromisoformat(self.datetimeStartSession)
        if isinstance(self.datetimeEndSession, str):
            self.datetimeEndSession = datetime.fromisoformat(self.datetimeEndSession)
        
        # Calcular la duración de la revisión
        if self.datetimeStartSession and self.datetimeEndSession:
            self.durationReview = int((self.datetimeEndSession - self.datetimeStartSession).total_seconds())
        
        super().save(*args, **kwargs)
