# Generated by Django 5.0.6 on 2024-05-28 16:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('controlReview', '0014_voucher_errorsend_voucher_sentemail'),
    ]

    operations = [
        migrations.AddField(
            model_name='voucher',
            name='sentEmailDate',
            field=models.DateTimeField(blank=True, null=True),
        ),
    ]