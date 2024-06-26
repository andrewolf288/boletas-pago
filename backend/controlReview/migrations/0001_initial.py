# Generated by Django 5.0.6 on 2024-05-20 14:23

import django.db.models.deletion
import uuid
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='RegistrationStatus',
            fields=[
                ('state', models.CharField(max_length=1, primary_key=True, serialize=False)),
                ('description', models.CharField(max_length=1)),
            ],
        ),
        migrations.CreateModel(
            name='Remuneration',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('month', models.PositiveSmallIntegerField()),
                ('year', models.PositiveIntegerField()),
                ('remunerationDate', models.DateTimeField()),
                ('creationDate', models.DateTimeField()),
                ('updateDate', models.DateTimeField()),
                ('state', models.ForeignKey(default='A', null=True, on_delete=django.db.models.deletion.SET_NULL, to='controlReview.registrationstatus')),
            ],
        ),
        migrations.CreateModel(
            name='TypeDocument',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('description', models.CharField(max_length=100)),
                ('state', models.ForeignKey(default='A', null=True, on_delete=django.db.models.deletion.SET_NULL, to='controlReview.registrationstatus')),
            ],
        ),
        migrations.CreateModel(
            name='Voucher',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('creationDate', models.DateTimeField(auto_created=True)),
                ('token', models.UUIDField(default=uuid.uuid4, editable=False, unique=True)),
                ('reviewed', models.BooleanField(default=False)),
                ('reviewDate', models.DateTimeField()),
                ('updateDate', models.DateTimeField(auto_now_add=True)),
                ('remuneration', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='controlReview.remuneration')),
                ('state', models.ForeignKey(default='A', null=True, on_delete=django.db.models.deletion.SET_NULL, to='controlReview.registrationstatus')),
            ],
        ),
        migrations.CreateModel(
            name='PaymentReceiptVerification',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('durationReview', models.IntegerField(default=0)),
                ('latitude', models.FloatField(null=True)),
                ('longitude', models.FloatField(null=True)),
                ('deviceType', models.CharField(blank=True, max_length=50, null=True)),
                ('state', models.ForeignKey(default='A', null=True, on_delete=django.db.models.deletion.SET_NULL, to='controlReview.registrationstatus')),
                ('voucher', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='controlReview.voucher')),
            ],
        ),
        migrations.CreateModel(
            name='Worker',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('document', models.CharField(max_length=11, unique=True)),
                ('state', models.ForeignKey(default='A', null=True, on_delete=django.db.models.deletion.SET_NULL, to='controlReview.registrationstatus')),
                ('type_document', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='controlReview.typedocument')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.AddField(
            model_name='voucher',
            name='worker',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='controlReview.worker'),
        ),
    ]
