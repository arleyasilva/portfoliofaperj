FROM node:18-alpine

# 1. Diretório de trabalho
WORKDIR /app

# 2. Copiar apenas os arquivos necessários para instalar dependências
COPY package.json ./
COPY package-lock.json ./

# 3. Instalar dependências
RUN npm install

# 4. Copiar todo o restante do projeto
COPY . .

# 5. Build de produção do Next
RUN npm run build

# 6. Expor a porta de execução
EXPOSE 3000

# 7. Iniciar servidor Next.js
CMD ["npm", "start"]
