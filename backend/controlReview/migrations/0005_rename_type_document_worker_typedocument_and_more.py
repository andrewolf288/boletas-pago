# Generated by Django 5.0.6 on 2024-05-24 16:31

import django.db.models.deletion
import django.utils.timezone
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('controlReview', '0004_remuneration_note'),
    ]

    operations = [
        migrations.RenameField(
            model_name='worker',
            old_name='type_document',
            new_name='typeDocument',
        ),
        migrations.AddField(
            model_name='voucher',
            name='adelantos',
            field=models.DecimalField(decimal_places=2, default=0, max_digits=8),
        ),
        migrations.AddField(
            model_name='voucher',
            name='afpComision',
            field=models.DecimalField(decimal_places=2, default=0, max_digits=8),
        ),
        migrations.AddField(
            model_name='voucher',
            name='afpFondo',
            field=models.DecimalField(decimal_places=2, default=0, max_digits=8),
        ),
        migrations.AddField(
            model_name='voucher',
            name='afpSeguro',
            field=models.DecimalField(decimal_places=2, default=0, max_digits=8),
        ),
        migrations.AddField(
            model_name='voucher',
            name='asignacionFamiliar',
            field=models.DecimalField(decimal_places=2, default=0, max_digits=8),
        ),
        migrations.AddField(
            model_name='voucher',
            name='bonificacionNocturna',
            field=models.DecimalField(decimal_places=2, default=0, max_digits=8),
        ),
        migrations.AddField(
            model_name='voucher',
            name='bonoExtraordinario',
            field=models.DecimalField(decimal_places=2, default=0, max_digits=8),
        ),
        migrations.AddField(
            model_name='voucher',
            name='canastaVale',
            field=models.DecimalField(decimal_places=2, default=0, max_digits=8),
        ),
        migrations.AddField(
            model_name='voucher',
            name='comisionDestajo',
            field=models.DecimalField(decimal_places=2, default=0, max_digits=8),
        ),
        migrations.AddField(
            model_name='voucher',
            name='cts',
            field=models.DecimalField(decimal_places=2, default=0, max_digits=8),
        ),
        migrations.AddField(
            model_name='voucher',
            name='diaDelTrabajador',
            field=models.DecimalField(decimal_places=2, default=0, max_digits=8),
        ),
        migrations.AddField(
            model_name='voucher',
            name='diasDescansoMedico',
            field=models.PositiveSmallIntegerField(default=0),
        ),
        migrations.AddField(
            model_name='voucher',
            name='diasFalta',
            field=models.PositiveSmallIntegerField(default=0),
        ),
        migrations.AddField(
            model_name='voucher',
            name='diasLaborados',
            field=models.PositiveSmallIntegerField(default=0),
        ),
        migrations.AddField(
            model_name='voucher',
            name='diasNoLaborados',
            field=models.PositiveSmallIntegerField(default=0),
        ),
        migrations.AddField(
            model_name='voucher',
            name='diasVacaciones',
            field=models.PositiveSmallIntegerField(default=0),
        ),
        migrations.AddField(
            model_name='voucher',
            name='entCanastaVale',
            field=models.DecimalField(decimal_places=2, default=0, max_digits=8),
        ),
        migrations.AddField(
            model_name='voucher',
            name='esEssalud',
            field=models.DecimalField(decimal_places=2, default=0, max_digits=8),
        ),
        migrations.AddField(
            model_name='voucher',
            name='esSaludVida',
            field=models.DecimalField(decimal_places=2, default=0, max_digits=8),
        ),
        migrations.AddField(
            model_name='voucher',
            name='fechaFinVacaciones',
            field=models.DateField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='voucher',
            name='fechaInicioVacaciones',
            field=models.DateField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='voucher',
            name='gratificacion',
            field=models.DecimalField(decimal_places=2, default=0, max_digits=8),
        ),
        migrations.AddField(
            model_name='voucher',
            name='haberBasico',
            field=models.DecimalField(decimal_places=2, default=0, max_digits=8),
        ),
        migrations.AddField(
            model_name='voucher',
            name='horasExtraSimples',
            field=models.PositiveSmallIntegerField(default=0),
        ),
        migrations.AddField(
            model_name='voucher',
            name='horasExtrasDobles',
            field=models.PositiveSmallIntegerField(default=0),
        ),
        migrations.AddField(
            model_name='voucher',
            name='horasLaboradas',
            field=models.PositiveSmallIntegerField(default=0),
        ),
        migrations.AddField(
            model_name='voucher',
            name='hrsExtSimples25',
            field=models.DecimalField(decimal_places=2, default=0, max_digits=8),
        ),
        migrations.AddField(
            model_name='voucher',
            name='hrsExtSimples35',
            field=models.DecimalField(decimal_places=2, default=0, max_digits=8),
        ),
        migrations.AddField(
            model_name='voucher',
            name='inasistencia',
            field=models.DecimalField(decimal_places=2, default=0, max_digits=8),
        ),
        migrations.AddField(
            model_name='voucher',
            name='incapacidadEnfermedad',
            field=models.DecimalField(decimal_places=2, default=0, max_digits=8),
        ),
        migrations.AddField(
            model_name='voucher',
            name='licenciaGoceHaber',
            field=models.DecimalField(decimal_places=2, default=0, max_digits=8),
        ),
        migrations.AddField(
            model_name='voucher',
            name='otrosDescuentos',
            field=models.DecimalField(decimal_places=2, default=0, max_digits=8),
        ),
        migrations.AddField(
            model_name='voucher',
            name='pagoCTS',
            field=models.DecimalField(decimal_places=2, default=0, max_digits=8),
        ),
        migrations.AddField(
            model_name='voucher',
            name='pagoGratificaciones',
            field=models.DecimalField(decimal_places=2, default=0, max_digits=8),
        ),
        migrations.AddField(
            model_name='voucher',
            name='pagoUtilidad',
            field=models.DecimalField(decimal_places=2, default=0, max_digits=8),
        ),
        migrations.AddField(
            model_name='voucher',
            name='pagoVacacionesBeneficios',
            field=models.DecimalField(decimal_places=2, default=0, max_digits=8),
        ),
        migrations.AddField(
            model_name='voucher',
            name='premio',
            field=models.DecimalField(decimal_places=2, default=0, max_digits=8),
        ),
        migrations.AddField(
            model_name='voucher',
            name='rtaStaCategoria',
            field=models.DecimalField(decimal_places=2, default=0, max_digits=8),
        ),
        migrations.AddField(
            model_name='voucher',
            name='sctrSaludPension',
            field=models.DecimalField(decimal_places=2, default=0, max_digits=8),
        ),
        migrations.AddField(
            model_name='voucher',
            name='senati',
            field=models.DecimalField(decimal_places=2, default=0, max_digits=8),
        ),
        migrations.AddField(
            model_name='voucher',
            name='snp',
            field=models.DecimalField(decimal_places=2, default=0, max_digits=8),
        ),
        migrations.AddField(
            model_name='voucher',
            name='tardanzaPermisosDescuentos',
            field=models.DecimalField(decimal_places=2, default=0, max_digits=8),
        ),
        migrations.AddField(
            model_name='voucher',
            name='utilidad',
            field=models.DecimalField(decimal_places=2, default=0, max_digits=8),
        ),
        migrations.AddField(
            model_name='voucher',
            name='vacaciones',
            field=models.DecimalField(decimal_places=2, default=0, max_digits=8),
        ),
        migrations.AddField(
            model_name='worker',
            name='admissionDate',
            field=models.DateField(default=django.utils.timezone.now),
        ),
        migrations.AddField(
            model_name='worker',
            name='codeCUSPP',
            field=models.CharField(blank=True, max_length=20, null=True),
        ),
        migrations.AddField(
            model_name='worker',
            name='costCenter',
            field=models.CharField(blank=True, max_length=10, null=True),
        ),
        migrations.AddField(
            model_name='worker',
            name='hasChildren',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='worker',
            name='pensionScheme',
            field=models.CharField(blank=True, max_length=150, null=True),
        ),
        migrations.AddField(
            model_name='worker',
            name='salary',
            field=models.DecimalField(decimal_places=2, default=0, max_digits=8),
        ),
        migrations.AddField(
            model_name='worker',
            name='sede',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
        migrations.AddField(
            model_name='worker',
            name='situation',
            field=models.CharField(blank=True, max_length=50, null=True),
        ),
        migrations.AddField(
            model_name='worker',
            name='specialSituation',
            field=models.CharField(blank=True, max_length=200, null=True),
        ),
        migrations.AddField(
            model_name='worker',
            name='terminationDate',
            field=models.DateField(default=django.utils.timezone.now),
        ),
        migrations.AddField(
            model_name='worker',
            name='workRegime',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
        migrations.CreateModel(
            name='TypeWorker',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('description', models.CharField(max_length=100)),
                ('state', models.ForeignKey(default='A', null=True, on_delete=django.db.models.deletion.SET_NULL, to='controlReview.registrationstatus')),
            ],
        ),
        migrations.AddField(
            model_name='worker',
            name='typeWorker',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='controlReview.typeworker'),
        ),
        migrations.CreateModel(
            name='WorkerPosition',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('description', models.CharField(max_length=100)),
                ('state', models.ForeignKey(default='A', null=True, on_delete=django.db.models.deletion.SET_NULL, to='controlReview.registrationstatus')),
            ],
        ),
        migrations.AddField(
            model_name='worker',
            name='workerPosition',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='controlReview.workerposition'),
        ),
    ]
