# 📡 Documentação das APIs

Este documento descreve as APIs internas disponíveis no projeto Portfolio FAPERJ.

---

## 🎥 `/api/youtube`

Retorna uma lista de vídeos recentes do canal oficial da FAPERJ no YouTube.

### Método
`GET`

### Endpoint
```
/api/youtube
```

### Query Parameters

| Parâmetro | Tipo | Obrigatório | Padrão | Descrição |
|-----------|------|-------------|--------|-----------|
| `max` | number | Não | 10 | Número máximo de vídeos a retornar (máximo: 50) |

### Exemplo de Requisição

```bash
# Buscar 10 vídeos (padrão)
GET /api/youtube

# Buscar 24 vídeos
GET /api/youtube?max=24
```

### Resposta de Sucesso

**Status:** `200 OK`

```json
{
  "items": [
    {
      "title": "Título do Vídeo",
      "url": "https://www.youtube.com/watch?v=VIDEO_ID",
      "publishedAt": "2025-11-30T10:00:00.000Z"
    },
    {
      "title": "Outro Vídeo",
      "url": "https://www.youtube.com/watch?v=VIDEO_ID_2",
      "publishedAt": "2025-11-28T15:30:00.000Z"
    }
  ]
}
```

### Resposta de Erro

**Status:** `500 Internal Server Error`

```json
{
  "error": "Não foi possível obter vídeos",
  "details": "Mensagem de erro detalhada"
}
```

### Implementação

A API utiliza múltiplas estratégias para obter os vídeos:
1. **RSS Feed do Canal**: Método principal, não requer API key
2. **Fallback via oEmbed**: Tenta resolver channelId através de scraping
3. **User Feed RSS**: Alternativa caso o feed do canal falhe

### Caching

- **Cache-Control**: `public, max-age=3600` (1 hora)
- **s-maxage**: `7200` (2 horas)

---

## 📄 `/api/editais`

Obtém a lista atualizada de editais da FAPERJ através de scraping do site oficial.

### Método
`GET`

### Endpoint
```
/api/editais
```

### Query Parameters

Nenhum parâmetro requerido.

### Exemplo de Requisição

```bash
GET /api/editais
```

### Resposta de Sucesso

**Status:** `200 OK`

```json
{
  "items": [
    {
      "numero": "N.º 04/2025",
      "titulo": "Apoio à Pesquisa Científica e Tecnológica",
      "publicacao": "15/01/2025",
      "submissao": "15/03/2025",
      "resultadoPrevisao": "15/05/2025",
      "linkEdital": "https://www.faperj.br/downloads/edital_04_2025.pdf",
      "linkResultado": null,
      "status": "ABERTO",
      "observacoes": null
    },
    {
      "numero": "N.º 03/2025",
      "titulo": "Bolsas de Mestrado e Doutorado",
      "publicacao": "10/01/2025",
      "submissao": "10/02/2025",
      "resultadoPrevisao": "10/04/2025",
      "linkEdital": "https://www.faperj.br/downloads/edital_03_2025.pdf",
      "linkResultado": "https://www.faperj.br/downloads/resultado_03_2025.pdf",
      "status": "RESULTADO",
      "observacoes": "Resultado publicado em 05/04/2025"
    }
  ]
}
```

### Campos da Resposta

| Campo | Tipo | Descrição |
|-------|------|-----------|
| `numero` | string | Número identificador do edital (ex: "N.º 04/2025") |
| `titulo` | string | Título completo do edital |
| `publicacao` | string \| null | Data de publicação (formato: DD/MM/YYYY) |
| `submissao` | string \| null | Data limite para submissão (formato: DD/MM/YYYY) |
| `resultadoPrevisao` | string \| null | Data prevista para divulgação do resultado |
| `linkEdital` | string \| null | URL do PDF do edital |
| `linkResultado` | string \| null | URL do PDF do resultado (quando disponível) |
| `status` | string | Status atual: `ABERTO`, `ENCERRADO` ou `RESULTADO` |
| `observacoes` | string \| null | Observações adicionais sobre o edital |

### Status dos Editais

- **ABERTO**: Edital está aceitando submissões (data de submissão não expirada)
- **RESULTADO**: Resultado já foi publicado (linkResultado disponível)
- **ENCERRADO**: Prazo de submissão expirado, aguardando resultado

### Resposta de Erro

**Status:** `500 Internal Server Error`

```json
{
  "error": "Falha ao obter editais",
  "details": "Mensagem de erro detalhada"
}
```

### Implementação

A API realiza scraping da página oficial da FAPERJ:
- URL: `https://www.faperj.br/?id=28.5.7`
- Filtro: Editais do ano 2025
- Parsing: Extração via regex e heurísticas de texto

### Caching

- **Cache-Control**: `public, max-age=1800` (30 minutos)
- **s-maxage**: `3600` (1 hora)

---

## 🔧 Uso nas Aplicações

### Hook `useFaperjData`

Para consumir dados JSON estáticos:

```typescript
import useFaperjData from '@/hooks/useFaperjData';

const Component = () => {
  const { data, loading, error } = useFaperjData<DataType>('grafico1');
  
  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">{error}</Alert>;
  
  return <Chart data={data} />;
};
```

### Fetch Direto das APIs

```typescript
// YouTube Videos
const fetchVideos = async (max = 10) => {
  const response = await fetch(`/api/youtube?max=${max}`);
  const data = await response.json();
  return data.items;
};

// Editais
const fetchEditais = async () => {
  const response = await fetch('/api/editais');
  const data = await response.json();
  return data.items;
};
```

---

## 📝 Notas Técnicas

### Rate Limiting
- Não há rate limiting implementado atualmente
- Considere implementar para ambientes de produção

### CORS
- As APIs são acessíveis apenas do mesmo domínio
- Para acesso externo, configure CORS apropriadamente

### Monitoramento
- Erros são logados no console do servidor
- Considere integração com serviços de logging (Sentry, LogRocket, etc.)

### Atualização de Dados
- **YouTube**: Cache de 1 hora; atualizações automáticas via API
- **Editais**: Cache de 30 minutos; scraping em tempo real do site FAPERJ

---

## 🚀 Melhorias Futuras

- [ ] Implementar rate limiting
- [ ] Adicionar autenticação para APIs sensíveis
- [ ] Criar webhook para atualização automática de editais
- [ ] Implementar cache Redis para melhor performance
- [ ] Adicionar validação de schemas com Zod
- [ ] Criar testes de integração para as APIs
