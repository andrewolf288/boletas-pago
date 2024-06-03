from __future__ import absolute_import, unicode_literals
import os
from celery import Celery
from django.conf import settings

# Configuración por defecto del módulo de Django para 'celery'
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'planilla.settings')

# app = Celery('planilla', broker='redis://localhost:6379/0', backend='redis://')
app = Celery('planilla')

# Usar una cadena aquí significa que el worker no tiene que serializar
# el objeto de configuración a procesos secundarios.
app.config_from_object('django.conf:settings', namespace='CELERY')

# Cargar task modules desde todos los app configs registrados en Django.
app.autodiscover_tasks()

@app.task(bind=True, ignore_result=True)
def debug_task(self):
    print(f'Request: {self.request!r}')