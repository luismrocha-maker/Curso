const catalogo = [
    { id: 1, nome: "Suporte Técnico de TI", categoria: "Tecnologia", descricao: "Apoio para problemas em computadores, softwares e rede." },
    { id: 2, nome: "Emissão de Crachá", categoria: "RH", descricao: "Solicitação de primeira ou segunda via de identificação." },
    { id: 3, nome: "Manutenção de Ar-Condicionado", categoria: "Infraestrutura", descricao: "Reparo, higienização e vistoria de aparelhos de ar." },
    { id: 4, nome: "Reserva de Sala de Reunião", categoria: "Infraestrutura", descricao: "Agendamento de auditórios e salas para eventos internos." },
    { id: 5, nome: "Acesso a Novos Sistemas", categoria: "Tecnologia", descricao: "Liberação de usuários e permissões em ferramentas." },
    { id: 6, nome: "Solicitação de Férias", categoria: "RH", descricao: "Envio de formulários e agendamento de períodos de descanso." }
];

let solicitacoes = JSON.parse(localStorage.getItem("conecta_solicitacoes")) || [];

function mudarAba(abaNome) {
    document.querySelectorAll(".aba").forEach(aba => aba.classList.add("escondido"));
    document.querySelectorAll(".btn-nav").forEach(btn => btn.classList.remove("ativo"));

    document.getElementById("aba-" + abaNome).classList.remove("escondido");
    document.getElementById("btn-nav-" + abaNome).classList.add("ativo");

    if (abaNome === "painel") {
        renderizarPainel();
    }
}

function carregarOpcoesServico() {
    const select = document.getElementById("select-servico");
    select.innerHTML = '<option value="">Selecione um serviço...</option>';

    catalogo.forEach(servico => {
        const option = document.createElement("option");
        option.value = servico.nome;
        option.textContent = servico.nome + " (" + servico.categoria + ")";
        select.appendChild(option);
    });
}

function filtrarCatalogo() {
    const texto = document.getElementById("busca-catalogo").value.toLowerCase();
    const categoria = document.getElementById("filtro-categoria").value;
    const container = document.getElementById("grid-catalogo");

    const filtrados = catalogo.filter(item => {
        const bateTexto = item.nome.toLowerCase().includes(texto) || item.descricao.toLowerCase().includes(texto);
        const bateCategoria = categoria === "todas" || item.categoria === categoria;
        return bateTexto && bateCategoria;
    });

    container.innerHTML = "";

    if (filtrados.length === 0) {
        container.innerHTML = '<p class="mensagem-alerta">Nenhum serviço encontrado no catálogo.</p>';
        return;
    }

    filtrados.forEach(item => {
        container.innerHTML += `
            <div class="card-servico">
                <span class="badge-categoria">${item.categoria}</span>
                <h3>${item.nome}</h3>
                <p>${item.descricao}</p>
                <button class="btn-secundario" onclick="solicitarDireto('${item.nome}')">Solicitar Serviço</button>
            </div>
        `;
    });
}

function solicitarDireto(nomeServico) {
    mudarAba("solicitacao");
    document.getElementById("select-servico").value = nomeServico;
}

function gerarProtocolo() {
    const numero = Math.floor(100000 + Math.random() * 900000);
    return "PROT-" + numero;
}

function criarSolicitacao(e) {
    e.preventDefault();

    const servico = document.getElementById("select-servico").value;
    const solicitante = document.getElementById("input-solicitante").value;
    const descricao = document.getElementById("txt-descricao").value;

    if (!servico || !solicitante.trim() || !descricao.trim()) {
        alert("Por favor, preencha todos os campos obrigatórios.");
        return;
    }

    const hoje = new Date();
    const dataFormatada = hoje.toLocaleDateString("pt-BR") + " às " + hoje.toLocaleTimeString("pt-BR", { hour: '2-digit', minute: '2-digit' });

    const novaSolicitacao = {
        protocolo: gerarProtocolo(),
        data: dataFormatada,
        servico: servico,
        solicitante: solicitante,
        descricao: descricao,
        status: "Pendente"
    };

    solicitacoes.push(novaSolicitacao);
    localStorage.setItem("conecta_solicitacoes", JSON.stringify(solicitacoes));

    document.getElementById("form-solicitacao").reset();
    mudarAba("painel");
}

function alterarStatus(protocolo, novoStatus) {
    for (let i = 0; i < solicitacoes.length; i++) {
        if (solicitacoes[i].protocolo === protocolo) {
            solicitacoes[i].status = novoStatus;
            break;
        }
    }

    localStorage.setItem("conecta_solicitacoes", JSON.stringify(solicitacoes));
    renderizarPainel();
}

function renderizarPainel() {
    const filtro = document.getElementById("filtro-status").value;
    const container = document.getElementById("lista-painel");
    const msgVazia = document.getElementById("msg-vazia");

    const filtradas = solicitacoes.filter(item => {
        return filtro === "todos" || item.status === filtro;
    });

    container.innerHTML = "";

    if (filtradas.length === 0) {
        msgVazia.classList.remove("escondido");
        return;
    } else {
        msgVazia.classList.add("escondido");
    }

    filtradas.forEach(item => {
        let classeStatus = "status-pendente";
        if (item.status === "Em Andamento") classeStatus = "status-andamento";
        if (item.status === "Concluído") classeStatus = "status-concluido";

        container.innerHTML += `
            <div class="card-chamado">
                <div class="topo-chamado">
                    <span class="protocolo">${item.protocolo}</span>
                    <span class="data">${item.data}</span>
                </div>
                <h3>${item.servico}</h3>
                <p><strong>Solicitante:</strong> ${item.solicitante}</p>
                <p><strong>Descrição:</strong> ${item.descricao}</p>
                
                <div class="rodape-chamado">
                    <span class="status-badge ${classeStatus}">${item.status}</span>
                    <div class="acoes-status">
                        <label>Mudar status:</label>
                        <select onchange="alterarStatus('${item.protocolo}', this.value)">
                            <option value="Pendente" ${item.status === "Pendente" ? "selected" : ""}>Pendente</option>
                            <option value="Em Andamento" ${item.status === "Em Andamento" ? "selected" : ""}>Em Andamento</option>
                            <option value="Concluído" ${item.status === "Concluído" ? "selected" : ""}>Concluído</option>
                        </select>
                    </div>
                </div>
            </div>
        `;
    });
}

carregarOpcoesServico();
filtrarCatalogo();