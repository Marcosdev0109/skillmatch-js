/**
 * Funções de interface: formulário, mensagens acessíveis e cards no DOM.
 */

import { obterNivelClassificacao } from "./motor.js";

const CLASSE_COMPATIBILIDADE = {
  alta: "badge--alta",
  media: "badge--media",
  baixa: "badge--baixa",
};

const ICONE_COMPATIBILIDADE = {
  alta: "✅",
  media: "⚠️",
  baixa: "❌",
};

export function obterElementos() {
  return {
    formulario: document.getElementById("form-perfil"),
    campoNome: document.getElementById("nome"),
    campoArea: document.getElementById("area"),
    campoExperiencia: document.getElementById("experiencia"),
    campoHabilidades: document.getElementById("habilidades"),
    cardPerfil: document.getElementById("card-perfil"),
    statusVagas: document.getElementById("status-vagas"),
    listaVagas: document.getElementById("lista-vagas"),
    destaqueMelhor: document.getElementById("destaque-melhor"),
    filtros: document.getElementById("filtros"),
    selectOrdenacao: document.getElementById("ordenacao"),
    contadorAnalises: document.getElementById("contador-analises"),
    mensagemFinal: document.getElementById("mensagem-final"),
    btnTema: document.getElementById("btn-tema"),
  };
}

export function preencherFormularioComPerfil(elementos, perfil) {
  if (!perfil) return;

  elementos.campoNome.value = perfil.nome || "";
  elementos.campoArea.value = perfil.area || "";
  elementos.campoExperiencia.value = perfil.experienciaMeses ?? 0;
  elementos.campoHabilidades.value = Array.isArray(perfil.habilidades)
    ? perfil.habilidades.join(", ")
    : perfil.habilidades || "";
}

export function validarFormulario(elementos) {
  let valido = true;

  const campos = [
    {
      input: elementos.campoNome,
      erroId: "erro-nome",
      mensagem: "Informe seu nome completo.",
      validar: (valor) => valor.trim().length >= 2,
    },
    {
      input: elementos.campoArea,
      erroId: "erro-area",
      mensagem: "Informe sua área de atuação.",
      validar: (valor) => valor.trim().length >= 2,
    },
    {
      input: elementos.campoHabilidades,
      erroId: "erro-habilidades",
      mensagem: "Informe ao menos uma habilidade separada por vírgula.",
      validar: (valor) =>
        valor
          .split(",")
          .map((habilidade) => habilidade.trim())
          .filter(Boolean).length >= 1,
    },
  ];

  for (const campo of campos) {
    const elementoErro = document.getElementById(campo.erroId);
    const valor = campo.input.value;

    if (!campo.validar(valor)) {
      elementoErro.textContent = campo.mensagem;
      campo.input.setAttribute("aria-invalid", "true");
      valido = false;
    } else {
      elementoErro.textContent = "";
      campo.input.removeAttribute("aria-invalid");
    }
  }

  return valido;
}

export function extrairDadosFormulario(elementos) {
  const habilidades = elementos.campoHabilidades.value
    .split(",")
    .map((habilidade) => habilidade.trim())
    .filter(Boolean);

  return {
    nome: elementos.campoNome.value.trim(),
    area: elementos.campoArea.value.trim(),
    experienciaMeses: Number(elementos.campoExperiencia.value) || 0,
    habilidades,
  };
}

export function renderizarPerfil(elementos, candidato) {
  elementos.cardPerfil.hidden = false;
  elementos.cardPerfil.innerHTML = "";

  const titulo = document.createElement("h3");
  titulo.textContent = "Seu perfil salvo";

  const nome = document.createElement("p");
  nome.append(criarNegrito("Nome:"), ` ${candidato.nome}`);

  const area = document.createElement("p");
  area.append(criarNegrito("Área:"), ` ${candidato.area}`);

  const experiencia = document.createElement("p");
  experiencia.append(criarNegrito("Experiência:"), ` ${candidato.experienciaMeses} meses`);

  const habilidades = document.createElement("p");
  habilidades.append(criarNegrito("Habilidades:"), ` ${candidato.habilidades.join(", ")}`);

  elementos.cardPerfil.append(titulo, nome, area, experiencia, habilidades);
}

export function mostrarStatusCarregando(elementos) {
  elementos.statusVagas.textContent = "Carregando vagas...";
  elementos.statusVagas.className = "status status--carregando";
  elementos.listaVagas.innerHTML = "";
  elementos.destaqueMelhor.hidden = true;
  elementos.filtros.hidden = true;
}

export function mostrarStatusErro(elementos, mensagem) {
  elementos.statusVagas.textContent = mensagem;
  elementos.statusVagas.className = "status status--erro";
  elementos.listaVagas.innerHTML = "";
  elementos.destaqueMelhor.hidden = true;
  elementos.filtros.hidden = true;
}

export function mostrarStatusVazio(elementos) {
  elementos.statusVagas.textContent = "Nada encontrado: nenhuma vaga disponível no momento.";
  elementos.statusVagas.className = "status status--vazio";
  elementos.listaVagas.innerHTML = "";
  elementos.destaqueMelhor.hidden = true;
  elementos.filtros.hidden = true;
}

export function limparStatus(elementos) {
  elementos.statusVagas.textContent = "";
  elementos.statusVagas.className = "status";
}

export function renderizarDestaque(elementos, melhorResultado, recomendacao) {
  if (!melhorResultado) {
    elementos.destaqueMelhor.hidden = true;
    return;
  }

  elementos.destaqueMelhor.hidden = false;
  elementos.destaqueMelhor.innerHTML = "";

  const titulo = document.createElement("h3");
  titulo.textContent = "Melhor vaga para você";

  const vaga = melhorResultado.vaga;
  const info = document.createElement("p");
  info.className = "destaque__info";
  info.textContent = `${vaga.exibirResumo()} - ${melhorResultado.compatibilidade}% - ${melhorResultado.classificacao}`;

  const recomendacaoEl = document.createElement("p");
  recomendacaoEl.className = "destaque__recomendacao";
  recomendacaoEl.append(criarNegrito("Recomendação de estudo:"), ` ${recomendacao}`);

  elementos.destaqueMelhor.append(titulo, info, recomendacaoEl);
}

export function renderizarCardsVagas(elementos, resultados) {
  elementos.listaVagas.innerHTML = "";

  if (resultados.length === 0) {
    mostrarStatusVazio(elementos);
    return;
  }

  limparStatus(elementos);
  elementos.filtros.hidden = false;

  for (const resultado of resultados) {
    elementos.listaVagas.appendChild(criarCardVaga(resultado));
  }
}

function criarCardVaga(resultado) {
  const {
    vaga,
    compatibilidade,
    classificacao,
    habilidadesEncontradas,
    habilidadesFaltantes,
  } = resultado;

  const nivelBadge = obterNivelClassificacao(classificacao);

  const card = document.createElement("article");
  card.className = "card-vaga";
  card.setAttribute("aria-label", `Vaga ${vaga.cargo} na ${vaga.empresa}`);

  const cabecalho = document.createElement("header");
  cabecalho.className = "card-vaga__cabecalho";

  const titulo = document.createElement("h3");
  titulo.className = "card-vaga__titulo";
  titulo.textContent = vaga.exibirResumo();

  const badge = document.createElement("span");
  badge.className = `badge ${CLASSE_COMPATIBILIDADE[nivelBadge] || ""}`;
  badge.textContent = `${compatibilidade}% ${ICONE_COMPATIBILIDADE[nivelBadge]} ${classificacao}`;

  cabecalho.append(titulo, badge);

  const detalhes = document.createElement("dl");
  detalhes.className = "card-vaga__detalhes";

  const campos = [
    { termo: "Nível", valor: vaga.exibirNivel ? vaga.exibirNivel() : "-" },
    { termo: "Modalidade", valor: vaga.modalidade },
  ];

  for (const campo of campos) {
    const dt = document.createElement("dt");
    dt.textContent = campo.termo;
    const dd = document.createElement("dd");
    dd.textContent = campo.valor;
    detalhes.append(dt, dd);
  }

  const secaoEncontradas = criarListaHabilidades(
    "Habilidades encontradas",
    habilidadesEncontradas,
    "card-vaga__lista--ok"
  );

  const secaoFaltantes = criarListaHabilidades(
    "Habilidades faltantes",
    habilidadesFaltantes,
    "card-vaga__lista--faltante"
  );

  card.append(cabecalho, detalhes, secaoEncontradas, secaoFaltantes);
  return card;
}

function criarListaHabilidades(titulo, itens, classeExtra) {
  const secao = document.createElement("div");
  secao.className = "card-vaga__secao-habilidades";

  const h4 = document.createElement("h4");
  h4.textContent = titulo;

  const ul = document.createElement("ul");
  ul.className = `card-vaga__lista ${classeExtra}`;

  if (itens.length === 0) {
    const li = document.createElement("li");
    li.textContent = titulo.includes("faltantes") ? "Nenhuma" : "-";
    ul.appendChild(li);
  } else {
    for (const item of itens) {
      const li = document.createElement("li");
      li.textContent = item;
      ul.appendChild(li);
    }
  }

  secao.append(h4, ul);
  return secao;
}

function criarNegrito(texto) {
  const strong = document.createElement("strong");
  strong.textContent = texto;
  return strong;
}

export function atualizarContadorAnalises(elementos, total) {
  elementos.contadorAnalises.textContent =
    total === 1
      ? "1 análise realizada nesta sessão"
      : `${total} análises realizadas nesta sessão`;
}

export function exibirMensagemCallback(elementos, mensagem) {
  elementos.mensagemFinal.textContent = mensagem;
}

export function aplicarTema(tema) {
  document.documentElement.setAttribute("data-tema", tema);
}

export function alternarTema(temaAtual) {
  return temaAtual === "escuro" ? "claro" : "escuro";
}

export function atualizarIconeTema(elementos, tema) {
  const icone = elementos.btnTema.querySelector("span");
  icone.textContent = tema === "escuro" ? "☀️" : "🌙";
  elementos.btnTema.setAttribute(
    "aria-label",
    tema === "escuro" ? "Ativar tema claro" : "Ativar tema escuro"
  );
}
