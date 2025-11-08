const button = document.querySelector('.button-add-task');
const input = document.querySelector('.input-task');
const listaCompleta = document.querySelector('.list-task');

let minhaListaDeItens = [];

// Adiciona nova tarefa
function adicionarNovaTarefa() {
    if (input.value.trim() === '') return; // evita adicionar vazio

    minhaListaDeItens.push({
        tarefa: input.value,
        concluida: false 
    });

    input.value = ''; // limpa o campo após adicionar
    mostraTarefas();
}

// Mostra tarefas na tela
function mostraTarefas() {
    let novaLi = '';

    minhaListaDeItens.forEach((item, posicao) => {
        novaLi += `
        <li class="task ${item.concluida ? "done" : ""}">
            <img src="img/checked.png" alt="check-na-tarefa" onclick="concluirTarefa(${posicao})">
            <p>${item.tarefa}</p>
            <img src="img/trash.png" alt="tarefa-para-lixo" onclick="deletarItem(${posicao})">
        </li>
        `;
    });

    listaCompleta.innerHTML = novaLi;

    localStorage.setItem("lista", JSON.stringify(minhaListaDeItens));
}

// Marca ou desmarca tarefa concluída
function concluirTarefa(posicao) {
    minhaListaDeItens[posicao].concluida = !minhaListaDeItens[posicao].concluida;
    mostraTarefas();
}

// Deleta tarefa
function deletarItem(posicao) {
    minhaListaDeItens.splice(posicao, 1); // remove 1 item do array
    mostraTarefas(); // atualiza a lista na tela
}

// Carrega lista salva ao abrir a página
function recarregarTarefas() {
    const tarefasLocalStorage = localStorage.getItem("lista");
    if (tarefasLocalStorage) {
        minhaListaDeItens = JSON.parse(tarefasLocalStorage);
        mostraTarefas();
    }
}

recarregarTarefas();

// Evento de clique para adicionar tarefa
button.addEventListener('click', adicionarNovaTarefa);
