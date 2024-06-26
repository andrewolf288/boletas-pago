# Generated by Django 5.0.6 on 2024-05-28 17:57

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('controlReview', '0015_voucher_sentemaildate'),
    ]

    operations = [
        migrations.AddField(
            model_name='paymentreceiptverification',
            name='ipAddress',
            field=models.GenericIPAddressField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='paymentreceiptverification',
            name='latitude',
            field=models.FloatField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='paymentreceiptverification',
            name='longitude',
            field=models.FloatField(blank=True, null=True),
        ),
    ]
