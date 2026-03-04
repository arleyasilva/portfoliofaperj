# Arquitetura do Projeto

Este documento descreve a arquitetura de alto nível do projeto e o fluxo de dados.

1. Frontend (Next.js)
   - Páginas em `src/pages/` (Index, Dashboard, Indicadores, etc.).
   - Componentes reutilizáveis em `src/components/`.
   - Hooks customizados em `src/hooks/` (ex.: `useFaperjData` para consumir endpoints locais ou dados estáticos).

2. API interna
   - Rotas API do Next.js em `src/pages/api/`.
   - `src/pages/api/editais.ts` faz scraping do site público da FAPERJ e normaliza os campos.

3. Dados
   - Dados estáticos de fallback em `public/data/*.json`.
   - A fonte primária dos gráficos pode ser um serviço ou arquivos CSV/JSON transformados para os formatos usados pelo frontend.

4. Ferramentas auxiliares
   - Scripts em `scripts/` para debug e manutenção (ex.: atualizar tipos, testar parser de editais).

Fluxo de dados
- O frontend consome `useFaperjData` que busca endpoints locais em `src/pages/api/*` ou arquivos estáticos em `public/data/`.
- Para editais dinâmicos, o endpoint `api/editais` faz scraping no momento da requisição (ou serve cache se aplicado).

Observações de segurança
- Evitar expor credenciais em scripts. Se for necessário acessar APIs privadas, usar variáveis de ambiente e `process.env`.
