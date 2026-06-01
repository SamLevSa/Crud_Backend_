from django.shortcuts import render

# Create your views here.
from django.http import JsonResponse
from .models import Doacao

def listar_doacoes(request):
    doacoes = Doacao.objects.all()
    resultado = []
    
    for doacao in doacoes:
        resultado.append({
            "id": doacao.id,
            "nome_alimento": doacao.nome_alimento,
            "quantidade": doacao.quantidade,
            "data_validade": str(doacao.data_validade),
            "data_entrada": str(doacao.data_entrada),
        })
    
    return JsonResponse(resultado, safe=False)