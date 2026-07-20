/**
 * Ponto de entrada: liga formulário, dados, motor e renderização.
 */

import {
  Candidato,
  criarVagasAPartirDoJSON,
  analisarCompatibilidade,
  encontrarMelhorVaga,
  gerarRecomendacaoEstudo,
  criarContadorDeAnalises,
  finalizarAnalise,
  exibirMensagemFinal,
  ordenarResultados,
} from "./motor.js";

import {
  carregarVagas,
  salvarPerfil,
  carregarPerfil,
  salvarTema,
  carregarTema,
  salvarOrdenacao,
  carregarOrdenacao,
} from "./dados.js";

import {
  obterElementos,
  preencherFormularioComPerfil,
  validarFormulario,
  extrairDadosFormulario,
  renderizarPerfil,
  mostrarStatusCarregando,
  mostrarStatusErro,
  mostrarStatusVazio,
  renderizarDestaque,
  renderizarCardsVagas,
  atualizarContadorAnalises,
  exibirMensagemCallback,
  aplicarTema,
  alternarTema,
  atualizarIconeTema,
} from "./ui.js";

const contadorAnalises = criarContadorDeAnalises();
const elementos = obterElementos();

let vagasInstanciadas = [];
let ultimosResultados = [];

function inicializarTema() {
  const temaSalvo = carregarTema() || "claro";
  aplicarTema(temaSalvo);
  atualizarIconeTema(elementos, temaSalvo);
}

function inicializarOrdenacao() {
  const criterio = carregarOrdenacao();
  elementos.selectOrdenacao.value = criterio;
}

async function carregarCatalogoVagas() {
  mostrarStatusCarregando(elementos);

  const resultado = await carregarVagas();

  if (!resultado.sucesso) {
    mostrarStatusErro(
      elementos,
      `Erro ao carregar vagas: ${resultado.erro}. Use Live Server ou npm start e tente recarregar a página.`
    );
    return false;
  }

  if (resultado.vazio) {
    mostrarStatusVazio(elementos);
    return false;
  }

  vagasInstanciadas = criarVagasAPartirDoJSON(resultado.vagas);
  return true;
}

function processarAnalise(candidato) {
  const resultados = analisarCompatibilidade(candidato, vagasInstanciadas);
  ultimosResultados = resultados;

  const criterio = elementos.selectOrdenacao.value;
  const resultadosOrdenados = ordenarResultados(resultados, criterio);

  const melhor = encontrarMelhorVaga(resultados, candidato.experienciaMeses);
  const recomendacao = gerarRecomendacaoEstudo(resultados);

  renderizarPerfil(elementos, candidato);
  renderizarDestaque(elementos, melhor, recomendacao);
  renderizarCardsVagas(elementos, resultadosOrdenados);

  const total = contadorAnalises();
  atualizarContadorAnalises(elementos, total);

  finalizarAnalise(candidato.nome, (nome) => {
    exibirMensagemCallback(elementos, exibirMensagemFinal(nome));
    salvarPerfil(candidato);
  });
}

function configurarFormulario() {
  elementos.formulario.addEventListener("submit", (evento) => {
    evento.preventDefault();

    if (!validarFormulario(elementos)) return;

    if (vagasInstanciadas.length === 0) {
      mostrarStatusErro(
        elementos,
        "Não há vagas carregadas para analisar. Recarregue a página em um servidor local."
      );
      return;
    }

    const dados = extrairDadosFormulario(elementos);
    const candidato = new Candidato(dados);
    processarAnalise(candidato);
  });
}

function configurarOrdenacao() {
  elementos.selectOrdenacao.addEventListener("change", () => {
    const criterio = elementos.selectOrdenacao.value;
    salvarOrdenacao(criterio);

    if (ultimosResultados.length > 0) {
      const ordenados = ordenarResultados(ultimosResultados, criterio);
      renderizarCardsVagas(elementos, ordenados);
    }
  });
}

function configurarTema() {
  elementos.btnTema.addEventListener("click", () => {
    const temaAtual = document.documentElement.getAttribute("data-tema");
    const novoTema = alternarTema(temaAtual);
    aplicarTema(novoTema);
    salvarTema(novoTema);
    atualizarIconeTema(elementos, novoTema);
  });
}

function criarCandidatoAPartirDoPerfil(perfil) {
  return new Candidato({
    ...perfil,
    habilidades: Array.isArray(perfil.habilidades)
      ? perfil.habilidades
      : String(perfil.habilidades).split(",").map((habilidade) => habilidade.trim()),
  });
}

async function iniciar() {
  inicializarTema();
  inicializarOrdenacao();
  configurarFormulario();
  configurarOrdenacao();
  configurarTema();

  const perfilSalvo = carregarPerfil();
  preencherFormularioComPerfil(elementos, perfilSalvo);

  if (perfilSalvo) {
    renderizarPerfil(elementos, perfilSalvo);
  }

  const vagasOk = await carregarCatalogoVagas();

  if (vagasOk && perfilSalvo) {
    processarAnalise(criarCandidatoAPartirDoPerfil(perfilSalvo));
  }
}

iniciar();
