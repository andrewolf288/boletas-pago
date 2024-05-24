from django.urls import path
from . import views

urlpatterns = [
    path('remuneration/', views.RemunerationView.as_view()),
    path('cargar-excel/', views.cargar_datos_desde_excel, name='cargar-excel')
]