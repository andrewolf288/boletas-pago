# Generated by Django 5.0.6 on 2024-05-27 14:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('controlReview', '0009_alter_remuneration_note'),
    ]

    operations = [
        migrations.AddField(
            model_name='paymentreceiptverification',
            name='datetimeEndSession',
            field=models.DateTimeField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='paymentreceiptverification',
            name='datetimeStartSession',
            field=models.DateTimeField(blank=True, null=True),
        ),
    ]
