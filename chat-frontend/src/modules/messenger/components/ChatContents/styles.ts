import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
  empty: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  root: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },

  chatHeader: {},

  messagesList: {
    flex: 1,
    overflow: 'hidden',
  },

  postMessage: {},
}));
