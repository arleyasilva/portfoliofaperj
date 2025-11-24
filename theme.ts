import { createTheme } from '@mui/material/styles';
import type { ThemeOptions } from '@mui/material/styles';

const themeOptions: ThemeOptions = {
  palette: {
    primary: {
      main: '#0d47a1', // Azul FAPERJ
    },
    secondary: {
      main: '#ff6f00', // Laranja FAPERJ
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
};

const theme = createTheme(themeOptions);

export default theme;