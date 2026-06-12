const API_URL = 'http://127.0.0.1:8000/doacoes/';

let doacaoEditandoId = null;
let listaDoacoesGlobais = []; 

async function carregarDoacoes() {
    try {
        const resposta = await fetch(API_URL);
        const doacoes = await resposta.json();
        
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
                        <th>Destino</th>
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
                    <td>${doacao.destino}</td>
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
        document.getElementById('area-doacoes').innerHTML = '<p>Erro ao conectar com o servidor Django.</p>';
    }
}

document.getElementById('form-criar').addEventListener('submit', async function(event) {
    event.preventDefault(); 

    const nome = document.getElementById('nome_alimento').value;
    const quantidade = document.getElementById('quantidade').value;
    const validade = document.getElementById('data_validade').value;
    const destino = document.getElementById('destino').value;

    const dados = {
        nome_alimento: nome,
        quantidade: parseInt(quantidade),
        data_validade: validade,
        destino: destino
    };

    try {
        let urlDestino = API_URL + 'criar/';
        let metodo = 'POST'; 

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
            
            document.getElementById('form-criar').reset();
            doacaoEditandoId = null;
            document.querySelector('.btn-criar').innerText = 'Salvar Doação'; 
            
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

function prepararEdicao(id) {
    const doacao = listaDoacoesGlobais.find(d => d.id === id);
    
    if (doacao) {
        document.getElementById('nome_alimento').value = doacao.nome_alimento;
        document.getElementById('quantidade').value = doacao.quantidade;
        document.getElementById('data_validade').value = doacao.data_validade;
        document.getElementById('destino').value = doacao.destino;

        doacaoEditandoId = id;
        document.querySelector('.btn-criar').innerText = 'Atualizar Doação';
        window.scrollTo(0, 0); 
    }
}

async function deletarDoacao(id) {
    const confirmar = confirm("Tem certeza que deseja apagar esta doação?");
    
    if (!confirmar) return;

    try {
        const resposta = await fetch(API_URL + `deletar/${id}/`, {
            method: 'DELETE'
        });

        if (resposta.ok) {
            alert("🗑️ Doação apagada com sucesso!");
            carregarDoacoes(); 
        } else {
            alert("Erro ao apagar doação.");
        }
    } catch (erro) {
        console.error('Erro ao deletar:', erro);
        alert('Erro ao conectar com o servidor.');
    }
}

// FUNÇÃO DA BARRA DE PESQUISA
function pesquisarDoacao() {
    const termo = document.getElementById('input-pesquisa').value.toLowerCase();
    const linhas = document.querySelectorAll('#area-doacoes tbody tr');
    
    linhas.forEach(linha => {
        const nomeAlimento = linha.cells[1].innerText.toLowerCase();
        
        if (nomeAlimento.includes(termo)) {
            linha.style.display = '';
        } else {
            linha.style.display = 'none';
        }
    });
}

carregarDoacoes();