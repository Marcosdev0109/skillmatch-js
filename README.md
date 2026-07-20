# SkillMatch Web

Aplicação web que compara o perfil de um candidato com vagas de front-end e calcula a compatibilidade percentual, classificando cada oportunidade e sugerindo habilidades para estudar.

> Evolução do **SkillMatch JS** da Semana 06: o mesmo motor de compatibilidade, agora com interface no navegador.

## Problema que resolve

O RH não vai abrir o console do navegador para analisar candidatos. O SkillMatch Web transforma o motor da Semana 06 em uma interface acessível, responsiva, persistente e fácil de usar.

## Tecnologias e técnicas

| Área | Técnicas |
|------|----------|
| HTML | Landmarks semânticos, um `h1`, SEO, acessibilidade |
| CSS | Flexbox, mobile-first, `clamp()`, tema claro/escuro |
| JavaScript | Módulos ES, POO, arrays, callbacks, closure, async/await |
| Persistência | `localStorage` com `JSON.stringify` e `JSON.parse` |
| Rede | `fetch` com estados carregando, vazio e erro |

## Estrutura

```text
skillmatch-web/
├── index.html
├── Readme.md
├── package.json
└── assets/
    ├── styles/
    │   └── index.style.css
    ├── scripts/
    │   ├── main.js
    │   ├── motor.js
    │   ├── ui.js
    │   └── dados.js
    ├── dados/
    │   └── vagas.json
    └── img/
        └── logo.svg
```

## Como executar

> O projeto usa módulos ES e `fetch`, então não deve ser aberto com `file://`. Use um servidor local.

Com Live Server no VS Code:

1. Abra a pasta do projeto.
2. Clique com o botão direito em `index.html`.
3. Escolha **Open with Live Server**.

Com npm:

```bash
npm install
npm start
```

## Requisitos implementados

- Perfil do candidato com nome, área, habilidades e experiência em meses.
- Catálogo com 5 vagas carregadas de `assets/dados/vagas.json`.
- Cálculo de compatibilidade, habilidades encontradas e habilidades faltantes.
- Classificação Alta, Média e Baixa com `if/else`.
- Melhor vaga com `reduce` e recomendação de estudo com `reduce` + `Set`.
- POO com `Vaga` e `VagaFrontEnd`, usando herança e sobrescrita de método.
- Callback em `finalizarAnalise()` e closure em `criarContadorDeAnalises()`.
- Formulário com `addEventListener`, `preventDefault` e validação acessível.
- Cards renderizados dinamicamente com `createElement`, `classList` e `append`.
- Layout responsivo mobile-first com Flexbox.
- `localStorage` para perfil, tema e ordenação.
- Bônus: tema claro/escuro persistido e ordenação por compatibilidade, salário ou modalidade.

## Motor reaproveitado da Semana 06

| Função / Classe | Como aparece no projeto |
|-----------------|-------------------------|
| `analisarVaga()` | Calcula compatibilidade com `filter` e `includes` |
| `classificarCompatibilidade()` | Classifica com `if/else` |
| `encontrarMelhorVaga()` | Usa `reduce` e experiência como desempate |
| `gerarRecomendacaoEstudo()` | Junta habilidades faltantes com `reduce` e remove repetidas com `Set` |
| `Vaga` / `VagaFrontEnd` | POO com herança, `this`, `exibirResumo()` e `exibirNivel()` |
| `criarContadorDeAnalises()` | Closure para contar análises na sessão |
| `finalizarAnalise()` | Callback ao terminar a análise |

Após o `fetch`, o JSON vira instâncias de `VagaFrontEnd` via `map` + `new`.

## `const`, `let` e `var`

- **`const`**: valores que não recebem nova atribuição, como elementos DOM, funções importadas/exportadas e chaves de `localStorage`.
- **`let`**: estados que mudam durante a execução, como `vagasInstanciadas`, `ultimosResultados` e o contador interno da closure.
- **`var`**: não utilizado, porque `let` e `const` têm escopo de bloco e deixam o código mais previsível.

## Melhorias futuras

- Criar filtro por modalidade.
- Mostrar uma barra visual de progresso para cada compatibilidade.
- Publicar no GitHub Pages e adicionar o link de deploy.


## Links da entrega

| Item | Link |
|------|------|
| GitHub | [Acessar repositório](https://github.com/Marcosdev0109/skillmatch-js) |
| Trello | [Acessar quadro Kanban](https://trello.com/b/McgrxS3M) |
| Vídeo | Aguardando gravação |

## Autor

João Marcos Rodrigues Barbosa - Módulo 01 - 2026
