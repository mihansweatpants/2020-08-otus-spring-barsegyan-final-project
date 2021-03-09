import { createMuiTheme } from '@material-ui/core';

export const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#6a45ff',
      dark: '#7d60ff',
    }
  },
  typography: {
    button: {
      textTransform: 'none',
    },
  },
});
