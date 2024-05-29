from django.core.mail import EmailMultiAlternatives
import smtplib

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

def obtener_nombre_mes(numero_mes):
    # Lista de nombres de meses
    meses = ["enero", "febrero", "marzo", "abril", "mayo", "junio",
             "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"]
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