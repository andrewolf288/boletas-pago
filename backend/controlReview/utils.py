from celery import shared_task
from django.utils import timezone
from django.core.mail import EmailMultiAlternatives
# import smtplib
from datetime import datetime, timedelta
from .models import Voucher

def send_email(subject, text_content, html_content, from_email, to_email):
    try:
        msg = EmailMultiAlternatives(subject, text_content, from_email, [to_email])
        msg.attach_alternative(html_content, "text/html")
        msg.send()
        return 'Success'
    except smtplib.SMTPRecipientsRefused:
        return 'Error: All recipients were refused.'
    except smtplib.SMTPHeloError:
        return 'Error: The server didn’t reply properly to the HELO greeting.'
    except smtplib.SMTPSenderRefused:
        return 'Error: The server didn’t accept the sender email address.'
    except smtplib.SMTPDataError:
        return 'Error: The server replied with an unexpected error code (other than a refusal of a recipient).'
    except smtplib.SMTPException as e:
        return f'Error: An SMTP error occurred: {e}'
    except Exception as e:
        return f'Sorry, something went wrong. Please try again later: {e}'

@shared_task
def send_email_task(voucher_id, subject, text_content, html_content, from_email, to_email):
    print(f'Enviando correo {voucher_id} {subject} {text_content} {html_content} {from_email} {to_email}')
    try:
        msg = EmailMultiAlternatives(subject, text_content, from_email, [to_email])
        msg.attach_alternative(html_content, "text/html")
        msg.send()
        
        voucher = Voucher.objects.get(id=voucher_id)
        voucher.sentEmail = True
        voucher.sentEmailDate = timezone.now()
        voucher.save()
        print('Se envio con exito')
    except Exception as e:
        voucher = Voucher.objects.get(id=voucher_id)
        voucher.sentEmail = False
        voucher.errorSend = str(e)
        voucher.save()
        print('Se envio sin exito')

def obtener_nombre_mes(numero_mes):
    # Lista de nombres de meses
    meses = ["ENERO", "FEBRERO", "MARZO", "ABRIL", "MAYO", "JUNIO",
             "JULIO", "AGOSTO", "SEPTIEMBRE", "OCTUBRE", "NOVIEMBRE", "DICIEMBRE"]
    # Validar que el número del mes sea válido
    if 1 <= numero_mes <= 12:
        return meses[numero_mes - 1]
    else:
        return None

def concatenar_mes_ano(numero_mes, ano):
    nombre_mes = obtener_nombre_mes(numero_mes)
    if nombre_mes:
        return f"{nombre_mes} {ano}"
    else:
        return "Número de mes no válido"

def convert_to_total_hours(date_str):
    # Parse the input date string
    date_time = datetime.strptime(date_str, "%Y-%m-%d %H:%M:%S")

    # Define the start date (1900-01-01)
    start_date = datetime(1900, 1, 1)

    # Calculate the difference between the input date and the start date
    time_difference = date_time - start_date

    # Excel bug: add one day for the non-existent February 29, 1900
    days = time_difference.days + 1
    seconds = time_difference.seconds

    # Calculate total hours (including fractions)
    total_hours = days * 24 + seconds / 3600

    # Get the integer part of the total hours
    total_hours_int = int(total_hours)

    # Calculate the remaining minutes
    remaining_minutes = int((total_hours - total_hours_int) * 60)

    # Format the result as 'hours:minutes'
    result = f"{total_hours_int}:{str(remaining_minutes).zfill(2)}"

    return result

def convert_decimal_to_hours_minutes(decimal_value):
    if decimal_value == '0':
        return ''
    # Calcular el número total de horas (incluyendo las fracciones)
    try:
        decimal_value = float(decimal_value)
        total_hours = decimal_value * 24

        # Obtener la parte entera de las horas
        total_hours_int = int(total_hours)

        # Calcular los minutos restantes
        remaining_minutes = round((total_hours - total_hours_int) * 60)

        # Asegurarse de que si los minutos son 60, se incremente la hora en 1
        if remaining_minutes == 60:
            total_hours_int += 1
            remaining_minutes = 0

        # Formatear el resultado como 'hours:minutes'
        result = f"{total_hours_int}:{str(remaining_minutes).zfill(2)}"

        return result
    except Exception as e:
        return ''

def excel_serial_to_date(serial):
    if serial == '0':
        return ''

    try:
        # Fecha base en Excel (1 de enero de 1900)
        excel_base_date = datetime(1900, 1, 1)

        # Ajuste por el error de Excel que considera 1900 como año bisiesto
        serial = int(serial)
        adjusted_serial = serial - 2  # Restamos 2 días porque Excel incluye el 29 de febrero de 1900

        # Sumar el número de días al 1 de enero de 1900
        target_date = excel_base_date + timedelta(days=adjusted_serial)

        return target_date
    except Exception as e:
        return ''