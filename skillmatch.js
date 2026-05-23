//Perfil do candidato

const candidato = {
    nome: "João Marcos Rodrigues Barbosa",
    area: "Front-End",
    habilidades: ["JavaScript", "GitHub", "Lógica de Programação", "React", "Node.js", "Kanban"],
    experienciaMeses: 6
};

// Lista de vagas disponíveis
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

// Exibir no console para testar
console.log("Candidato:", candidato);
console.log("Vagas:", vagas);

// ==================== FUNÇÃO PARA ANALISAR UMA VAGA ====================

function analisarVaga(candidato, vaga) {
    // 1. Habilidades que o candidato possui e que a vaga exige
    const habilidadesEncontradas = candidato.habilidades.filter(habilidade =>
        vaga.requisitos.includes(habilidade)
    );

    // 2. Percentual de compatibilidade
    const totalRequisitos = vaga.requisitos.length;
    const compatibilidade = (habilidadesEncontradas.length / totalRequisitos) * 100;

    // 3. Habilidades que a vaga exige mas o candidato não tem
    const habilidadesFaltantes = vaga.requisitos.filter(requisito =>
        !candidato.habilidades.includes(requisito)
    );

    // Retorna um objeto com os resultados
    return {
        empresa: vaga.empresa,
        cargo: vaga.cargo,
        compatibilidade: Math.round(compatibilidade), // arredondado
        habilidadesEncontradas: habilidadesEncontradas,
        habilidadesFaltantes: habilidadesFaltantes
    };
}

// ==================== ANALISAR TODAS AS VAGAS ====================
function exibirAnaliseCompleta(candidato, vagas) {
    console.log(`\n====== Análise para ${candidato.nome} ======\n`);

    // Aplica a função analisarVaga para cada vaga usando map
    const resultados = vagas.map(vaga => analisarVaga(candidato, vaga));

    // Exibe cada resultado com forEach
    resultados.forEach(resultado => {
        console.log(` Empresa: ${resultado.empresa}`);
        console.log(` Cargo: ${resultado.cargo}`);
        console.log(` Compatibilidade: ${resultado.compatibilidade}%`);
        console.log(` Habilidades encontradas: ${resultado.habilidadesEncontradas.join(', ') || 'Nenhuma'}`);
        console.log(` Habilidades faltantes: ${resultado.habilidadesFaltantes.join(', ') || 'Nenhuma'}`);
        console.log('-----------------------------------');
    });

    return resultados; 

// Executar
const resultadosDasVagas = exibirAnaliseCompleta(candidato, vagas);

// ==================== CLASSIFICAÇÃO ====================
function classificarCompatibilidade(percentual) {
    if (percentual >= 80) {
        return "Alta compatibilidade";
    } else if (percentual >= 50) {
        return "Média compatibilidade";
    } else {
        return "Baixa compatibilidade";
    }
}

    resultados.forEach(resultado => {
        const classificacao = classificarCompatibilidade(resultado.compatibilidade);
        console.log(` Empresa: ${resultado.empresa}`);
        console.log(` Cargo: ${resultado.cargo}`);
        console.log(` Compatibilidade: ${resultado.compatibilidade}%`);
        console.log(` ${classificacao}`);
        // ... resto igual
    });
}

