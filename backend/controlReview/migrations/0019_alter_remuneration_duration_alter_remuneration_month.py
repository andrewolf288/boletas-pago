# Generated by Django 5.0.6 on 2024-05-29 20:34

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('controlReview', '0018_voucher_diaslicenciagocehaber'),
    ]

    operations = [
        migrations.AlterField(
            model_name='remuneration',
            name='duration',
            field=models.PositiveIntegerField(),
        ),
        migrations.AlterField(
            model_name='remuneration',
            name='month',
            field=models.PositiveIntegerField(),
        ),
    ]
