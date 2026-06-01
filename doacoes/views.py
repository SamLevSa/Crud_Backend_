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

def buscar_doacao(request, id):
    try:
        doacao = Doacao.objects.get(id=id)

        dados = {
            "id": doacao.id,
            "nome_alimento": doacao.nome_alimento,
            "quantidade": doacao.quantidade,
            "data_validade": str(doacao.data_validade),
            "data_entrada": str(doacao.data_entrada),
        }

        return JsonResponse(dados)
    
    except Doacao.DoesNotExist:

        return JsonResponse(
            {"erro": "Doacao Nao Encontrada"},
            status=404
        )