from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('base.auth.urls')),
    path('api/control/', include('controlReview.urls'))
]
