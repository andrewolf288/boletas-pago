from django.urls import path, include
from . import views
from rest_framework import routers

router = routers.DefaultRouter()
router.register(r'voucher', views.VoucherViewSet, 'voucher')
router.register(r'remuneration', views.RemunerationViewSet, 'remuneration')

urlpatterns = [
    path('cargar-excel/', views.cargar_datos_desde_excel, name='cargar-excel'),
    path('', include(router.urls)),
]