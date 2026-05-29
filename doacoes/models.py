from django.db import models

# Create your models here.
class Doacao(models.Model):
    # O registro do que foi doado
    nome_alimento = models.CharField(max_length=150)
    quantidade = models.IntegerField()

    # As repectivas datas de validade
    data_validade = models.DateField()

    # Data em que a doação entrou no sistema (preenchida automaticamente)
    data_entrada = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.quantidade}x {self.nome_alimento} (Validade: {self.data_validade})"
