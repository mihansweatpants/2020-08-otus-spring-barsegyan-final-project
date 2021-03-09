import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
  root: {
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  form: {
    maxWidth: '350px',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },

  formTitle: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1.5),
  },

  formField: {
    marginTop: theme.spacing(2),
  },

  submitButton: {
    marginTop: theme.spacing(4),
  },

  link: {
    cursor: 'pointer',
    marginTop: theme.spacing(1),
  },
}));
