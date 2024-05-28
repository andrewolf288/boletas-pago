from django.shortcuts import render
from django.contrib.auth.models import User, Group
from rest_framework import generics, permissions, viewsets, status
from rest_framework.decorators import action
from .models import *
from .serializers import *
from openpyxl import load_workbook
from rest_framework.response import Response
from django_user_agents.utils import get_user_agent
from django.utils import timezone
import os

class RemunerationViewSet(viewsets.ModelViewSet):
    queryset = Remuneration.objects.all()
    # permission_classes = [permissions.IsAuthenticated]

    def get_serializer_class(self):
        if self.action == 'retrieve':
            return RemunerationDetailSerializer
        return RemunerationSerializer

    def list(self, request):
        serializer = self.get_serializer(self.queryset, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        return Response(serializer.data)

class VoucherViewSet(viewsets.ViewSet):
    
    @action(detail=False, methods=['post'])
    def getVoucherByToken(self, request):
        token = request.data.get('token', None)
        document = request.data.get('document', None)

        if token is not None and document is not None:
            try:
                record = Voucher.objects.get(token=token)
                if record.worker.document == document:
                    if record.reviewed == True:
                        return Response({'detail': 'Recurso no disponible', 'data': record.reviewDate}, status=status.HTTP_410_GONE)
                    else:
                        serializer = VoucherSerializer(record)
                        return Response(serializer.data)
                else:
                    return Response({'detail': 'Las credenciales no corresponden'}, status=status.HTTP_401_UNAUTHORIZED)

            except Voucher.DoesNotExist:
                return Response({'detail': 'Record not found.'}, status=status.HTTP_404_NOT_FOUND)
        else:
            return Response({'detail': 'Token parameter is required.'}, status=status.HTTP_400_BAD_REQUEST)
    
    @action(detail=False, methods=['post'])
    def verifyVoucherByToken(self, request):
        downloadPDF = request.data.get('downloadPDF', None)
        datetimeStartSession = request.data.get('datetimeStartSession', None)
        datetimeEndSession = request.data.get('datetimeEndSession', None)
        idVoucher = request.data.get('idVoucher', None)
        latitude = request.data.get('latitude', None)
        longitude = request.data.get('longitude', None)

        if idVoucher is not None:
            try:
                record = Voucher.objects.get(id=idVoucher)
                # Obtener información del dispositivo
                user_agent = get_user_agent(request)
                deviceType = 'PC' if user_agent.is_pc else 'Mobile' if user_agent.is_mobile else 'Tablet' if user_agent.is_tablet else 'Bot' if user_agent.is_bot else 'Unknown'

                # Obtener la dirección IP del cliente
                x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
                if x_forwarded_for:
                    ip = x_forwarded_for.split(',')[0]
                else:
                    ip = request.META.get('REMOTE_ADDR')
                
                # Crear una nueva instancia de PaymentReceiptVerification
                verification = PaymentReceiptVerification(
                    voucher=record,
                    latitude=latitude,
                    longitude=longitude,
                    deviceType=deviceType,  # Puedes añadir lógica para obtener esto si es necesario
                    datetimeStartSession=datetimeStartSession,
                    datetimeEndSession=datetimeEndSession,
                    downloadPDF=downloadPDF,
                    ipAddress=ip,
                )
                verification.save()

                # Actualizar la instancia de Voucher
                record.reviewed = True
                record.reviewedDate = timezone.now()
                record.save()

                return Response({'detail': 'Verification completed successfully.'}, status=status.HTTP_200_OK)

            except Voucher.DoesNotExist:
                return Response({'detail': 'Record not found.'}, status=status.HTTP_404_NOT_FOUND)   
        else:
            return Response({'detail': 'Parameters incorrects'}, status=status.HTTP_400_BAD_REQUEST)


# Funcion de importación de trabajadores
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