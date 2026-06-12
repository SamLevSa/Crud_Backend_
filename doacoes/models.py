from django.db import models

class Doacao(models.Model):
    nome_alimento = models.CharField(max_length=150)
    quantidade = models.IntegerField()
    data_validade = models.DateField()
    
    # NOVO CAMPO: Para onde vai a doação
    destino = models.CharField(max_length=150, default="Estoque Interno") 
    
    data_entrada = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.quantidade}x {self.nome_alimento} -> {self.destino} (Validade: {self.data_validade})"