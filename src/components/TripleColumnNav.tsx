"use client";

import { useState } from "react";
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
} from "@mui/material";
import { styled } from "@mui/material/styles";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import Link from "next/link";

// ✅ IMPORTAÇÕES DOS DATA FILES
import { EDITAIS_DATA } from "@/data/tripleColumn/editais";
import { PROGRAMAS_DATA } from "@/data/tripleColumn/programas";
import { RECENT_VIDEOS, LIVE_EVENT } from "@/data/tripleColumn/videos";

// Tipagens
interface YoutubeVideoItem {
  title: string;
  url: string;
  isLive?: boolean;
}

const DEFAULT_ITEMS_LIMIT = 10;

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
  const allVideos: YoutubeVideoItem[] = LIVE_EVENT
    ? [LIVE_EVENT, ...RECENT_VIDEOS]
    : RECENT_VIDEOS;

  const itemsToShow = allVideos.slice(0, 8);

  return (
    <List sx={{ p: 0, flexGrow: 1 }}>
      <Box sx={{ p: 1 }}>
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

      <Box sx={{ p: 2, textAlign: "center" }}>
        <Button
          variant="contained"
          color="error"
          href="https://www.youtube.com/user/FAPERJcomunica"
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

  const toggleItem = (id: string) => {
    setOpenItem((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleExpand = (column: string) => {
    setExpanded((prev) => ({ ...prev, [column]: !prev[column] }));
  };

  return (
    <Container maxWidth="xl" sx={{ py: 6 }}>
      <BannerHeader>
        <Typography variant="h3" fontWeight={600} color="white">
          FAPERJ EM PAUTA
        </Typography>
      </BannerHeader>

      <Box
        sx={{
          display: "flex",
          flexWrap: "nowrap",
          gap: 4,
          justifyContent: "center",
        }}
      >
        {/* COLUNA 1 — EDITAIS */}
        <Box sx={{ width: "33.33%", minWidth: 320 }}>
          <StyledCard>
            {/* Deixe imageSrc vazio, só preencher depois! */}
            <CardHeader imageSrc="">
              EDITAIS
            </CardHeader>
            <List sx={{ flexGrow: 1 }}>
              {EDITAIS_DATA.slice(
                0,
                expanded["Editais"] ? EDITAIS_DATA.length : DEFAULT_ITEMS_LIMIT
              ).map((item) => (
                <Box key={item.id}>
                  <Box
                    sx={{
                      p: 1,
                      pl: 2,
                      display: "flex",
                      alignItems: "center",
                      "&:hover": { backgroundColor: "rgba(0,0,0,0.05)" },
                    }}
                  >
                    <ListItemIcon sx={{ minWidth: 32 }}>
                      <ArrowRightIcon />
                    </ListItemIcon>
                    <Typography variant="body1">{item.label}</Typography>
                  </Box>
                </Box>
              ))}
            </List>
            {EDITAIS_DATA.length > DEFAULT_ITEMS_LIMIT && (
              <Box textAlign="right">
                <Button onClick={() => toggleExpand("Editais")}>
                  {expanded["Editais"] ? "Ver menos" : "Ver mais"}
                </Button>
              </Box>
            )}
          </StyledCard>
        </Box>

        {/* COLUNA 2 — PROGRAMAS */}
        <Box sx={{ width: "33.33%", minWidth: 320 }}>
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
        <Box sx={{ width: "33.33%", minWidth: 320 }}>
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
