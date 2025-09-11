### Frontend do Projeto Portfolio FAPERJ ###

Este documento serve como guia para a configuração e execução do frontend do projeto, desenvolvido com Next.js, React e Material-UI (MUI).

### Sobre o Projeto
Este projeto é um dashboard interativo focado em dados de pesquisa e fomento, com seções para estatísticas, gráficos dinâmicos e busca de pesquisadores e publicações. 
Ele foi desenhado para ser visualmente atraente e informativo, utilizando as bibliotecas Material-UI e Recharts para a construção da interface e dos gráficos.

### Tecnologias Utilizadas

O projeto é construído sobre um stack moderno e robusto para o desenvolvimento web:
Next.js: Framework de React para renderização do lado do servidor e geração de sites estáticos.
React: Biblioteca JavaScript para a criação de interfaces de usuário.
TypeScript: Superset do JavaScript que adiciona tipagem estática.
Material-UI (MUI): Framework de componentes de UI para o React.
Recharts: Biblioteca de gráficos para React, usada para visualizar os dados.
Tailwind CSS: Framework de CSS para estilização rápida.
JSON Server: Um servidor de API RESTful de mock para simular o backend em ambiente de desenvolvimento.
Concurrentlly: Ferramenta para executar múltiplos comandos npm simultaneamente, facilitando a execução do frontend e do servidor de mock.

### Pré-requisitos ###

Certifique-se de que você tem o Node.js instalado na sua máquina. A partir do package.json, a versão recomendada é superior à 18.17.0.

### Configuração e Instalação ###

Siga os passos abaixo para colocar o projeto em funcionamento:

Clone o repositório:

Bash

git clone [URL_DO_SEU_REPOSITORIO]
cd portifolio-faperj
Instale as dependências:

Bash

npm install
(Este comando instalará todas as dependências listadas no package.json, incluindo o Next.js, Material-UI, Recharts e as ferramentas de desenvolvimento.)

### Scripts de Desenvolvimento 

O projeto vem com scripts de npm pré-configurados para agilizar o fluxo de trabalho:

npm run dev: Inicia o servidor de desenvolvimento do Next.js. O aplicativo estará disponível em http://localhost:3000.
npm run server: Inicia o servidor de mock de API com o JSON Server, utilizando o arquivo db.json. Este servidor estará disponível em http://localhost:3002.
npm run start: Este é o script recomendado para o desenvolvimento local. Ele usa concurrently para iniciar tanto o servidor de mock (npm run server) quanto o servidor de desenvolvimento do Next.js (npm run dev) simultaneamente.

### Estrutura de Arquivos

A estrutura de diretórios do projeto segue a convenção do Next.js e facilita a organização do código:

src/pages/: Contém as páginas da aplicação. index.tsx é a página principal.
src/components/: Armazena todos os componentes reutilizáveis da interface, como o Header e o Footer.
src/hooks/: Contém os hooks personalizados, como useDashboardData, que lida com a lógica de carregamento de dados.
src/data/: Diretório para arquivos de dados de mock, como mockData.ts.
public/images/: Guarda as imagens estáticas utilizadas no projeto.
db.json: O banco de dados do JSON Server, usado para simular a API.

### Observações sobre a API

Durante o desenvolvimento, o projeto utiliza um servidor de API de mock (json-server) para fornecer os dados necessários para os gráficos e estatísticas. O arquivo db.json simula os endpoints de uma API real.
O hook src/hooks/useDashboardData.ts foi configurado para usar dados de mock. Se for necessário integrar uma API real no futuro, o código está preparado, mas atualmente as chamadas estão comentadas. 
O arquivo src/services/statsService.ts também contém a lógica de chamada de API.

Licença
Este projeto está sob a licença MIT.
