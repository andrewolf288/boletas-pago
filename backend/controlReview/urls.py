from django.urls import path, include
from . import views
from rest_framework import routers

routerVoucher = routers.SimpleRouter()
routerVoucher.register(r'voucher', views.VoucherViewSet, '')

urlpatterns = [
    path('remuneration/', views.RemunerationView.as_view()),
    path('cargar-excel/', views.cargar_datos_desde_excel, name='cargar-excel'),
    path('', include(routerVoucher.urls))
]