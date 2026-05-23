// RF01 - Perfil do candidato
const candidato = {
  nome: "João Marcos Rodrigues Barbosa",
  area: "Front-End",
  habilidades: ["JavaScript", "GitHub", "Lógica de Programação", "React", "Node.js", "Kanban"],
  experienciaMeses: 6
};

// RF02 - Lista de vagas (pelo menos 3)
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