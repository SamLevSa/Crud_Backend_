from django.urls import path
from . import views

urlpatterns = [
    path('deletar/<int:id>/', views.deletar_doacao, name='deletar_doacao'),
]