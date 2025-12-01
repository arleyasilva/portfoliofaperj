// ======================================
//  VÍDEOS — CANAL FAPERJ + EVENTO AO VIVO
// ======================================

export interface YoutubeVideoItem {
  title: string;
  url: string;
  isLive?: boolean;
}

export const LIVE_EVENT: YoutubeVideoItem | null = null;

export const RECENT_VIDEOS: YoutubeVideoItem[] = [
  { title: "Proposta do Parque Quilombo do Bomba é absorver água das chuvas e inundações", url: "https://www.youtube.com/watch?v=CbX1BA_Eg7Y" },
  { title: "MobiCrowd permite recompensar motoristas por direção sustentável", url: "https://www.youtube.com/watch?v=I0d0HyG5d4E" },
  { title: "FAPERJ lança sistema digital para prestação de contas", url: "https://www.youtube.com/watch?v=IaPSCOSXh88" },
  { title: "Projeto contribui para preservação de aves da Mata Atlântica ameaçadas de extinção", url: "https://www.youtube.com/watch?v=068B6vOhyRo" },
];
// ======================================
//  📝 COMO ADICIONAR NOVO EVENTO AO VIVO
// ======================================
//
// Para mostrar um evento ao vivo com destaque vermelho e ícone 🔴:
//
// 1. Descomente as linhas abaixo
// 2. Substitua o título e o VIDEO_ID
// 3. Salve o arquivo
//
// export const LIVE_EVENT: YoutubeVideoItem | null = {
//   title: "Live: Cerimônia de Premiação FAPERJ 2025",
//   url: "https://www.youtube.com/watch?v=VIDEO_ID_AQUI",
//   isLive: true,
// };
//
// Após o evento, volte a deixar null:
// export const LIVE_EVENT: YoutubeVideoItem | null = null;
//
// ======================================
//  📝 COMO ADICIONAR NOVOS VÍDEOS
// ======================================
//
// Para adicionar um novo vídeo:
//
// 1. Acesse: https://www.youtube.com/@FAPERJoficial/videos
// 2. Copie o link do vídeo
// 3. Adicione no início do array RECENT_VIDEOS (sempre no topo para ser o mais recente)
//
// Exemplo:
// export const RECENT_VIDEOS: YoutubeVideoItem[] = [
//   { title: "Novo vídeo mais recente", url: "https://www.youtube.com/watch?v=VIDEO_ID" },
//   { title: "Segundo vídeo mais recente", url: "https://www.youtube.com/watch?v=VIDEO_ID_2" },
//   ... (vídeos anteriores)
// ];
//
