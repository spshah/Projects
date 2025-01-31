from django.urls import path
from . import views

urlpatterns = [
    path('api/import-csv/', views.import_csv, name='import_csv'),
]

