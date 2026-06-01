from django.shortcuts import render
from django.http import JsonResponse
from .models import Doacao

def deletar_doacao(request, id):
    try:
        doacao = Doacao.objects.get(id=id)
        doacao.delete()

        return JsonResponse({
            "mensagem": "Doação excluída com sucesso!"
        })

    except Doacao.DoesNotExist:
        return JsonResponse({
            "erro": "Doação não encontrada."
        }, status=404)
