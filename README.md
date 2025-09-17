### Frontend do Projeto Portfolio FAPERJ ###

Este documento serve como guia para a configuração e execução do frontend do projeto, desenvolvido com Next.js, React e Material-UI (MUI).

---

### Sobre o Projeto
O **Portfolio FAPERJ em Rede** é uma plataforma digital interativa desenvolvida com Next.js, React e Material-UI (MUI). O objetivo principal é dar visibilidade aos investimentos e projetos da FAPERJ por meio de dashboards e indicadores estatísticos.

Diferentemente da versão anterior, os dados dos gráficos e dos cards de estatística são **estáticos e pré-carregados**, garantindo alto desempenho. A única funcionalidade que se comunica com uma API é a **busca de pesquisadores**, cujas informações são obtidas de uma base de dados externa da FAPERJ.

---

### Tecnologias Utilizadas

O projeto é construído sobre um stack moderno e robusto para o desenvolvimento web:

* **Next.js**: Framework de React para renderização do lado do servidor (SSR) e geração de sites estáticos, otimizando a performance.
* **React**: Biblioteca JavaScript para a construção da interface de usuário, com foco em componentes reutilizáveis.
* **TypeScript**: Adiciona tipagem estática ao JavaScript, o que melhora a previsibilidade e a manutenção do código.
* **Material-UI (MUI)**: Framework de componentes de UI de alta qualidade para o React, garantindo uma estética profissional e consistente.
* **Recharts**: Uma biblioteca de gráficos para React, utilizada para a visualização dos dados estáticos.

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
    (Este comando instalará todas as dependências listadas no `package.json`, incluindo Next.js, Material-UI, Recharts e as ferramentas de desenvolvimento.)

---

### Scripts de Desenvolvimento

O projeto vem com scripts de npm pré-configurados para agilizar o fluxo de trabalho:

* `npm run dev`: Inicia o servidor de desenvolvimento do Next.js. O aplicativo estará disponível em `http://localhost:3000`.

---

### Estrutura de Arquivos

A estrutura de diretórios do projeto segue a convenção do Next.js e facilita a organização do código:

* `src/pages/`: Contém as páginas da aplicação. `index.tsx` é a página principal.
* `src/components/`: Armazena todos os componentes reutilizáveis da interface, como `Header`, `Footer` e `ChartCard`.
* `src/hooks/`: Contém os hooks personalizados, como `useDashboardData`, que lida com a lógica de dados estáticos e da API de busca.
* `src/data/`: Diretório para os arquivos de dados estáticos, que alimentam os gráficos e as estatísticas.
* `public/images/`: Guarda as imagens estáticas utilizadas no projeto, como logos e ícones.

---

### Observações sobre os Dados

* **Dados dos Gráficos:** As informações exibidas nos gráficos são provenientes de arquivos de dados estáticos (`.js`) incluídos no código.
* **API de Busca:** A única integração com API é para a funcionalidade de busca de pesquisadores. As chamadas a esta API estão implementadas nos hooks e serviços, mas dependem de um endpoint real fornecido pela FAPERJ para funcionar completamente.

---

### Licença

Este projeto está sob a licença MIT.