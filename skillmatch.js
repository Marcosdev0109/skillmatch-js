// ==================== DADOS ====================
const candidato = {
    nome: "João Marcos Rodrigues Barbosa",
    area: "Front-End",
    habilidades: ["JavaScript", "GitHub", "Lógica de Programação", "React", "Node.js", "Kanban"],
    experienciaMeses: 6
};

const vagas = [
    {
        id: 1,
        empresa: "TechStart",
        cargo: "Desenvolvedor Front-End Júnior",
        requisitos: ["JavaScript", "GitHub", "Lógica de Programação"],
        salario: 2800,
        modalidade: "Remoto"
    },
    {
        id: 2,
        empresa: "CodeLab",
        cargo: "Estágio Front-End",
        requisitos: ["JavaScript", "Kanban", "GitHub"],
        salario: 1800,
        modalidade: "Híbrido"
    },
    {
        id: 3,
        empresa: "WebSolutions",
        cargo: "Programador JavaScript Júnior",
        requisitos: ["JavaScript", "Arrays", "Objetos", "Funções"],
        salario: 3000,
        modalidade: "Presencial"
    }
];

console.log("Candidato:", candidato);
console.log("Vagas:", vagas);

// ==================== FUNÇÃO PARA ANALISAR UMA VAGA ====================
function analisarVaga(candidato, vaga) {
    const habilidadesEncontradas = candidato.habilidades.filter(habilidade =>
        vaga.requisitos.includes(habilidade)
    );
    const totalRequisitos = vaga.requisitos.length;
    const compatibilidade = (habilidadesEncontradas.length / totalRequisitos) * 100;
    const habilidadesFaltantes = vaga.requisitos.filter(requisito =>
        !candidato.habilidades.includes(requisito)
    );
    return {
        empresa: vaga.empresa,
        cargo: vaga.cargo,
        compatibilidade: Math.round(compatibilidade),
        habilidadesEncontradas: habilidadesEncontradas,
        habilidadesFaltantes: habilidadesFaltantes
    };
}

// ==================== CLASSIFICAÇÃO ====================
function classificarCompatibilidade(percentual) {
    if (percentual >= 80) {
        return "Alta compatibilidade ✅";
    } else if (percentual >= 50) {
        return "Média compatibilidade ⚠️";
    } else {
        return "Baixa compatibilidade ❌";
    }
}

// ==================== MELHOR VAGA ====================
function encontrarMelhorVaga(resultados) {
    return resultados.reduce((melhor, atual) => {
        return (atual.compatibilidade > melhor.compatibilidade) ? atual : melhor;
    });
}

// ==================== ANALISAR TODAS AS VAGAS ====================
function exibirAnaliseCompleta(candidato, vagas) {
    console.log(`\n====== Análise para ${candidato.nome} ======\n`);

    // Aplica a função analisarVaga para cada vaga usando map
    const resultados = vagas.map(vaga => analisarVaga(candidato, vaga));

    // Exibe cada resultado com forEach, já incluindo a classificação
    resultados.forEach(resultado => {
        const classificacao = classificarCompatibilidade(resultado.compatibilidade);
        console.log(`🏢 Empresa: ${resultado.empresa}`);
        console.log(`💼 Cargo: ${resultado.cargo}`);
        console.log(`📊 Compatibilidade: ${resultado.compatibilidade}%`);
        console.log(`🏷️  ${classificacao}`);
        console.log(`✅ Habilidades encontradas: ${resultado.habilidadesEncontradas.join(', ') || 'Nenhuma'}`);
        console.log(`❌ Habilidades faltantes: ${resultado.habilidadesFaltantes.join(', ') || 'Nenhuma'}`);
        console.log('-----------------------------------');
    });

    // Encontra e exibe a vaga mais compatível
    const melhorVaga = encontrarMelhorVaga(resultados);
    console.log(`\n🏆 VAGA MAIS COMPATÍVEL 🏆`);
    console.log(`${melhorVaga.empresa} - ${melhorVaga.cargo}`);
    console.log(`📊 Compatibilidade: ${melhorVaga.compatibilidade}%`);
    console.log(`🏷️  ${classificarCompatibilidade(melhorVaga.compatibilidade)}`);

    return resultados; // retorna para uso futuro
}

// ==================== EXECUÇÃO PRINCIPAL ====================
const resultadosDasVagas = exibirAnaliseCompleta(candidato, vagas);

// ==================== RECOMENDAÇÃO DE ESTUDO ====================
function gerarRecomendacaoEstudo(resultados) {
    // Junta todas as habilidades faltantes em um array
    const todasHabilidadesFaltantes = resultados.reduce((acumulador, vagaAtual) => {
        return acumulador.concat(vagaAtual.habilidadesFaltantes);
    }, []);

    // Remove duplicatas usando Set e spread
    const habilidadesUnicas = [...new Set(todasHabilidadesFaltantes)];

    if (habilidadesUnicas.length > 0) {
        console.log(`\n📚 RECOMENDAÇÃO DE ESTUDO:`);
        console.log(`Priorize estudar: ${habilidadesUnicas.join(', ')}.`);
        console.log(`Esses conteúdos são importantes para as vagas analisadas.`);
    } else {
        console.log(`\n🎉 PARABÉNS! Você já possui todas as habilidades exigidas pelas vagas analisadas.`);
    }
}

    // Recomendação de estudo (RF07)
    gerarRecomendacaoEstudo(resultados);

        // Encontra e exibe a vaga mais compatível
    const melhorVaga = encontrarMelhorVaga(resultados);
    console.log(`\n🏆 VAGA MAIS COMPATÍVEL 🏆`);
    console.log(`${melhorVaga.empresa} - ${melhorVaga.cargo}`);
    console.log(`📊 Compatibilidade: ${melhorVaga.compatibilidade}%`);
    console.log(`🏷️  ${classificarCompatibilidade(melhorVaga.compatibilidade)}`);

    // Recomendação de estudo (RF07)
    gerarRecomendacaoEstudo(resultados);

    return resultados;

    // ==================== CLASSES (POO) ====================
// Classe base Vaga (RF09)
class Vaga {
    constructor(empresa, cargo, requisitos, salario, modalidade) {
        this.empresa = empresa;
        this.cargo = cargo;
        this.requisitos = requisitos;
        this.salario = salario;
        this.modalidade = modalidade;
    }

    // Método que usa 'this' (RF11)
    exibirResumo() {
        return `${this.cargo} na empresa ${this.empresa} - R$ ${this.salario} (${this.modalidade})`;
    }
}

// Classe que herda de Vaga (RF10)
class VagaFrontEnd extends Vaga {
    constructor(empresa, cargo, requisitos, salario, modalidade, nivel) {
        super(empresa, cargo, requisitos, salario, modalidade); // chama construtor da classe mãe
        this.nivel = nivel;
    }

    // Novo método específico
    exibirNivel() {
        return `Nível da vaga: ${this.nivel}`;
    }
}

// Demonstração da classe VagaFrontEnd (não interfere na análise principal)
const vagaFrontEndExemplo = new VagaFrontEnd(
    "StartUp Inovadora",
    "Dev Front-End Pleno",
    ["JavaScript", "React", "CSS"],
    4500,
    "Remoto",
    "Pleno"
);
console.log("=== Demonstração de classes e herança ===");
console.log(vagaFrontEndExemplo.exibirResumo());   // método herdado
console.log(vagaFrontEndExemplo.exibirNivel());    // método próprio

// ==================== CLOSURE ====================
function criarContadorDeAnalises() {
    let contador = 0;  // variável mantida no closure
    return function() {
        contador++;
        return contador;
    };
}

// ==================== CALLBACK ====================
function finalizarAnalise(nomeCandidato, callback) {
    console.log("\n✅ Análise finalizada.");
    callback(nomeCandidato);
}

function exibirMensagemFinal(nome) {
    console.log(`${nome}, revise suas habilidades faltantes e atualize seu plano de estudos.`);
}

    // ... (código existente da recomendação)

    // Demonstração de closure
    const contador = criarContadorDeAnalises();
    console.log(`\n🔢 Número de análises executadas: ${contador()}`);

    // Demonstração de callback
    finalizarAnalise(candidato.nome, exibirMensagemFinal);

    