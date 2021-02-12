import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    alignItems: 'flex-end',
    border: 'none',
    borderTop: `1px solid ${theme.palette.grey[200]}`,
  },

  textField: {
    margin: theme.spacing(1, 2),
  },

  iconButton: {
    borderRadius: theme.shape.borderRadius,
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
  },
}));
