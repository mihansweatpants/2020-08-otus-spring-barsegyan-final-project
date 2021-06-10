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

  submit: {
    marginTop: theme.spacing(4),
    width: '100%',

    '& > :not(:first-child)': {
      marginTop: theme.spacing(1),
    },
  },

  loginButtonLink: {
    textDecoration: 'none',
    display: 'block'
  },

  loginButton: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },

  providerIcon: {
    width: '20px',
    height: '20px',
    marginLeft: theme.spacing(1),
  },

  link: {
    cursor: 'pointer',
    marginTop: theme.spacing(1),
  },
}));
