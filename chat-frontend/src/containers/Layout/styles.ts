import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
  container: {
    maxWidth: '1010px',
    display: 'flex',
  },

  content: {
    padding: '65px 0px',
    flexGrow: 1,
    height: '100vh',
  },
}));
