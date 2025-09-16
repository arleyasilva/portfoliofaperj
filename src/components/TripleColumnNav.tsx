import { useState } from 'react';
import {
  Box,
  Grid,
  Card,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  Collapse,
  Divider,
  Container,
  Link as MuiLink,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import Link from 'next/link';
import React from 'react';
import type { BoxProps } from '@mui/material';

// 1. Interfaces para tipar a estrutura de dados complexa
interface NavSubItem {
  id: string; // Adicionamos um ID para subItems
  label: string;
}

interface NavItem {
  id: string;
  label: string;
  subItems: NavSubItem[];
}

interface ColumnData {
  title: string;
  image: string;
  items: NavItem[];
}

// 2. Interface para tipar o componente estilizado
interface CardHeaderProps extends BoxProps {
  image: string;
}

const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  borderRadius: theme.shape.borderRadius * 2,
  boxShadow: theme.shadows[3],
  overflow: 'hidden',
}));

const CardHeader = styled(Box)<CardHeaderProps>(({ theme, image }) => ({
  height: 150,
  backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${image})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  display: 'flex',
  alignItems: 'flex-end',
  padding: theme.spacing(2),
}));

const images = {
  linhasPesquisa: '/images/linhas-pesquisa.png',
  linhasFomento: '/images/linhas-fomento.png',
  resultadosProdutos: '/images/resultados-produtos.png',
};

const TripleColumnNav = (): JSX.Element => {
  // 3. Tipagem para os estados do componente
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  // 4. Tipagem para a função que lida com o clique
  const handleItemClick = (itemId: string) => {
    setOpenItems(prev => ({ ...prev, [itemId]: !prev[itemId] }));
    setSelectedItem(itemId);
  };

  // 5. Tipagem para a variável que armazena os dados das colunas
  const columnsData: ColumnData[] = [
    {
      title: 'Linhas de Pesquisa',
      image: images.linhasPesquisa,
      items: [
        { id: 'pesquisa-1', label: 'Título da pesquisa', subItems: [{ id: 'sub1', label: 'Sub-item 1.1' }, { id: 'sub2', label: 'Sub-item 1.2' }] },
        { id: 'pesquisa-2', label: 'Título da pesquisa selecionada', subItems: [{ id: 'sub3', label: 'Sub-item 2.1' }, { id: 'sub4', label: 'Sub-item 2.2' }, { id: 'sub5', label: 'Sub-item 2.3' }] },
        { id: 'pesquisa-3', label: 'Título da pesquisa', subItems: [] },
        { id: 'pesquisa-4', label: 'Título da pesquisa', subItems: [] },
        { id: 'pesquisa-5', label: 'Título da pesquisa', subItems: [] },
        { id: 'pesquisa-6', label: 'Título da pesquisa', subItems: [] },
      ],
    },
    {
      title: 'Linhas de Fomento',
      image: images.linhasFomento,
      items: [
        { id: 'fomento-1', label: 'Linha 001', subItems: [] },
        { id: 'fomento-2', label: 'Linha 002', subItems: [] },
        { id: 'fomento-15', label: 'Linha 015', subItems: [] },
      ],
    },
    {
      title: 'Resultados e Produtos',
      image: images.resultadosProdutos,
      items: [
        { id: 'resultado-1', label: 'Resultado', subItems: [] },
        { id: 'resultado-2', label: 'Resultado', subItems: [] },
        { id: 'resultado-15', label: 'Resultado', subItems: [] },
      ],
    },
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 6, backgroundColor: 'transparent' }} >
      <Grid container spacing={4} justifyContent="center" alignItems="stretch">
        {columnsData.map((column, colIndex) => (
          <Grid item xs={12} md={4} key={colIndex}>
            <StyledCard>
              <CardHeader image={column.image}>
                <Typography variant="h5" sx={{ color: 'white', fontWeight: 600 }}>
                  {column.title}
                </Typography>
              </CardHeader>
              <List sx={{ p: 0, flexGrow: 1, backgroundColor: 'transparent', }}>
                {column.items.map((item) => (
                  <Box key={item.id}>
                    <MuiLink
                      href={`#${item.id}`}
                      component={Link}
                      color="inherit"
                      underline="none"
                      sx={{
                        backgroundColor: selectedItem === item.id ? 'rgba(0, 0, 0, 0.1)' : 'transparent',
                        borderLeft: selectedItem === item.id ? `4px solid #1976d2` : 'none',
                        padding: (theme) => theme.spacing(1),
                        paddingLeft: selectedItem === item.id ? (theme) => theme.spacing(1.5) : (theme) => theme.spacing(2),
                        transition: 'background-color 0.3s ease, border-left 0.3s ease',
                        display: 'flex',
                        alignItems: 'center',
                        '&:hover': {
                          backgroundColor: 'rgba(0, 0, 0, 0.05)',
                        },
                      }}
                      onClick={() => handleItemClick(item.id)}
                    >
                      <ListItemIcon sx={{ minWidth: '32px', color: selectedItem === item.id ? 'primary.main' : 'inherit' }}>
                        <ArrowRightIcon />
                      </ListItemIcon>
                      <Typography variant="body1" sx={{ fontWeight: selectedItem === item.id ? 600 : 400 }}>
                        {item.label}
                      </Typography>
                    </MuiLink>

                    {item.subItems.length > 0 && (
                      <Collapse in={openItems[item.id]} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                          {item.subItems.map((subItem) => (
                            <MuiLink href={`#${subItem.id}`} component={Link} key={subItem.id} color="inherit" underline="none">
                                <ListItemButton sx={{ pl: 4, py: 0.5 }} disableRipple>
                                  <ListItemIcon sx={{ minWidth: '32px' }}>
                                    <ArrowRightIcon sx={{ fontSize: '1rem' }} />
                                  </ListItemIcon>
                                  <Typography variant="body2" sx={{ fontWeight: 400 }}>
                                    {subItem.label}
                                  </Typography>
                                </ListItemButton>
                            </MuiLink>
                          ))}
                        </List>
                      </Collapse>
                    )}
                    <Divider />
                  </Box>
                ))}
              </List>
            </StyledCard>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default TripleColumnNav;