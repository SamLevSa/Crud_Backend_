import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import Doacao

# ==========================================
# CREATE (Parte Caio - Criar Doação)
# ==========================================
@csrf_exempt
def criar_doacao(request):
    if request.method == 'POST':
        try:
            dados = json.loads(request.body)
            nova_doacao = Doacao.objects.create(
                nome_alimento=dados['nome_alimento'],
                quantidade=dados['quantidade'],
                data_validade=dados['data_validade']
            )
            return JsonResponse({"mensagem": "Doação criada com sucesso!", "id": nova_doacao.id}, status=201)
        except Exception as e:
            return JsonResponse({"erro": str(e)}, status=400)
            
    return JsonResponse({"erro": "Método não permitido. Use POST."}, status=405)

# ==========================================
# READ (Parte Samuel - Ler Doações)
# ==========================================
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
        return JsonResponse({"erro": "Doação não encontrada"}, status=404)

# ==========================================
# DELETE (Parte Spinola - Deletar Doação)
# ==========================================
@csrf_exempt
def deletar_doacao(request, id):
    if request.method == 'DELETE':
        try:
            doacao = Doacao.objects.get(id=id)
            doacao.delete()
            return JsonResponse({"mensagem": "Doação excluída com sucesso!"})
        except Doacao.DoesNotExist:
            return JsonResponse({"erro": "Doação não encontrada."}, status=404)
            
    return JsonResponse({"erro": "Método não permitido. Use DELETE."}, status=405)