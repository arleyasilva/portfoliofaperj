# 📹 Como Atualizar Vídeos do YouTube

Guia rápido para gerenciar vídeos e eventos ao vivo no site da FAPERJ.

---

## 🎥 ADICIONAR NOVO VÍDEO

### 1️⃣ Copiar informações do YouTube
- Acesse: https://www.youtube.com/@FAPERJoficial/videos
- Clique no vídeo desejado
- Copie o título e a URL

### 2️⃣ Editar o arquivo
Abra: `src/data/tripleColumn/videos.ts`

### 3️⃣ Adicionar no início do array
```typescript
export const RECENT_VIDEOS: YoutubeVideoItem[] = [
  { title: "TÍTULO DO NOVO VÍDEO", url: "https://www.youtube.com/watch?v=ABC123" }, // ← ADICIONE AQUI
  { title: "Vídeo anterior", url: "https://www.youtube.com/watch?v=DEF456" },
  // ... resto dos vídeos
];
```

### 4️⃣ Remover vídeo mais antigo (opcional)
Se houver mais de 8 vídeos, remova o último.

---

## 🔴 ATIVAR EVENTO AO VIVO

### Quando começar a transmissão:

```typescript
// ANTES (desativado):
export const LIVE_EVENT: YoutubeVideoItem | null = null;

// DEPOIS (ativado):
export const LIVE_EVENT: YoutubeVideoItem | null = {
  title: "Live: Nome do seu evento",
  url: "https://www.youtube.com/watch?v=VIDEO_ID",
  isLive: true,
};
```

### Resultado visual:
```
┌─────────────────────────────────────┐
│ 🔴 AO VIVO AGORA:                   │
│ Live: Nome do seu evento            │
│ [Card vermelho no topo da seção]    │
└─────────────────────────────────────┘
```

### Quando terminar:
```typescript
export const LIVE_EVENT: YoutubeVideoItem | null = null;
```

---

## ⚡ EXEMPLO PRÁTICO

### Cenário: Vai ter uma live hoje às 15h

**PASSO 1** - Crie a transmissão no YouTube e copie o link  
**PASSO 2** - Abra `src/data/tripleColumn/videos.ts`  
**PASSO 3** - Altere para:

```typescript
export const LIVE_EVENT: YoutubeVideoItem | null = {
  title: "Live: Lançamento do Edital 2025",
  url: "https://www.youtube.com/watch?v=LIVE_ID_123",
  isLive: true,
};
```

**PASSO 4** - Salve, commit e faça deploy  
**PASSO 5** - O card vermelho aparece automaticamente!  
**PASSO 6** - Após a live, volte `LIVE_EVENT` para `null`

---

## ✅ CHECKLIST

### Ao adicionar vídeo:
- [ ] Abrir `src/data/tripleColumn/videos.ts`
- [ ] Adicionar no INÍCIO do array RECENT_VIDEOS
- [ ] Copiar título exato do YouTube
- [ ] Usar URL completa: `https://www.youtube.com/watch?v=...`
- [ ] Remover vídeo antigo se passar de 8
- [ ] Salvar arquivo
- [ ] Testar com `npm run dev`
- [ ] Fazer commit e push

### Ao ativar live:
- [ ] Copiar URL da transmissão ao vivo
- [ ] Configurar `LIVE_EVENT` com título e URL
- [ ] Confirmar `isLive: true`
- [ ] Deploy IMEDIATO para aparecer no site
- [ ] Verificar card vermelho apareceu

### Ao desativar live:
- [ ] Voltar `LIVE_EVENT` para `null`
- [ ] Deploy para remover card vermelho

---

## 📍 Localização do Arquivo

```
portfoliofaperj/
└── src/
    └── data/
        └── tripleColumn/
            └── videos.ts  ← EDITE ESTE ARQUIVO
```

---

## 💡 DICAS

✅ **Sempre adicione vídeos no TOPO** do array (mais recente primeiro)  
✅ **Mantenha 6-8 vídeos** para não sobrecarregar  
✅ **Use títulos originais** do YouTube  
✅ **Lembre de desativar a live** após terminar!  
❌ **Não deixe** o evento ao vivo ativo indefinidamente

---

## 🔗 Links Rápidos

- 📺 Canal: https://www.youtube.com/@FAPERJoficial
- 🎬 Vídeos: https://www.youtube.com/@FAPERJoficial/videos
- 🔴 Lives: https://www.youtube.com/@FAPERJoficial/streams

---

**Dúvidas?** Consulte: `scripts/README_YOUTUBE.md`
