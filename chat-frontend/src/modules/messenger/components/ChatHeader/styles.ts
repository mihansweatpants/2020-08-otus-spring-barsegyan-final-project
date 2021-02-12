import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(2),
    borderBottom: `1px solid ${theme.palette.grey[200]}`,
  },

  chatInfo: {
    display: 'flex',
    alignItems: 'center',
  },

  chatAvatar: {
    marginRight: theme.spacing(2),
  },

  chatNameAndMembers: {},

  chatName: {
    fontWeight: theme.typography.fontWeightMedium,
  },

  chatMembers: {
    fontSize: '12px',
    color: theme.palette.grey[500],
  },
}));
