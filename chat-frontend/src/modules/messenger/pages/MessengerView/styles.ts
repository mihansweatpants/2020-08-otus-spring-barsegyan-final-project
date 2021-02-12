import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
  rootPaper: {
    height: '100%',
    display: 'flex',
    borderRadius: theme.shape.borderRadius * 2,
  },

  sidebar: {
    flexBasis: '30%',
    borderRight: `1px solid ${theme.palette.grey[200]}`,
    display: 'flex',
    flexDirection: 'column',
  },

  main: {
    flexBasis: '70%',
  },

  createChat: {},

  chatsList: {
    overflow: 'auto',
  },

  settingsMenu: {
    height: '100%',
  },

  sidebarTabs: {
    marginTop: 'auto',
    borderTop: `1px solid ${theme.palette.grey[200]}`,
  },
}));
