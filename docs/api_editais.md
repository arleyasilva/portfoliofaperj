# API de Editais

Arquivo principal: `src/pages/api/editais.ts`

Descrição:
- Faz scraping da página pública da FAPERJ para extrair informações sobre editais.
- Normaliza datas (publicação, submissão, resultado) usando heurísticas para lidar com fragmentos de texto no HTML.

Formato de saída (exemplo de campos):

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

Observações importantes:
- O parser faz busca em janelas amplas ao redor do link do edital porque alguns prazos são colocados em nós separados no HTML.
- `status` é calculado com base nas datas e na existência de `linkResultado`.
- Há um helper exportado `extractEditais(html)` que pode ser usado por scripts locais (ver `scripts/debug_fetch_editais.js`).

Se a página pública mudar muito o markup, será necessário ajustar as heurísticas do parser.
