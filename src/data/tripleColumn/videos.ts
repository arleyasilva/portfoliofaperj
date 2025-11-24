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
  { title: "Proposta do Parque Quilombo do Bomba é absorver água das chuvas e inundações", url: "http://www.youtube.com/watch?v=CbX1BA_Eg7Y" },
  { title: "MobiCrowd permite recompensar motoristas por direção sustentável", url: "http://www.youtube.com/watch?v=I0d0HyG5d4E" },
  { title: "FAPERJ lança sistema digital para prestação de contas", url: "http://www.youtube.com/watch?v=IaPSCOSXh88" },
  { title: "Projeto contribui para preservação de aves da Mata Atlântica ameaçadas de extinção", url: "http://www.youtube.com/watch?v=068B6vOhyRo" },
  { title: "Pesquisa da UERJ alerta para impactos das mudanças climáticas", url: "https://www.youtube.com/watch?v=C78n8zX4iYI" },
  { title: "Pesquisador do IMPA recebe prêmio internacional", url: "https://www.youtube.com/watch?v=Y_k4x7u_g_A" },
];
