import { Card, Box, Typography } from "@mui/material";

const ChartContainer = ({ title, children }: any) => (
  <Card
    sx={{
      p: 2,
      borderRadius: 3,
      boxShadow: 3,
      height: 430,     // <<< ALTURA FIXA PARA TODOS
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
    }}
  >
    <Typography
      variant="h6"
      fontWeight={600}
      textAlign="center"
      mb={1}
      color="#2989b5"
    >
      {title}
    </Typography>

    <Box sx={{ flex: 1 }}>
      {children}
    </Box>

    <Typography
      variant="caption"
      sx={{
        mt: 1,
        fontStyle: "italic",
        color: "rgba(0,0,0,0.6)",
        textAlign: "left"
      }}
    >
      Fonte: Sistema de Bolsas e Auxílios – SBA / FAPERJ [2019 – 2025]
    </Typography>
  </Card>
);

export default ChartContainer;
