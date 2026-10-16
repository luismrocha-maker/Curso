# Conecta+ - Central de Serviços (DESAFIO 3)

O Conecta+ é uma aplicação web feita para organizar e acompanhar solicitações de serviços internos, como suporte de TI, RH e manutenção de infraestrutura. O projeto foi desenvolvido do zero utilizando apenas HTML, CSS e JavaScript puro (sem bibliotecas ou frameworks externos), integrando os conceitos aprendidos ao longo do curso.

---

## O que a aplicação faz

* Catálogo de Serviços:
  * Mostra os serviços disponíveis gerados a partir de um array de objetos no JavaScript.
  * Permite buscar por texto (digitando o nome ou a descrição do serviço).
  * Permite filtrar por categoria (Tecnologia, RH ou Infraestrutura).
  * Tem um botão para escolher o serviço e ir direto para a tela de solicitação.

* Nova Solicitação:
  * Formulário simples com validação dos campos obrigatórios.
  * Gera um número de protocolo automático para cada chamado enviado (exemplo: PROT-839201).
  * Salva automaticamente o dia e a hora do registro.

* Painel de Acompanhamento:
  * Lista todos os chamados criados.
  * Permite filtrar a visualização pelo status (Pendente, Em Andamento ou Concluído).
  * Permite alterar o status do chamado direto no painel.

* Salvamento dos Dados:
  * Tudo fica salvo no localStorage do navegador. Se você atualizar a página ou fechar o navegador, os chamados criados continuam lá.

---

## Estrutura dos Arquivos

* index.html: Toda a estrutura das 3 telas (Catálogo, Nova Solicitação e Painel) em uma única página.
* style.css: Estilos da página, cores dos botões, badges de status e regras de responsividade.
* script.js: Lógica do sistema, busca, filtros, criação do protocolo, alteração de status e localStorage.
* README.md: Documentação com as explicações e decisões do projeto.

---

## Decisões de Desenvolvimento

* Navegação por Abas: Optei por criar uma aplicação de página única (SPA), onde o JavaScript apenas esconde e mostra as seções. Isso torna o uso mais rápido e evita que a página precise recarregar ao trocar de aba.
* Manipulação de Dados: As solicitações são tratadas como objetos dentro de uma lista, o que facilitou a implementação da busca, dos filtros e da alteração de status.
* Layout Responsivo: O CSS foi ajustado para que o layout se adapte bem tanto em telas de computador quanto em celulares.

---

## Histórico de Commits

1. feat: estrutura inicial do HTML e navegacao por abas
2. style: estilizacao e layout responsivo
3. feat: catalogo de servicos e busca com filtro
4. feat: formulario de solicitacao e gerador de protocolo
5. feat: painel de acompanhamento e mudanca de status
6. feat: persistencia dos dados com localStorage
7. docs: documentacao final no README
