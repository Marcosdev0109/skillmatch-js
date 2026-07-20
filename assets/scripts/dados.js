/**
 * Carregamento de vagas com fetch e persistência com localStorage.
 */

const CHAVE_PERFIL = "skillmatch_perfil";
const CHAVE_TEMA = "skillmatch_tema";
const CHAVE_ORDENACAO = "skillmatch_ordenacao";
const URL_VAGAS = "./assets/dados/vagas.json";

export async function carregarVagas() {
  try {
    const resposta = await fetch(URL_VAGAS);

    if (!resposta.ok) {
      throw new Error(`Erro HTTP ${resposta.status}: não foi possível carregar as vagas.`);
    }

    const dados = await resposta.json();

    if (!Array.isArray(dados) || dados.length === 0) {
      return { sucesso: true, vagas: [], vazio: true };
    }

    return { sucesso: true, vagas: dados, vazio: false };
  } catch (erro) {
    return {
      sucesso: false,
      erro: erro.message || "Falha na rede ao buscar vagas.",
      vagas: [],
    };
  }
}

export function salvarPerfil(perfil) {
  const perfilSeguro = {
    nome: perfil.nome,
    area: perfil.area,
    habilidades: perfil.habilidades,
    experienciaMeses: perfil.experienciaMeses,
  };

  localStorage.setItem(CHAVE_PERFIL, JSON.stringify(perfilSeguro));
}

export function carregarPerfil() {
  const dados = localStorage.getItem(CHAVE_PERFIL);

  if (dados === null) {
    return null;
  }

  try {
    return JSON.parse(dados);
  } catch {
    localStorage.removeItem(CHAVE_PERFIL);
    return null;
  }
}

export function salvarTema(tema) {
  localStorage.setItem(CHAVE_TEMA, tema);
}

export function carregarTema() {
  return localStorage.getItem(CHAVE_TEMA);
}

export function salvarOrdenacao(criterio) {
  localStorage.setItem(CHAVE_ORDENACAO, criterio);
}

export function carregarOrdenacao() {
  return localStorage.getItem(CHAVE_ORDENACAO) || "compatibilidade";
}
