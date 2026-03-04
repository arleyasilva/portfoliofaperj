# Deploy

Opções comuns para publicar o projeto:

## 1) Deploy tradicional (Vercel / Netlify / host que suporte Next.js)

- Para Vercel: conecte o repositório GitHub e configure as variáveis de ambiente (se necessárias). Vercel detecta Next.js e faz o build automaticamente.
- Para servidores próprios: executar `npm run build` e `npm run start` em um servidor Node.

## 2) Docker

Dockerfile presente no repositório. Exemplo de build e execução:

```bash
docker build -t portfoliofaperj:latest .
docker run -p 3000:3000 portfoliofaperj:latest
```

Para exportar a imagem e enviar para outro host sem registry:

```bash
docker save -o portfoliofaperj.tar portfoliofaperj:latest
```

## 3) Artefato estático

Se o uso for apenas de páginas estáticas (`next export`), rode:

```bash
npm run export
```

e envie a pasta `out/` para o servidor estático.

## Variáveis de ambiente

- Caso tenha chaves ou endpoints privados, configure no host de deploy (Vercel / platform) ou via `process.env` localmente.
