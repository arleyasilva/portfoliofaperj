
# Portfolio FAPERJ — Documentação Unificada

Este arquivo reúne toda a documentação do projeto em um único lugar: instalação, arquitetura, API de editais, instruções para trabalhar com gráficos, deploy e contribuição.

Badge/Status
----------------

[![Next.js](https://img.shields.io/badge/Next.js-14.x-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18.2-blue?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.2-blue?logo=typescript)](https://www.typescriptlang.org/)
[![MUI](https://img.shields.io/badge/MUI-5.18-007FFF?logo=mui)](https://mui.com/)

Resumo
----------------

O repositório contém um dashboard Next.js que exibe visualizações e indicadores usando dados públicos da FAPERJ. A maior parte dos dados é servida como JSON estático em `public/data/`. Há também APIs internas (Next.js API routes) para casos que exigem scraping ou agregação (p.ex. editais, feed de vídeos).

Conteúdo combinado
-------------------

Sumário das seções incorporadas:
- Instalação e scripts
- Arquitetura
- API de Editais
- Gráficos
- Deploy
- Contribuição
- Checklist antes de enviar ao trabalho

1) Instalação e scripts
------------------------

Requisitos
- Node.js 18+ (recomendado)
- npm ou yarn
- Docker (opcional)

Clone e instalação

```bash
git clone https://github.com/arleyasilva/portfoliofaperj.git
cd portfoliofaperj
npm install
```

Desenvolvimento

```bash
npm run dev
# app em http://localhost:3000
```

Build de produção

```bash
npm run build
npm run start
```

Scripts úteis
- `npm run dev` — desenvolvimento
- `npm run build` — build de produção
- `npm run start` — iniciar produção
- `npm test` — executar testes (Jest + RTL)
- `npm run lint` — lint
- `npm run update:videos` — atualizar vídeos (script)
- `npm run clean-logs` — limpar logs

2) Arquitetura
----------------

Visão geral
- Frontend (Next.js): `src/pages/`, `src/components/`, `src/hooks/`.
- APIs internas: `src/pages/api/*` (ex.: `editais.ts`, `youtube.ts`).
- Dados: `public/data/*.json` (fallback e dados primários para gráficos).
- Scripts: `scripts/` para debug/manutenção.

Fluxo de dados
- `useFaperjData` é o hook que centraliza leitura dos endpoints locais ou arquivos estáticos.
- O endpoint `/api/editais` faz scraping do site da FAPERJ quando necessário e normaliza os campos.

Segurança
- Nunca commit credenciais. Use variáveis de ambiente para segredos.

3) API de Editais
-------------------

Arquivo principal: `src/pages/api/editais.ts`

Descrição
- Faz scraping do site público da FAPERJ e normaliza os campos de cada edital.
- Heurísticas adicionais agregam textos de nós próximos no HTML para evitar fragmentos de datas (ex.: "de 19").

Formato de saída (exemplo)

```json
{
    "id": "edital-45-2025",
    "numero": "Nº 45/2025",
    "titulo": "Título do programa",
    "linkEdital": "https://...pdf",
    "linkResultado": "https://...pdf",
    "publicacao": "18/12/2025",
    "submissao": "de 19/01/2026 a 31/03/2026",
    "resultadoPrevisao": "15/05/2026",
    "status": "aberto|em-avaliacao|encerrado",
    "statusLabel": "Aberto|Em avaliação|Encerrado"
}
```

Notas técnicas
- O helper `extractEditais(html)` é exportado e usado também por scripts de debug (`scripts/debug_fetch_editais.js`).
- Se o markup do site mudar, ajuste as heurísticas de parsing.

4) Gráficos
------------

Local: `src/components/dashboard/charts/`

Cada componente monta a opção do ECharts e recebe dados via `useFaperjData`.

Remover uma série específica (ex.: "Não definido") apenas em um gráfico
1. Abra o arquivo do gráfico (ex.: `grafico14.tsx`).
2. Remova a entrada em `legend.data` correspondente.
3. Remova a série no array `series` (`name: "Não definido"`).
4. Ajuste o `tooltip.formatter` para não procurar pela série removida.

Exemplo rápido
Antes:

```ts
legend: { data: ["Feminino", "Masculino", "Não definido"] },
series: [ ..., { name: "Não definido", data: ... } ]
```

Depois:

```ts
legend: { data: ["Feminino", "Masculino"] },
series: [ ... ]
```

Dica: se quiser remover globalmente a categoria, filtre no hook `useFaperjData` para que nenhum componente receba "Não definido".

5) Deploy
-----------

Opções
- Vercel / Netlify: integração direta com repositório GitHub (recomendado para Next.js).
- Docker: construir e rodar imagem.

Exemplo Docker

```bash
docker build -t portfoliofaperj:latest .
docker run -p 3000:3000 portfoliofaperj:latest
docker save -o portfoliofaperj.tar portfoliofaperj:latest
```

Export estático (se aplicável)

```bash
npm run export
```

Variáveis de ambiente
- Configure no host de deploy (Vercel/Netlify/servidor) via painel ou `process.env`.

6) Contribuição
-----------------

Regras básicas
- Fork and branch: crie branchs como `feature/x` ou `fix/y`.
- Commits: use mensagens no estilo `feat(...)`, `fix(...)`, `chore(...)`, `docs(...)`.
- Testes: adicione testes para mudanças críticas e rode `npm test` antes de PR.
- PR: abra direcionado a `main` com descrição clara.

7) Checklist antes de enviar ao trabalho
----------------------------------------

- Rodar `npm test` e garantir que tudo passa.
- Rodar `npm run build` e confirmar que o build finaliza OK.
- Atualizar `CHANGELOG.md` se necessário.

Notas finais
------------

Se quiser, eu posso:
- Gerar um ZIP com os artefatos (código ou build).
- Construir uma imagem Docker e exportá-la (`docker save`).
- Tentar push direto para o repositório do trabalho (precisa da URL correta/permissões).

---

Licença: MIT

% Portfolio FAPERJ

Documentação do projeto e instruções para desenvolvimento, build e deploy.

Este repositório contém um dashboard feito com Next.js que consome dados públicos da FAPERJ e exibe diversos gráficos e painéis informativos.

## Conteúdo
- `src/` — código da aplicação Next.js (páginas, componentes, hooks, services)
- `public/data/` — arquivos JSON de dados usados nos gráficos e como fallback
- `scripts/` — scripts de suporte (ex.: debug do parser de editais)
- `src/pages/api/editais.ts` — rota API que faz scraping/normalização dos editais da FAPERJ

## Requisitos
- Node.js 18+ (ou versão compatível com o `engines` do projeto)
- npm ou yarn
- Docker (opcional, para build/container)

## Instalação (desenvolvimento)

1. Clone o repositório:

```bash
git clone https://github.com/arleyasilva/portfoliofaperj.git
cd portfoliofaperj
```

2. Instale dependências:

```bash
npm install
```

3. Iniciar em modo de desenvolvimento:

```bash
npm run dev
```

O site estará disponível em `http://localhost:3000`.

## Build de produção

```bash
npm run build
npm run start
```

ou para export estático (se aplicável):

```bash
npm run export
```

## Testes

O projeto usa Jest + RTL para testes unitários.

```bash
npm test
```

## Scripts úteis

- `scripts/debug_fetch_editais.js` — script para testar localmente o parser de editais e imprimir o JSON extraído. Útil para debug quando a página pública mudar.
- `scripts/update-chart-types.sh` — script auxiliar (se presente) para preparar tipos de gráficos.

## Arquitetura e pontos importantes

Veja `docs/architecture.md` para um panorama da arquitetura (API, hooks, fluxo de dados).

### Parser de editais

O parser está em `src/pages/api/editais.ts`. Ele faz scraping usando cheerio e heurísticas para normalizar datas (`publicacao`, `submissao`, `resultadoPrevisao`) e produz um objeto com campos:

- `id`, `numero`, `titulo`, `linkEdital`, `linkResultado?`, `publicacao?`, `submissao?`, `resultadoPrevisao?`, `status`, `statusLabel`

Há um script de debug em `scripts/debug_fetch_editais.js` que usa `extractEditais` localmente.

### Gráficos

Os gráficos estão em `src/components/dashboard/charts/`. Se precisar remover uma série (ex.: "Não definido") de um gráfico específico, edite o arquivo do gráfico (por exemplo `grafico14.tsx`) e remova a legenda/series/tooltip correspondentes. Veja `docs/charts.md` para instruções detalhadas.

## Deploy

Veja `docs/deployment.md` — instruções para deploy via Docker ou deploy tradicional para serviços que suportam Next.js.

## Contribuição

Veja `docs/CONTRIBUTING.md` para regras de contribuição, estilo de commit e como preparar PRs.

## Checklist antes de enviar ao trabalho

- Rodar `npm test` e garantir que tudo passa
- Rodar `npm run build` para garantir que não há erros de build
- Atualizar `CHANGELOG.md` (se mantido) com alterações relevantes

---

Se quiser que eu gere um ZIP/Release ou construa uma imagem Docker pronta para envio, me diga o formato desejado.
# 🌐 Portfolio FAPERJ em Rede

[![Next.js](https://img.shields.io/badge/Next.js-14.x-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18.2-blue?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.2-blue?logo=typescript)](https://www.typescriptlang.org/)
[![MUI](https://img.shields.io/badge/MUI-5.18-007FFF?logo=mui)](https://mui.com/)
[![Tests](https://img.shields.io/badge/tests-202%20passing-success)](/)
[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)

---

### Frontend do Projeto Portfolio FAPERJ ###

Este documento serve como guia para a configuração e execução do frontend do projeto, desenvolvido com Next.js, React e Material-UI (MUI).

---

### Sobre o Projeto
O **Portfolio FAPERJ em Rede** é uma plataforma digital interativa desenvolvida com Next.js, React e Material-UI (MUI). O objetivo principal é dar visibilidade aos investimentos e projetos da FAPERJ por meio de dashboards e indicadores estatísticos.

Diferentemente da versão anterior, os dados dos gráficos e dos cards de estatística são **estáticos e pré-carregados**, garantindo alto desempenho e **aderência à diretriz de Separação de Responsabilidades (SoC)**, mantendo a camada de apresentação do código-fonte separada da camada de dados. A única funcionalidade que se comunica com uma API é a **busca de pesquisadores**, cujas informações são obtidas de uma base de dados externa da FAPERJ.

---

### Tecnologias Utilizadas

O projeto é construído sobre um stack moderno e robusto para o desenvolvimento web:

* **Next.js**: Framework de React para renderização do lado do servidor (SSR) e geração de sites estáticos, otimizando a performance.
* **React**: Biblioteca JavaScript para a construção da interface de usuário, com foco em componentes reutilizáveis.
* **TypeScript**: Adiciona tipagem estática ao JavaScript, o que melhora a previsibilidade e a manutenção do código.
* **Material-UI (MUI)**: Framework de componentes de UI de alta qualidade para o React, garantindo uma estética profissional e consistente.
* **ECharts**: Biblioteca poderosa de visualização de dados com suporte a gráficos interativos complexos (line race, sankey, etc.), renderizada via `echarts-for-react` para React.

---

### Pré-requisitos

Certifique-se de que você tem o **Node.js** instalado na sua máquina. A partir do `package.json`, a versão recomendada é superior a 18.17.0.

---

### Configuração e Instalação

Siga os passos abaixo para colocar o projeto em funcionamento:

1.  **Clone o repositório:**
    ```bash
    git clone [URL_DO_SEU_REPOSITORIO]
    cd portifolio-faperj
    ```

2.  **Instale as dependências:**
    ```bash
    npm install
    ```
    (Este comando instalará todas as dependências listadas no `package.json`, incluindo Next.js, Material-UI, ECharts e as ferramentas de desenvolvimento.)

---

### Scripts de Desenvolvimento

O projeto vem com scripts de npm pré-configurados para agilizar o fluxo de trabalho:

* `npm run dev`: Inicia o servidor de desenvolvimento do Next.js. O aplicativo estará disponível em `http://localhost:3000`.
* `npm run build`: Cria a versão otimizada para produção.
* `npm run start`: Inicia o servidor de produção (após `npm run build`).
* `npm run lint`: Executa o ESLint para verificar problemas de código.
* `npm test`: Executa todos os testes com Jest.
* `npm run test:watch`: Executa testes em modo watch (desenvolvimento).
* `npm run test:ci`: Executa testes em modo CI (integração contínua).
* `npm run update:videos`: Atualiza a lista de vídeos do YouTube automaticamente.
