import React, { useState } from 'react';
import { Box, Typography, TextField, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { styled } from '@mui/system';

const LATTES_SEARCH_URL = 'http://buscatextual.cnpq.br/buscatextual/busca.do';

/* =============================== */
/* ESTILOS                          */
/* =============================== */

const SearchContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  backgroundColor: '#002E5C',
  color: 'white',
  padding: '60px 0',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  backgroundImage:
    'linear-gradient(rgba(0, 46, 92, 0.7), rgba(0, 46, 92, 0.7)), url("/images/fundo-lattes.png")',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
}));

// Linha com título e barras vermelhas responsivas
const SectionTitle = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginBottom: '40px',
  width: '100%',
  maxWidth: '900px',
  padding: '0 16px',

  '&:before, &:after': {
    content: '""',
    flex: 1,
    borderBottom: '2px solid #E60000',
    margin: '0 10px',
  },

  '&:before': { flex: 0.3 },
  '&:after': { flex: 1 },
}));

// Barra de busca
const SearchBar = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  backgroundColor: 'white',
  borderRadius: '6px',
  padding: '5px 10px',
  width: '100%',
  maxWidth: '600px',
  boxShadow: '0px 3px 10px rgba(0,0,0,0.15)',
}));

const LattesTextField = styled(TextField)(({ theme }) => ({
  flex: 1,
  '& .MuiInputBase-root': {
    padding: '0 8px',
  },
  '& .MuiOutlinedInput-notchedOutline': {
    border: 'none',
  },
}));

/* =============================== */
/* COMPONENTE                       */
/* =============================== */

const LattesSearch: React.FC = () => {
  const [researcherName, setResearcherName] = useState('');

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();
    if (researcherName.trim()) {
      const url = `${LATTES_SEARCH_URL}?texto=${encodeURIComponent(
        researcherName
      )}&buscaSimples=true&botaoBusca=Buscar`;

      window.open(url, '_blank');
    }
  };

  return (
    <SearchContainer>
      {/* --- TÍTULO COM BARRAS --- */}
      <SectionTitle>
        <Typography
          variant="h6"
          sx={{ fontWeight: 'bold', whiteSpace: 'nowrap' }}
        >
          Conheça o Pesquisador
        </Typography>
      </SectionTitle>

      {/* --- LOGO + CAMPO DE BUSCA --- */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          width: '100%',
          maxWidth: '600px',
          px: 2,
        }}
      >
        <img
          src="/images/lattes-logo.png"
          alt="Plataforma Lattes Logo"
          style={{
            height: '60px',
            marginRight: '20px',
            maxWidth: '100%',
          }}
        />

        <form onSubmit={handleSearch} style={{ width: '100%' }}>
          <SearchBar>
            <LattesTextField
              placeholder="Digite o nome do pesquisador"
              value={researcherName}
              onChange={(e) => setResearcherName(e.target.value)}
              variant="outlined"
            />
            <IconButton type="submit" sx={{ color: '#002E5C' }}>
              <SearchIcon />
            </IconButton>
          </SearchBar>
        </form>
      </Box>
    </SearchContainer>
  );
};

export default LattesSearch;
