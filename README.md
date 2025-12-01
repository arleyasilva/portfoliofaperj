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
* `npm run clean-logs`: Remove arquivos de log do projeto.

---

### Estrutura de Arquivos

A estrutura de diretórios do projeto segue a convenção do Next.js e facilita a organização do código:

* `src/pages/`: Contém as páginas da aplicação. `index.tsx` é a página principal.
* `src/components/`: Armazena todos os componentes reutilizáveis da interface, como `Header`, `Footer` e `ChartCard`.
* **`public/data/`**: Contém **TODOS os arquivos JSON** com dados dos gráficos (`grafico1.json` até `grafico18.json`) e indicadores de internacionalização (`int_*.json`), garantindo separação total entre código e dados (SoC).
* **`src/data/`**: Contém dados auxiliares e estatísticos gerais (`faperj-data.ts`) e configurações de componentes (`tripleColumn/`).
* `src/hooks/`: Contém o hook personalizado `useFaperjData`, que gerencia o carregamento de dados JSON externos.
* `src/types/`: Define todas as interfaces TypeScript do projeto (`faperj.ts`, `echarts.ts`).
* `src/pages/api/`: Contém as API routes do Next.js (`youtube.ts`, `editais.ts`).
* `public/images/`: Guarda as imagens estáticas utilizadas no projeto, como logos e ícones.

---

### Observações sobre os Dados

* **Dados dos Gráficos:** As informações exibidas nos gráficos são provenientes de arquivos JSON externos localizados em `public/data/` (`grafico1.json` até `grafico18.json`, `int_*.json`), carregados dinamicamente pelo hook `useFaperjData`.
* **Dados Auxiliares:** Estatísticas gerais e dados institucionais estão em `src/data/faperj-data.ts`.
* **API de Busca:** A única integração com API externa é para a funcionalidade de busca de pesquisadores. As chamadas estão implementadas, mas dependem de um endpoint real fornecido pela FAPERJ.
* **APIs Internas:** O projeto possui APIs Next.js em `src/pages/api/`:
  - `/api/youtube`: Busca vídeos recentes do canal FAPERJ via RSS (sem necessidade de API key)
  - `/api/editais`: Obtém lista atualizada de editais do site oficial da FAPERJ
* **Conformidade:** O projeto está em conformidade com o item 2 - Estratégia de Dados do documento de Revisão Técnica, não mantendo dados de aplicação misturados ao código-fonte ou em infraestrutura de mock desnecessária.

---

### Documentação Adicional

* **[Documentação de APIs](docs/API.md)**: Detalhes sobre as APIs internas (`/api/youtube` e `/api/editais`)
* **[Como Atualizar Vídeos](docs/COMO_ATUALIZAR_VIDEOS.md)**: Guia para atualizar vídeos do YouTube automaticamente

---

### Licença

Este projeto está sob a licença MIT.