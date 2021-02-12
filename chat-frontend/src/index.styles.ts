import { makeStyles } from '@material-ui/core/styles';

export const useGlobalStyles = makeStyles(theme => ({
  '@global': {
    'body': {
      fontFamily: '"Roboto", sans-serif',
    },

    '*::-webkit-scrollbar': {
      width: '4px',
    },
    '*::-webkit-scrollbar-track': {
      '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.00)',
      backgroundColor: theme.palette.grey[100],
    },
    '*::-webkit-scrollbar-thumb': {
      backgroundColor: theme.palette.grey[400],
      borderRadius: '4px',
    }
  }
}));
