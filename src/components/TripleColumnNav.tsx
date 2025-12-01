"use client";

import { useEffect, useRef, useState } from "react";
import {
  Box,
  Card,
  Typography,
  List,
  ListItemIcon,
  Collapse,
  Container,
  Link as MuiLink,
  Button,
  Chip,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import Link from "next/link";

// ✅ IMPORTAÇÕES DOS DATA FILES
import { EDITAIS_DATA, type EditalItem } from "@/data/tripleColumn/editais";
import { PROGRAMAS_DATA } from "@/data/tripleColumn/programas";
import { RECENT_VIDEOS, LIVE_EVENT } from "@/data/tripleColumn/videos";

// Tipagens
interface YoutubeVideoItem {
  title: string;
  url: string;
  isLive?: boolean;
}

const DEFAULT_ITEMS_LIMIT = 10;
const ESTIMATED_ROW_HEIGHT = 44; // px — aproximação da altura de cada linha de vídeo

/* CARD DE EVENTO AO VIVO */
const LiveNotificationCard = ({ video }: { video: YoutubeVideoItem }) => (
  <Card
    sx={{
      p: 2,
      backgroundColor: "#ff4d4f",
      color: "white",
      boxShadow: "0 4px 8px rgba(255, 77, 79, 0.4)",
      transition: "transform 0.3s",
      "&:hover": { transform: "scale(1.02)" },
    }}
  >
    <MuiLink
      href={video.url}
      target="_blank"
      rel="noopener"
      underline="none"
      color="inherit"
    >
      <Typography variant="body1" sx={{ fontWeight: 700, mb: 0.5 }}>
        🔴 AO VIVO AGORA:
      </Typography>
      <Typography variant="body1" sx={{ fontWeight: 500 }}>
        {video.title}
      </Typography>
    </MuiLink>
  </Card>
);

/* COLUNA 3 – DESTAQUES (Vídeos) */
const DestaquesColumn = () => {
  const [expanded, setExpanded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fetched, setFetched] = useState<YoutubeVideoItem[]>([]);
  const [fitCount, setFitCount] = useState<number>(DEFAULT_ITEMS_LIMIT);

  // Refs para medir área disponível no List
  const listRef = useRef<HTMLUListElement | null>(null);
  const headerRef = useRef<HTMLDivElement | null>(null);
  const footerRef = useRef<HTMLDivElement | null>(null);

  // Carrega vídeos dinamicamente do backend (sem API key)
  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        setLoading(true);
        const res = await fetch('/api/youtube?max=24');
        if (!res.ok) throw new Error('Falha ao carregar vídeos');
        const data = await res.json();
        const items: YoutubeVideoItem[] = (data.items || []).map((v: any) => ({
          title: v.title,
          url: v.url,
        }));
        if (!cancelled) setFetched(items);
      } catch {
        // Silencia e mantém fallback estático
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, []);

  // Medição responsiva: calcula quantas linhas cabem na área disponível
  useEffect(() => {
    function computeFit() {
      const listEl = listRef.current;
      if (!listEl) return;
      const total = listEl.getBoundingClientRect().height; // altura da área do List (flexGrow)
      const headerH = headerRef.current?.getBoundingClientRect().height ?? 0;
      const footerH = footerRef.current?.getBoundingClientRect().height ?? 0;
      const available = Math.max(0, total - headerH - footerH);
      const rows = Math.floor(available / ESTIMATED_ROW_HEIGHT);
      if (rows && rows !== fitCount) {
        setFitCount(Math.max(DEFAULT_ITEMS_LIMIT, rows));
      }
    }

    // Observa redimensionamentos
    const ro = new ResizeObserver(() => computeFit());
    if (listRef.current) ro.observe(listRef.current);
    computeFit();
    window.addEventListener("resize", computeFit);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", computeFit);
    };
  }, [fitCount]);

  // Fallback estático caso fetch falhe
  const baseList = fetched.length > 0 ? fetched : RECENT_VIDEOS;
  // Remove duplicados por URL
  const unique = baseList.filter((it, idx, arr) => arr.findIndex(a => a.url === it.url) === idx);
  const allVideos: YoutubeVideoItem[] = LIVE_EVENT ? [LIVE_EVENT, ...unique] : unique;

  const limit = fitCount; // número dinâmico que cabe no container
  const itemsToShow = expanded ? allVideos : allVideos.slice(0, Math.min(allVideos.length, limit));

  return (
    <List sx={{ p: 0, flexGrow: 1 }} ref={listRef}>
      <Box sx={{ p: 1 }} ref={headerRef}>
        <Typography variant="subtitle2" sx={{ color: "text.secondary", px: 1 }}>
          {LIVE_EVENT ? "Live + Vídeos recentes" : "Vídeos Recentes"}
        </Typography>
      </Box>

      {itemsToShow.map((item) =>
        item.isLive ? (
          <Box key={item.url} sx={{ px: 2, pt: 1 }}>
            <LiveNotificationCard video={item} />
          </Box>
        ) : (
          <MuiLink
            key={item.url}
            href={item.url}
            target="_blank"
            underline="none"
            color="inherit"
          >
            <Box
              sx={{
                p: 1,
                pl: 2,
                display: "flex",
                cursor: "pointer",
                gap: 1,
                "&:hover": { backgroundColor: "rgba(0,0,0,0.05)" },
              }}
            >
              <ListItemIcon sx={{ minWidth: "32px" }}>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="#FF0000"
                >
                  <path d="M10 15l5.587-3.23L10 8.54V15z" />
                  <path d="M21.5 8.167a3.033 3.033 0 00-2.15-2.15C17.383 5.5 12 5.5 12 5.5s-5.383 0-7.35.517a3.033 3.033 0 00-2.15 2.15C2.5 10.133 2.5 12 2.5 12s0 1.867.517 3.833a3.033 3.033 0 002.15 2.15C6.617 18.5 12 18.5 12 18.5s5.383 0 7.35-.517a3.033 3.033 0 002.15-2.15C21.5 13.867 21.5 12 21.5 12s0-1.867-.5-3.833z" />
                </svg>
              </ListItemIcon>
              <Typography variant="body2" sx={{ lineHeight: 1.3 }}>
                {item.title}
              </Typography>
            </Box>
          </MuiLink>
        )
      )}

      <Box sx={{ p: 2, textAlign: "center", display: 'flex', gap: 1, justifyContent: 'center' }} ref={footerRef}>
        {allVideos.length > (limit || DEFAULT_ITEMS_LIMIT) && (
          <Button
            variant="text"
            color="inherit"
            onClick={() => setExpanded((v) => !v)}
            disabled={loading}
            sx={{ textTransform: 'none' }}
          >
            {expanded ? "Ver menos" : "Ver mais"}
          </Button>
        )}
        <Button
          variant="contained"
          color="error"
          href="https://www.youtube.com/@FAPERJoficial"
          target="_blank"
          sx={{ fontWeight: 600, textTransform: "none" }}
        >
          Ver Canal no YouTube
        </Button>
      </Box>
    </List>
  );
};

/* ALTERADO: CARDHEADER RECEBE OPCIONAL imageSrc */
const CardHeader = ({
  children,
  imageSrc,
}: {
  children: React.ReactNode;
  imageSrc?: string;
}) => (
  <Box
    sx={{
      backgroundColor: "#2989b5",
      padding: 3,
      color: "white",
      fontWeight: 700,
      textAlign: "center",
    }}
  >
    {imageSrc && (
      <img
        src={imageSrc}
        alt=""
        style={{
          width: 48,
          height: 48,
          marginBottom: 8,
          objectFit: "contain",
        }}
      />
    )}
    <div>{children}</div>
  </Box>
);

const BannerHeader = styled(Box)(({ theme }) => ({
  height: 150,
  width: "100%",
  backgroundColor: "#792a3d",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: theme.shape.borderRadius * 2,
  marginBottom: theme.spacing(4),
  boxShadow: theme.shadows[3],
  [theme.breakpoints.down('md')]: {
    height: 100,
  },
}));

const StyledCard = styled(Card)(({ theme }) => ({
  height: "100%",
  maxWidth: "100%",
  display: "flex",
  flexDirection: "column",
  borderRadius: theme.shape.borderRadius * 2,
  boxShadow: theme.shadows[3],
}));

/* COMPONENTE PRINCIPAL */
const TripleColumnNav = () => {
  const [openItem, setOpenItem] = useState<Record<string, boolean>>({});
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const [editais, setEditais] = useState<EditalItem[]>(EDITAIS_DATA);

  // Heurística local para garantir status mesmo quando a API não trouxer
  const parseLastDateInText = (text?: string): Date | undefined => {
    if (!text) return undefined;
    const m = text.match(/(\d{2}\/\d{2}\/\d{4})(?![\s\S]*\d{2}\/\d{2}\/\d{4})/);
    if (!m) return undefined;
    const [dd, mm, yyyy] = m[1].split("/");
    const d = new Date(Number(yyyy), Number(mm) - 1, Number(dd), 23, 59, 59, 999);
    return isNaN(d.getTime()) ? undefined : d;
  };

  const getStatus = (item: EditalItem): "aberto" | "resultado" | "encerrado" => {
    // Preferir status vindo do dado quando existir e for válido
    const now = new Date();
    const s: any = (item as any).status;
    if (s === "aberto" || s === "resultado" || s === "encerrado") return s;
    // Fallback: se tiver link de resultado, considerar "resultado"
    // @ts-ignore
    if ((item as any).linkResultado) return "resultado";
    const deadline = parseLastDateInText((item as any).submissao);
    if (deadline && deadline.getTime() >= now.getTime()) return "aberto";
    return "encerrado";
  };

  const toggleItem = (id: string) => {
    setOpenItem((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleExpand = (column: string) => {
    setExpanded((prev) => ({ ...prev, [column]: !prev[column] }));
  };

  // Carrega automaticamente os editais via API e usa fallback em caso de erro
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const resp = await fetch("/api/editais");
        if (!resp.ok) return;
        const json = await resp.json();
        const items: EditalItem[] = json?.items || [];
        if (!cancelled && items.length) {
          setEditais(items);
        }
      } catch (e) {
        // usa fallback silenciosamente
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <Container maxWidth="xl" sx={{ py: { xs: 3, md: 6 } }}>
      <BannerHeader>
        <Typography 
          variant="h3" 
          fontWeight={600} 
          color="white"
          sx={{ fontSize: { xs: "1.75rem", md: "3rem" } }}
        >
          FAPERJ EM PAUTA
        </Typography>
      </BannerHeader>

      <Box
        sx={{
          display: { xs: "block", md: "flex" },
          flexDirection: { md: "row" },
          gap: { md: 4 },
          justifyContent: { md: "center" },
          alignItems: { md: "stretch" },
        }}
      >
        {/* COLUNA 1 — EDITAIS */}
        <Box sx={{ 
          width: "100%",
          flex: { md: "1 1 0" },
          minWidth: { md: 0 },
          mb: { xs: 4, md: 0 },
        }}>
          <StyledCard>
            <CardHeader imageSrc="">
              EDITAIS
            </CardHeader>
            {/* Wrapper com clamp de altura para manter a coluna compacta em desktop */}
            <Box sx={{ position: "relative" }}>
              <List
                sx={{
                  flexGrow: 1,
                  maxHeight: { xs: "none", md: expanded["Editais"] ? "none" : 420 },
                  overflow: "hidden",
                  pr: 1,
                }}
              >
              {editais.slice(
                0,
                expanded["Editais"] ? editais.length : DEFAULT_ITEMS_LIMIT
              ).map((item) => (
                <Box key={item.id}>
                    <MuiLink
                      component="button"
                      underline="none"
                      color="inherit"
                      onClick={() => toggleItem(item.id)}
                    sx={{
                      p: 1,
                      pl: 2,
                        width: "100%",
                        textAlign: "left",
                      display: "flex",
                      alignItems: "center",
                        gap: 1.25,
                        borderLeft: getStatus(item) === "aberto" ? "4px solid #2e7d32" : undefined,
                        backgroundColor: getStatus(item) === "aberto" ? "rgba(46,125,50,0.06)" : undefined,
                         borderRadius: 1,
                      "&:hover": { backgroundColor: "rgba(0,0,0,0.05)" },
                    }}
                  >
                    <ListItemIcon sx={{ minWidth: 32 }}>
                        <Box
                          sx={{
                            transition: "0.3s",
                            transform: openItem[item.id]
                              ? "rotate(45deg)"
                              : "rotate(0deg)",
                            fontSize: 18,
                            fontWeight: "bold",
                          }}
                        >
                          +
                        </Box>
                    </ListItemIcon>
                      <Box sx={{ flex: 1, minWidth: 0 }}>
                        <Typography variant="body2" fontWeight={600}>
                          {item.numero}
                        </Typography>
                        <Typography variant="body2" sx={{ fontSize: "0.875rem" }}>
                          {item.titulo}
                        </Typography>
                      </Box>
                      {/* Selo compacto de status sempre visível */}
                      {(() => {
                        const st = getStatus(item);
                        const chipProps =
                          st === "aberto"
                            ? { label: "ABERTO", sx: { bgcolor: "#e8f5e9", color: "#2e7d32", fontWeight: 700 } }
                            : st === "resultado"
                            ? { label: "RESULTADO", sx: { bgcolor: "#e3f2fd", color: "#1565c0", fontWeight: 700 } }
                            : { label: "ENCERRADO", sx: { bgcolor: "#eeeeee", color: "#616161", fontWeight: 700 } };
                        return <Chip size="small" {...chipProps} />;
                      })()}
                    </MuiLink>
                    <Collapse in={openItem[item.id]}>
                      <Box sx={{ p: 2, pt: 1, backgroundColor: "rgba(0,0,0,0.02)" }}>
                        {item.publicacao && (
                          <Typography variant="body2" color="text.secondary" gutterBottom>
                            <strong>Publicação:</strong> {item.publicacao}
                          </Typography>
                        )}
                        {item.submissao && (
                          <Typography variant="body2" color="text.secondary" gutterBottom>
                            <strong>Submissão:</strong> {item.submissao}
                          </Typography>
                        )}
                        {item.resultadoPrevisao && (
                          <Typography variant="body2" color="text.secondary" gutterBottom>
                            <strong>Resultado:</strong> {item.resultadoPrevisao}
                          </Typography>
                        )}
                        {item.observacoes && (
                          <Typography variant="body2" color="error" gutterBottom sx={{ mt: 1 }}>
                            {item.observacoes}
                          </Typography>
                        )}
                        <Box sx={{ mt: 2, display: "flex", gap: 1, flexWrap: "wrap" }}>
                          <MuiLink
                            href={item.linkEdital}
                            target="_blank"
                            rel="noopener"
                            sx={{
                              px: 2,
                              py: 0.5,
                              backgroundColor: "primary.main",
                              color: "white",
                              borderRadius: 1,
                              textDecoration: "none",
                              fontSize: "0.75rem",
                              "&:hover": { backgroundColor: "primary.dark" },
                            }}
                          >
                            📄 Ver Edital
                          </MuiLink>
                          {item.linkResultado && (
                            <MuiLink
                              href={item.linkResultado}
                              target="_blank"
                              rel="noopener"
                              sx={{
                                px: 2,
                                py: 0.5,
                                backgroundColor: "secondary.main",
                                color: "white",
                                borderRadius: 1,
                                textDecoration: "none",
                                fontSize: "0.75rem",
                                "&:hover": { backgroundColor: "secondary.dark" },
                              }}
                            >
                              📊 Ver Resultado
                            </MuiLink>
                          )}
                        </Box>
                      </Box>
                    </Collapse>
                </Box>
              ))}
              </List>

              {/* Fade no rodapé quando estiver colapsado (somente desktop) */}
              {!expanded["Editais"] && (
                <Box
                  sx={{
                    display: { xs: "none", md: "block" },
                    position: "absolute",
                    height: 48,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background:
                      "linear-gradient(to top, rgba(255,255,255,1), rgba(255,255,255,0))",
                    pointerEvents: "none",
                  }}
                />
              )}
            </Box>
            {editais.length > DEFAULT_ITEMS_LIMIT && (
                <Box textAlign="right" sx={{ p: 1 }}>
                <Button onClick={() => toggleExpand("Editais")}>
                  {expanded["Editais"] ? "Ver menos" : "Ver mais"}
                </Button>
              </Box>
            )}
          </StyledCard>
        </Box>

        {/* COLUNA 2 — PROGRAMAS */}
        <Box sx={{ 
          width: "100%",
          flex: { md: "1 1 0" },
          minWidth: { md: 0 },
          mb: { xs: 4, md: 0 },
        }}>
          <StyledCard>
            <CardHeader imageSrc="">
              PROGRAMAS
            </CardHeader>
            <List sx={{ flexGrow: 1 }}>
              {PROGRAMAS_DATA.slice(
                0,
                expanded["Programas"] ? PROGRAMAS_DATA.length : DEFAULT_ITEMS_LIMIT
              ).map((item) => (
                <Box key={item.id}>
                  <MuiLink
                    component="button"
                    underline="none"
                    color="inherit"
                    onClick={() => toggleItem(item.id)}
                    sx={{
                      p: 1,
                      pl: 2,
                      width: "100%",
                      textAlign: "left",
                      display: "flex",
                      alignItems: "center",
                      "&:hover": { backgroundColor: "rgba(0,0,0,0.05)" },
                    }}
                  >
                    <ListItemIcon sx={{ minWidth: 32 }}>
                      <Box
                        sx={{
                          transition: "0.3s",
                          transform: openItem[item.id]
                            ? "rotate(45deg)"
                            : "rotate(0deg)",
                          fontSize: 18,
                          fontWeight: "bold",
                        }}
                      >
                        +
                      </Box>
                    </ListItemIcon>
                    <Typography variant="body1">{item.label}</Typography>
                  </MuiLink>
                  <Collapse in={openItem[item.id]}>
                    <Box sx={{ p: 2, pt: 1 }}>
                      <Typography variant="body2" color="text.secondary">
                        {item.content}
                      </Typography>
                    </Box>
                  </Collapse>
                </Box>
              ))}
            </List>
            {PROGRAMAS_DATA.length > DEFAULT_ITEMS_LIMIT && (
              <Box textAlign="right">
                <Button onClick={() => toggleExpand("Programas")}>
                  {expanded["Programas"] ? "Ver menos" : "Ver mais"}
                </Button>
              </Box>
            )}
          </StyledCard>
        </Box>

        {/* COLUNA 3 — DESTAQUES */}
        <Box sx={{ 
          width: "100%",
          flex: { md: "1 1 0" },
          minWidth: { md: 0 },
          mb: { xs: 0, md: 0 },
        }}>
          <StyledCard>
            <CardHeader imageSrc="">
              DESTAQUES FAPERJ
            </CardHeader>
            <DestaquesColumn />
          </StyledCard>
        </Box>
      </Box>
    </Container>
  );
};

export default TripleColumnNav;
