import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
  createNewChatButton: {
    paddingTop: theme.spacing(1.5),
    paddingBottom: theme.spacing(1.5),
    borderRadius: 0,
    borderTopLeftRadius: theme.shape.borderRadius * 2,
  },

  addIcon: {
    marginRight: theme.spacing(0.5),
  },
}));
