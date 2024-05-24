from django.shortcuts import render
from django.contrib.auth.models import User, Group
from rest_framework import generics, permissions
from .models import *
from .serializers import *
from openpyxl import load_workbook
from rest_framework.response import Response
import os

# Create your views here.
class RemunerationView(generics.ListAPIView):
    queryset = Remuneration.objects.all()
    serializer_class = RemunerationSerializer
    permission_classes = [permissions.IsAuthenticated]

def cargar_datos_desde_excel(request):
    grupo_trabajador, created = Group.objects.get_or_create(name='Trabajador')

    ruta_archivo = os.path.join(os.path.dirname(__file__), 'data', 'data.xlsx')
    workbook = load_workbook(filename=ruta_archivo)
    sheet = workbook.active

    for row in sheet.iter_rows(min_row=2, values_only=True):
        first_name = row[0]
        last_name = row[1]
        email = row[2]
        username = row[3]
        password = row[4]

        user = User.objects.create_user(
            username = username,
            password = password,
            first_name = first_name,
            last_name = last_name,
            email = email,
        )

        user.groups.add(grupo_trabajador)

        typeDocument = row[6]
        type_document = TypeDocument.objects.get(pk=typeDocument)
        document = row[7]
        workRegime = row[8]
        typeWorker = row[9]
        type_worker = TypeWorker.objects.get(pk=typeWorker)
        sede = row[16]
        situation = row[18]

        worker = Worker.objects.create(
            user=user,
            typeDocument=type_document,
            typeWorker=type_worker,
            document=document,
            workRegime=workRegime,
            sede=sede,
            situation=situation
        )