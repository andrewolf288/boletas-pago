# Generated by Django 5.0.6 on 2024-05-27 14:31

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('controlReview', '0010_paymentreceiptverification_datetimeendsession_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='paymentreceiptverification',
            name='downloadPDF',
            field=models.BooleanField(default=False),
        ),
    ]
