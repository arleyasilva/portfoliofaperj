import React, { useState } from 'react';
import { Box, Typography, TextField, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { styled } from '@mui/system';

// URL base para a busca de currículos na Plataforma Lattes
const LATTES_SEARCH_URL = 'http://buscatextual.cnpq.br/buscatextual/busca.do';

// Estilização para o container principal, replicando o fundo da imagem
const SearchContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  backgroundColor: '#002E5C', // Cor de fundo principal
  color: 'white',
  padding: '60px 0',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  // Altere a linha abaixo para usar o seu arquivo
  backgroundImage: 'linear-gradient(rgba(0, 46, 92, 0.7), rgba(0, 46, 92, 0.7)), url("/images/fundo-lattes.png")',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
}));

// Estilização para o "Conheça o Pesquisador" e a linha vermelha
const SectionTitle = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginBottom: '40px',
  '&:before, &:after': {
    content: '""',
    flex: '1',
    borderBottom: '2px solid #E60000', // Linha vermelha
    margin: '0 10px',
  },
  '&:before': {
    width: '40px',
  },
  '&:after': {
    width: '900px',
  },
}));

// Estilização para a barra de busca
const SearchBar = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  backgroundColor: 'white',
  borderRadius: '4px',
  padding: '5px 10px',
  width: '100%',
  maxWidth: '600px',
}));

// Estilização do input, removendo as bordas padrão do MUI
const LattesTextField = styled(TextField)(({ theme }) => ({
  flex: 1,
  '& .MuiInputBase-root': {
    padding: '0 8px',
  },
  '& .MuiOutlinedInput-notchedOutline': {
    border: 'none',
  },
}));

const LattesSearch: React.FC = () => {
  const [researcherName, setResearcherName] = useState('');

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();
    if (researcherName) {
      // Cria a URL de busca com o nome do pesquisador
      const url = `${LATTES_SEARCH_URL}?query=${encodeURIComponent(researcherName)}`;
      window.open(url, '_blank'); // Abre a URL em uma nova aba
    }
  };

  return (
    <SearchContainer>
      <SectionTitle>
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
          Conheça o Pesquisador
        </Typography>
      </SectionTitle>
      
      <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', maxWidth: '600px' }}>
        <img
          src="/images/lattes-logo.png"
          alt="Plataforma Lattes Logo"
          style={{ height: '60px', marginRight: '20px' }}
        />
        <form onSubmit={handleSearch} style={{ width: '100%' }}>
          <SearchBar>
            <LattesTextField
              placeholder="Digite o nome do pesquisador"
              value={researcherName}
              onChange={(e) => setResearcherName(e.target.value)}
              variant="outlined"
            />
            <IconButton type="submit" sx={{ color: '#002E5C' }} aria-label="search">
              <SearchIcon />
            </IconButton>
          </SearchBar>
        </form>
      </Box>
    </SearchContainer>
  );
};

export default LattesSearch;