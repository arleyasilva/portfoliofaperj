import React, { useState } from 'react';
import { Box, Typography, TextField, IconButton, Tooltip } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { styled } from '@mui/system';

const LATTES_SEARCH_URL = 'http://buscatextual.cnpq.br/buscatextual/busca.do';
const LATTES_CV_URL = 'http://lattes.cnpq.br';

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
  justifyContent: 'center',
  textAlign: 'center',
  marginBottom: '32px',
  width: '100%',
  maxWidth: '900px',
  padding: '0 16px',

  '&:before, &:after': {
    content: '""',
    flex: 1,
    borderBottom: '2px solid #E60000',
    margin: '0 12px',
  },
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

type LattesSearchProps = {
  /**
   * When true, shows the search input. When false, only shows the CNPq/Lattes logo linking to the official search page.
   */
  enabled?: boolean;
};

const LattesSearch: React.FC<LattesSearchProps> = ({ enabled = false }) => {
  const [researcherName, setResearcherName] = useState('');

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();
    if (researcherName.trim()) {
      // Verifica se é um ID Lattes (geralmente é um número com 16 dígitos)
      const isLattesId = /^\d{16}$/.test(researcherName.trim());
      
      let url: string;
      
      if (isLattesId) {
        // Se for ID Lattes, abre direto o currículo
        url = `http://lattes.cnpq.br/${researcherName.trim()}`;
      } else {
        // Se for nome, faz a busca no CNPq
        // Parâmetro 'texto' é o que o CNPq reconhece para busca
        url = `http://buscatextual.cnpq.br/buscatextual/busca.do?texto=${encodeURIComponent(
          researcherName.trim()
        )}&buscaSimples=true&botaoBusca=Buscar`;
      }

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

      {/* --- LOGO + (opcional) CAMPO DE BUSCA --- */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: enabled ? 2 : 0,
          width: '100%',
          maxWidth: '600px',
          px: 2,
        }}
      >
        {/* Logo do CNPq/Lattes direcionando para a página de busca oficial */}
        <a
          href={LATTES_SEARCH_URL}
          target="_blank"
          rel="noopener noreferrer"
          style={{ display: 'inline-flex' }}
        >
          <img
            src="/images/lattes-logo.png"
            alt="Plataforma Lattes (CNPq)"
            style={{
              height: '120px',
              marginRight: enabled ? '20px' : 0,
              maxWidth: '100%',
              borderRadius: '6px',
              boxShadow: '0 6px 16px rgba(0,0,0,0.25)',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease',
            }}
          />
        </a>

        {enabled && (
          <form onSubmit={handleSearch} style={{ width: '100%' }}>
            <SearchBar>
              <Tooltip title="Digite o nome do pesquisador ou o ID Lattes (16 dígitos)">
                <LattesTextField
                  placeholder="Nome do pesquisador ou ID Lattes"
                  value={researcherName}
                  onChange={(e) => setResearcherName(e.target.value)}
                  variant="outlined"
                />
              </Tooltip>
              <IconButton type="submit" sx={{ color: '#002E5C' }}>
                <SearchIcon />
              </IconButton>
            </SearchBar>
          </form>
        )}
      </Box>
    </SearchContainer>
  );
};

export default LattesSearch;
