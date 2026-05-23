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

    