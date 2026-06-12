// O endereço do nosso Backend (Django)
const API_URL = 'http://127.0.0.1:8000/doacoes/';

// Variáveis globais para controlar a edição
let doacaoEditandoId = null;
let listaDoacoesGlobais = []; 

// ==========================================
// R - READ: Buscar e exibir as doações
// ==========================================
async function carregarDoacoes() {
    try {
        const resposta = await fetch(API_URL);
        const doacoes = await resposta.json();
        
        // Salva na variável global para usarmos na hora de editar
        listaDoacoesGlobais = doacoes; 

        const areaDoacoes = document.getElementById('area-doacoes');

        if (doacoes.length === 0) {
            areaDoacoes.innerHTML = '<p>Nenhuma doação cadastrada ainda. O banco está vazio!</p>';
            return;
        }

        let tabela = `
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Alimento</th>
                        <th>Quantidade</th>
                        <th>Validade</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
        `;

        doacoes.forEach(doacao => {
            tabela += `
                <tr>
                    <td>${doacao.id}</td>
                    <td>${doacao.nome_alimento}</td>
                    <td>${doacao.quantidade}</td>
                    <td>${doacao.data_validade}</td>
                    <td>
                        <button class="btn-editar" onclick="prepararEdicao(${doacao.id})">Editar</button>
                        <button class="btn-deletar" onclick="deletarDoacao(${doacao.id})">Deletar</button>
                    </td>
                </tr>
            `;
        });

        tabela += `
                </tbody>
            </table>
        `;

        areaDoacoes.innerHTML = tabela;

    } catch (erro) {
        console.error("Erro ao carregar doações:", erro);
        document.getElementById('area-doacoes').innerHTML = '<p>Erro ao conectar com o servidor Django. O servidor está rodando?</p>';
    }
}

// ==========================================
// C e U - CREATE e UPDATE: Salvar Formulário
// ==========================================
document.getElementById('form-criar').addEventListener('submit', async function(event) {
    event.preventDefault(); // Evita que a página recarregue

    const nome = document.getElementById('nome_alimento').value;
    const quantidade = document.getElementById('quantidade').value;
    const validade = document.getElementById('data_validade').value;

    const dados = {
        nome_alimento: nome,
        quantidade: parseInt(quantidade),
        data_validade: validade
    };

    try {
        let urlDestino = API_URL + 'criar/';
        let metodo = 'POST'; // Padrão é criar

        // Se tiver um ID na variável, significa que estamos EDITANDO (UPDATE)
        if (doacaoEditandoId !== null) {
            urlDestino = API_URL + `editar/${doacaoEditandoId}/`;
            metodo = 'PUT';
        }

        const resposta = await fetch(urlDestino, {
            method: metodo,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dados)
        });

        if (resposta.ok) {
            alert(doacaoEditandoId ? '✏️ Doação atualizada com sucesso!' : '🌱 Doação cadastrada com sucesso!');
            
            // Limpa o formulário e reseta o modo de edição
            document.getElementById('form-criar').reset();
            doacaoEditandoId = null;
            document.querySelector('.btn-criar').innerText = 'Salvar Doação'; // Volta o texto original
            
            // Recarrega a tabela com os dados novos
            carregarDoacoes(); 
        } else {
            const erro = await resposta.json();
            alert('Erro: ' + JSON.stringify(erro));
        }
    } catch (erro) {
        console.error('Erro na requisição:', erro);
        alert('Erro ao conectar com o servidor Django.');
    }
});

// ==========================================
// Função auxiliar para o UPDATE
// ==========================================
function prepararEdicao(id) {
    // Procura a doação na nossa lista global
    const doacao = listaDoacoesGlobais.find(d => d.id === id);
    
    if (doacao) {
        // Preenche os campos do formulário com os dados dela
        document.getElementById('nome_alimento').value = doacao.nome_alimento;
        document.getElementById('quantidade').value = doacao.quantidade;
        document.getElementById('data_validade').value = doacao.data_validade;

        // Ativa o "Modo Edição"
        doacaoEditandoId = id;
        
        // Muda o visual do botão para o usuário saber o que está fazendo
        document.querySelector('.btn-criar').innerText = 'Atualizar Doação';
        
        // Joga a tela lá pro topo (onde fica o formulário)
        window.scrollTo(0, 0); 
    }
}

// ==========================================
// D - DELETE: Deletar Doação
// ==========================================
async function deletarDoacao(id) {
    // Pede confirmação antes de apagar
    const confirmar = confirm("Tem certeza que deseja apagar esta doação?");
    
    if (!confirmar) return;

    try {
        const resposta = await fetch(API_URL + `deletar/${id}/`, {
            method: 'DELETE'
        });

        if (resposta.ok) {
            alert("🗑️ Doação apagada com sucesso!");
            carregarDoacoes(); // Recarrega a tabela
        } else {
            alert("Erro ao apagar doação.");
        }
    } catch (erro) {
        console.error('Erro ao deletar:', erro);
        alert('Erro ao conectar com o servidor.');
    }
}

// Chama a função automaticamente assim que a página abre
carregarDoacoes();