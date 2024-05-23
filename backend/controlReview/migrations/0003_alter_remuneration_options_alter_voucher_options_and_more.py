# Generated by Django 5.0.6 on 2024-05-23 15:16

import django.db.models.deletion
import django.utils.timezone
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('controlReview', '0002_auto_20240520_0925'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='remuneration',
            options={'verbose_name': 'Remuneración', 'verbose_name_plural': 'Remuneraciones'},
        ),
        migrations.AlterModelOptions(
            name='voucher',
            options={'verbose_name': 'Boleta de pago', 'verbose_name_plural': 'Boletas'},
        ),
        migrations.AlterModelOptions(
            name='worker',
            options={'verbose_name': 'Trabajador', 'verbose_name_plural': 'Trabajadores'},
        ),
        migrations.RemoveField(
            model_name='remuneration',
            name='remunerationDate',
        ),
        migrations.AddField(
            model_name='remuneration',
            name='code',
            field=models.CharField(default='PL00001', editable=False, max_length=7, unique=True),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='remuneration',
            name='duration',
            field=models.PositiveSmallIntegerField(default=0),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='remuneration',
            name='remunerationDateEnd',
            field=models.DateField(default=django.utils.timezone.now),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='remuneration',
            name='remunerationDateStart',
            field=models.DateField(default=django.utils.timezone.now),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='remuneration',
            name='creationDate',
            field=models.DateTimeField(auto_now_add=True),
        ),
        migrations.AlterField(
            model_name='remuneration',
            name='updateDate',
            field=models.DateTimeField(auto_now=True),
        ),
        migrations.CreateModel(
            name='TypeRemuneration',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('description', models.CharField(max_length=100)),
                ('state', models.ForeignKey(default='A', null=True, on_delete=django.db.models.deletion.SET_NULL, to='controlReview.registrationstatus')),
            ],
        ),
        migrations.AddField(
            model_name='remuneration',
            name='remunerationType',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='controlReview.typeremuneration'),
        ),
    ]