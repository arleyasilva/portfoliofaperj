import { Box, Container, Typography, Link as MuiLink, IconButton } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import React from 'react';

const SocialBar = (): JSX.Element => {
  return (
    <Box sx={{
      bgcolor: '#6E0E2B',
      color: 'white',
      py: 0.5,
      display: { xs: 'none', md: 'block' },
    }}>
      <Container maxWidth="xl">
        <Box sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
          gap: 1
        }}>
          <Typography variant="caption" sx={{ mr: 2 }}>
            <MuiLink href="#" color="inherit" underline="hover">Página Inicial</MuiLink> | 
            <MuiLink href="#" color="inherit" underline="hover">Mapa do Site</MuiLink>
          </Typography>

          <IconButton size="small" href="#" color="inherit" aria-label="facebook">
            <FacebookIcon fontSize="small" />
          </IconButton>
          <IconButton size="small" href="#" color="inherit" aria-label="twitter">
            <TwitterIcon fontSize="small" />
          </IconButton>
          <IconButton size="small" href="#" color="inherit" aria-label="instagram">
            <InstagramIcon fontSize="small" />
          </IconButton>
        </Box>
      </Container>
    </Box>
  );
};

export default SocialBar;