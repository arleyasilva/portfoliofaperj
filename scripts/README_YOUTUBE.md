# 📹 Gerenciamento de Vídeos do YouTube

Este guia explica como gerenciar os vídeos do canal FAPERJ (https://www.youtube.com/@FAPERJoficial) e adicionar eventos ao vivo no site.

## 📺 Adicionar Novos Vídeos

### Passo 1: Acessar o canal
Acesse: https://www.youtube.com/@FAPERJoficial/videos

### Passo 2: Copiar informações do vídeo
- Clique no vídeo desejado
- Copie o título e a URL (ex: `https://www.youtube.com/watch?v=ABC123`)

### Passo 3: Editar o arquivo
Abra `src/data/tripleColumn/videos.ts` e adicione o novo vídeo **no início** do array:

```typescript
export const RECENT_VIDEOS: YoutubeVideoItem[] = [
  { title: "Novo vídeo recente", url: "https://www.youtube.com/watch?v=ABC123" }, // ← NOVO
  { title: "Vídeo anterior", url: "https://www.youtube.com/watch?v=DEF456" },
  // ... outros vídeos
];
```

💡 **Dica**: Mantenha sempre os 6-8 vídeos mais recentes e remova os mais antigos.

---

## 🔴 Adicionar Evento AO VIVO

### Quando há um evento ao vivo:

1. Abra `src/data/tripleColumn/videos.ts`
2. Localize a linha `export const LIVE_EVENT: YoutubeVideoItem | null = null;`
3. Substitua por:

```typescript
export const LIVE_EVENT: YoutubeVideoItem | null = {
  title: "Live: Nome do Evento ao Vivo",
  url: "https://www.youtube.com/watch?v=VIDEO_ID",
  isLive: true,
};
```

### Após o término do evento:

Volte a linha para:
```typescript
export const LIVE_EVENT: YoutubeVideoItem | null = null;
```

### Como aparece no site:

O evento ao vivo aparecerá com:
- 🔴 Ícone vermelho "AO VIVO AGORA"
- Card destacado em vermelho no topo
- Link direto para a transmissão

---

## 📋 Exemplo Completo

```typescript
// src/data/tripleColumn/videos.ts

// ✅ COM EVENTO AO VIVO
export const LIVE_EVENT: YoutubeVideoItem | null = {
  title: "Live: Lançamento Edital 2025",
  url: "https://www.youtube.com/watch?v=LIVE123",
  isLive: true,
};

// ✅ VÍDEOS RECENTES (sempre do mais novo para o mais antigo)
export const RECENT_VIDEOS: YoutubeVideoItem[] = [
  { title: "Vídeo de hoje", url: "https://www.youtube.com/watch?v=ABC" },
  { title: "Vídeo de ontem", url: "https://www.youtube.com/watch?v=DEF" },
  { title: "Vídeo semana passada", url: "https://www.youtube.com/watch?v=GHI" },
  // ... até 6-8 vídeos
];
```

---

## 🎨 Visual no Site

### Evento ao Vivo:
```
┌────────────────────────────────────┐
│ 🔴 AO VIVO AGORA:                  │
│ Live: Lançamento Edital 2025       │
│ [Card vermelho destacado]          │
└────────────────────────────────────┘
```

### Vídeos Regulares:
```
🎥 Vídeo de hoje
🎥 Vídeo de ontem
🎥 Vídeo semana passada
...
[Botão: Ver Canal no YouTube]
```

---

## ✅ Checklist de Atualização

### Quando adicionar novo vídeo:
- [ ] Acessar canal @FAPERJoficial
- [ ] Copiar título e URL do vídeo
- [ ] Adicionar no início do array RECENT_VIDEOS
- [ ] Remover vídeo mais antigo se houver mais de 8
- [ ] Salvar arquivo
- [ ] Testar localmente (`npm run dev`)
- [ ] Commit e push

### Quando iniciar evento ao vivo:
- [ ] Copiar URL da transmissão
- [ ] Configurar LIVE_EVENT com título e URL
- [ ] Adicionar `isLive: true`
- [ ] Salvar e fazer deploy imediato
- [ ] Verificar card vermelho aparecendo

### Quando terminar evento ao vivo:
- [ ] Voltar LIVE_EVENT para `null`
- [ ] Salvar arquivo
- [ ] Fazer deploy
- [ ] Card vermelho sumirá automaticamente

---

## 💡 Dicas

1. **Ordem dos vídeos**: Sempre do mais recente para o mais antigo
2. **Quantidade**: Manter entre 6-8 vídeos para não sobrecarregar a página
3. **Títulos**: Usar os títulos originais do YouTube
4. **URLs**: Sempre usar formato `https://www.youtube.com/watch?v=VIDEO_ID`
5. **Evento ao vivo**: Lembrar de desativar após o término!

---

## 🔗 Links Úteis

- Canal FAPERJ: https://www.youtube.com/@FAPERJoficial
- Vídeos do canal: https://www.youtube.com/@FAPERJoficial/videos
- Transmissões ao vivo: https://www.youtube.com/@FAPERJoficial/streams

---

**Última atualização**: Dezembro 2025

