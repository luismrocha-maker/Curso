let tarefas = JSON.parse(localStorage.getItem("minhasTarefas")) || [];

function salvar() {
    localStorage.setItem("minhasTarefas", JSON.stringify(tarefas));
}

function atualizar() {
    let lista = document.getElementById("listaTarefas");
    let msg = document.getElementById("mensagem");
    
    lista.innerHTML = "";
    
    if (tarefas.length === 0) {
        msg.style.display = "block";
    } else {
        msg.style.display = "none";
    }

    let concluidas = 0;

    for (let i = 0; i < tarefas.length; i++) {
        let t = tarefas[i];

        if (t.concluida) {
            concluidas++;
        }

        lista.innerHTML += `
            <div class="tarefa ${t.concluida ? 'concluida' : ''}">
                <h3>${t.disciplina}</h3>
                <p>${t.descricao}</p>
                <p class="prioridade">Prioridade: ${t.prioridade}</p>
                <div class="botoes">
                    <button onclick="mudarStatus(${i})">${t.concluida ? 'Desmarcar' : 'Concluir'}</button>
                    <button class="excluir" onclick="remover(${i})">Excluir</button>
                </div>
            </div>
        `;
    }

    document.getElementById("total").textContent = tarefas.length;
    document.getElementById("concluidas").textContent = concluidas;
    document.getElementById("pendentes").textContent = tarefas.length - concluidas;
}

function mudarStatus(index) {
    tarefas[index].concluida = !tarefas[index].concluida;
    salvar();
    atualizar();
}

function remover(index) {
    tarefas.splice(index, 1);
    salvar();
    atualizar();
}

document.getElementById("formTarefa").addEventListener("submit", function(e) {
    e.preventDefault();

    let disciplina = document.getElementById("disciplina").value;
    let descricao = document.getElementById("descricao").value;
    let prioridade = document.getElementById("prioridade").value;

    tarefas.push({
        disciplina: disciplina,
        descricao: descricao,
        prioridade: prioridade,
        concluida: false
    });

    salvar();
    atualizar();

    this.reset();
});

atualizar();