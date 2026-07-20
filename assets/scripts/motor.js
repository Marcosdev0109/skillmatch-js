/**
 * Regras do SkillMatch reaproveitadas da Semana 06:
 * compatibilidade, classificação, POO, callback e closure.
 */

const normalizarTexto = (texto) =>
  String(texto).trim().toLocaleLowerCase("pt-BR");

export class Candidato {
  constructor({ nome, area, habilidades, experienciaMeses = 0 }) {
    this.nome = nome;
    this.area = area;
    this.habilidades = habilidades;
    this.experienciaMeses = experienciaMeses;
  }
}

export class Vaga {
  constructor(id, empresa, cargo, requisitos, salario, modalidade) {
    this.id = id;
    this.empresa = empresa;
    this.cargo = cargo;
    this.requisitos = requisitos;
    this.salario = salario;
    this.modalidade = modalidade;
  }

  exibirResumo() {
    return `${this.cargo} na empresa ${this.empresa} - R$ ${this.salario} (${this.modalidade})`;
  }

  analisarCompatibilidade(habilidadesCandidato) {
    return analisarVaga({ habilidades: habilidadesCandidato }, this);
  }
}

export class VagaFrontEnd extends Vaga {
  constructor(id, empresa, cargo, requisitos, salario, modalidade, nivel, stack = "Front-end") {
    super(id, empresa, cargo, requisitos, salario, modalidade);
    this.nivel = nivel;
    this.stack = stack;
  }

  exibirNivel() {
    return `${this.nivel} - ${this.stack}`;
  }

  exibirResumo() {
    return `${this.cargo} (${this.nivel}) na empresa ${this.empresa} - R$ ${this.salario} (${this.modalidade})`;
  }
}

export function analisarVaga(candidato, vaga) {
  const habilidadesNormalizadas = candidato.habilidades.map(normalizarTexto);

  const habilidadesEncontradas = vaga.requisitos.filter((requisito) =>
    habilidadesNormalizadas.includes(normalizarTexto(requisito))
  );

  const habilidadesFaltantes = vaga.requisitos.filter(
    (requisito) => !habilidadesNormalizadas.includes(normalizarTexto(requisito))
  );

  const totalRequisitos = vaga.requisitos.length;
  const compatibilidade =
    totalRequisitos === 0
      ? 0
      : Math.round((habilidadesEncontradas.length / totalRequisitos) * 100);

  return {
    vaga,
    empresa: vaga.empresa,
    cargo: vaga.cargo,
    compatibilidade,
    habilidadesEncontradas,
    habilidadesFaltantes,
    classificacao: classificarCompatibilidade(compatibilidade),
  };
}

export function classificarCompatibilidade(percentual) {
  if (percentual >= 80) {
    return "Alta compatibilidade";
  }

  if (percentual >= 50) {
    return "Média compatibilidade";
  }

  return "Baixa compatibilidade";
}

export function obterNivelClassificacao(classificacao) {
  if (classificacao.includes("Alta")) return "alta";
  if (classificacao.includes("Média")) return "media";
  return "baixa";
}

export function encontrarMelhorVaga(resultados, experienciaMeses = 0) {
  if (resultados.length === 0) return null;

  return resultados.reduce((melhor, atual) => {
    if (atual.compatibilidade > melhor.compatibilidade) return atual;

    const empate = atual.compatibilidade === melhor.compatibilidade;
    const candidatoComMaisExperiencia = experienciaMeses >= 6;
    const vagaAtualEhPleno = atual.vaga.nivel === "Pleno";

    if (empate && candidatoComMaisExperiencia && vagaAtualEhPleno) {
      return atual;
    }

    return melhor;
  });
}

export function gerarRecomendacaoEstudo(resultados) {
  const todasHabilidadesFaltantes = resultados.reduce((acumulador, vagaAtual) => {
    return acumulador.concat(vagaAtual.habilidadesFaltantes);
  }, []);

  const habilidadesUnicas = [...new Set(todasHabilidadesFaltantes)];

  if (habilidadesUnicas.length > 0) {
    return `Priorize estudar: ${habilidadesUnicas.join(", ")}. Esses conteúdos são importantes para as vagas analisadas.`;
  }

  return "Parabéns! Você já possui todas as habilidades exigidas pelas vagas analisadas.";
}

export function analisarCompatibilidade(candidato, vagas) {
  return vagas.map((vaga) => vaga.analisarCompatibilidade(candidato.habilidades));
}

export function criarVagasAPartirDoJSON(listaJSON) {
  return listaJSON.map(
    (dados) =>
      new VagaFrontEnd(
        dados.id,
        dados.empresa,
        dados.cargo,
        dados.requisitos,
        dados.salario,
        dados.modalidade,
        dados.nivel || "Júnior",
        dados.stack || "Front-end"
      )
  );
}

export function criarContadorDeAnalises() {
  let contador = 0;

  return function () {
    contador++;
    return contador;
  };
}

export function finalizarAnalise(nomeCandidato, callback) {
  if (typeof callback === "function") {
    callback(nomeCandidato);
  }
}

export function exibirMensagemFinal(nome) {
  return `${nome}, revise suas habilidades faltantes e atualize seu plano de estudos.`;
}

export function ordenarResultados(resultados, criterio) {
  const copia = [...resultados];

  switch (criterio) {
    case "salario":
      return copia.sort((a, b) => b.vaga.salario - a.vaga.salario);
    case "modalidade":
      return copia.sort((a, b) =>
        a.vaga.modalidade.localeCompare(b.vaga.modalidade, "pt-BR")
      );
    case "compatibilidade":
    default:
      return copia.sort((a, b) => b.compatibilidade - a.compatibilidade);
  }
}
