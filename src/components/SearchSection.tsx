import {
  Box,
  Container,
  Grid,
  Typography,
  TextField,
  Button,
  Paper,
} from "@mui/material";
import React, { useState } from "react";
import { useRouter } from "next/router";

const SEARCH_RESULTS_PAGE = "/search-results";

const SearchSection = (): JSX.Element => {
  const router = useRouter();

  const [researcherName, setResearcherName] = useState("");
  const [keyword, setKeyword] = useState("");
  const [institution, setInstitution] = useState("");
  const [projectTitle, setProjectTitle] = useState("");

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();

    const params: Record<string, string> = {};

    if (researcherName) params.researcherName = researcherName;
    if (keyword) params.keyword = keyword;
    if (institution) params.institution = institution;
    if (projectTitle) params.projectTitle = projectTitle;

    const queryString = new URLSearchParams(params).toString();

    if (queryString) {
      router.push(`${SEARCH_RESULTS_PAGE}?${queryString}`);
    }
  };

  return (
    <Box
      id="busca"
      sx={{
        py: 6,
        px: { xs: 1.5, sm: 2 },
        borderTop: "1px solid",
        borderColor: "divider",
        backgroundImage: "url(/images/fundo-busca.png)",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Container maxWidth="lg">
        <Paper
          elevation={6}
          sx={{
            p: { xs: 3, sm: 4 },
            borderRadius: 3,
            backgroundColor: "white",
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Busca
            </Typography>
          </Box>

          <form onSubmit={handleSearch}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Pesquisador / Nome"
                  variant="outlined"
                  placeholder="Digite o nome do pesquisador"
                  value={researcherName}
                  onChange={(e) => setResearcherName(e.target.value)}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Palavra-chave"
                  variant="outlined"
                  placeholder="Digite uma palavra-chave"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Universidade / Centro de Pesquisa"
                  variant="outlined"
                  placeholder="Digite a instituição"
                  value={institution}
                  onChange={(e) => setInstitution(e.target.value)}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Título"
                  variant="outlined"
                  placeholder="Digite o título do projeto"
                  value={projectTitle}
                  onChange={(e) => setProjectTitle(e.target.value)}
                />
              </Grid>
            </Grid>

            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                justifyContent: "space-between",
                mt: 4,
                gap: 2,
              }}
            >
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{
                  py: 1.5,
                  fontWeight: "bold",
                }}
              >
                BUSCAR
              </Button>

              <Button
                variant="outlined"
                color="primary"
                fullWidth
                sx={{
                  py: 1.5,
                  fontWeight: "bold",
                }}
              >
                Programas
              </Button>
            </Box>
          </form>
        </Paper>
      </Container>
    </Box>
  );
};

export default SearchSection;
