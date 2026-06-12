"""
URL configuration for ecoservice project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/6.0/topics/http/urls/
"""
from django.contrib import admin
from django.urls import path
from doacoes.views import criar_doacao, listar_doacoes, buscar_doacao, editar_doacao, deletar_doacao

urlpatterns = [
    path('admin/', admin.site.urls),
    path('doacoes/criar/', criar_doacao),
    path('doacoes/', listar_doacoes),
    path('doacoes/<int:id>/', buscar_doacao),
    path('doacoes/editar/<int:id>/', editar_doacao),
    path('doacoes/deletar/<int:id>/', deletar_doacao),
]