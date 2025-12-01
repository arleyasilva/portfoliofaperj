# ============================
#   STAGE 1 — BUILDER
# ============================
FROM node:18-alpine AS builder

WORKDIR /app

# Copia arquivos essenciais
COPY package.json package-lock.json ./

# Instala somente dependências necessárias
RUN npm ci

# Copia todo o projeto
COPY . .

# Build Standalone — Next 14
RUN npm run build


# ============================
#   STAGE 2 — RUNNER
# ============================
FROM node:18-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

# Copiar apenas o standalone (sem node_modules, sem source)
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

# Next.js Standalone já embute node_modules
EXPOSE 3000

CMD ["node", "server.js"]
