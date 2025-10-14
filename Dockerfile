# Estágio 1: Build (Construção)
# Usamos uma imagem base do Node.js, otimizada e leve
FROM node:18-alpine AS builder

# Define o diretório de trabalho dentro do container
WORKDIR /app

# Copia os arquivos de configuração para a instalação de dependências
COPY package.json package-lock.json ./

# Instala todas as dependências do projeto
RUN npm install

# Copia o restante do código-fonte para dentro do container
COPY . .

# Executa o build de produção do Next.js
# Isso cria a versão otimizada da sua aplicação
RUN npm run build

# ---

# Estágio 2: Produção (Execução)
# Inicia uma nova imagem limpa para a aplicação final
FROM node:18-alpine

# Define o diretório de trabalho para o ambiente de produção
WORKDIR /app

# Copia apenas os arquivos essenciais do estágio de construção
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/public ./public

# Expõe a porta que a sua aplicação Next.js irá utilizar
EXPOSE 3000

# Define o comando para iniciar a aplicação em modo de produção
CMD ["npm", "start"]