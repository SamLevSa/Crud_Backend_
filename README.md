# 🌱 Sistema EcoService - Gestão de Doações

O **EcoService** é um sistema Full-Stack desenvolvido para o gerenciamento de doações de alimentos. O projeto foi construído separando as responsabilidades entre o Backend (API RESTful) e o Frontend (Interface de Usuário), permitindo operações completas de C.R.U.D. (Create, Read, Update, Delete).

---

## 🛠️ Tecnologias Utilizadas

**Backend (API):**
* Python 3
* Django
* SQLite (Banco de Dados nativo)
* Django-CORS-Headers (Para permissão de requisições externas)

**Frontend (Interface):**
* HTML5
* CSS3 (Estilização responsiva e limpa)
* JavaScript Vanilla (Consumo da API usando a função assíncrona `fetch()`)

---

## ⚙️ Funcionalidades Implementadas

* **Create:** Cadastro de novos alimentos com nome, quantidade e data de validade.
* **Read:** Listagem em tempo real de todas as doações cadastradas no banco de dados.
* **Update:** Edição rápida das informações de uma doação existente.
* **Delete:** Exclusão segura de registros com confirmação prévia.

---

## 🚀 Como rodar o projeto localmente (Manual de Instalação)

### 1. Preparando a API (Backend)
Primeiro, clone o repositório para a sua máquina:
```bash
git clone [https://github.com/SamLevSa/Crud_Backend_.git](https://github.com/SamLevSa/Crud_Backend_.git)
cd Crud_Backend_

Crie e ative um ambiente virtual (VENV) para isolar as dependências do projeto:

    No Linux/Mac:
    Bash

    python3 -m venv venv
    source venv/bin/activate

    No Windows:
    Bash

    python -m venv venv
    venv\Scripts\activate

Com a VENV ativada, instale as bibliotecas necessárias contidas no arquivo de requisitos:
Bash

pip install -r requirements.txt

Crie a estrutura do banco de dados local:
Bash

python manage.py migrate

Ligue o servidor local do Django:
Bash

python manage.py runserver

O servidor estará rodando em http://127.0.0.1:8000/

2. Acessando o Sistema (Frontend)

Com o servidor do backend rodando no terminal, o frontend já está pronto para uso.
Basta navegar até a pasta frontend/ e abrir o arquivo index.html em qualquer navegador web (Google Chrome, Firefox, etc). Não é necessária nenhuma instalação adicional para a interface.
📡 Documentação da API (Endpoints)

Caso deseje consumir a API usando ferramentas como Postman ou Insomnia, estas são as rotas disponíveis no servidor local (http://127.0.0.1:8000/):

Método	Rota	Descrição:

POST	/doacoes/criar/	Cadastra uma nova doação (Requer corpo JSON)

GET	/doacoes/	Retorna a lista de todas as doações em JSON

GET	/doacoes/<id>/	Retorna os detalhes de uma doação específica

PUT	/doacoes/editar/<id>/	Atualiza os dados de uma doação específica

DELETE	/doacoes/deletar/<id>/	Exclui uma doação do banco de dados

👥 Equipe de Desenvolvimento:

    Lógica READ: Samuel

    Lógica DELETE: Spinola

    Lógica UPDATE: Rodrigo

    Lógica CREATE, Unificação, Frontend e Tech Lead: Caio Amaral