import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
  listRoot: {
    overflow: 'auto',
  },

  listItem: {
    padding: theme.spacing(1.5),
  },

  chatAvatar: {
    width: '50px',
    height: '50px',
  },

  listItemAvatar: {
    minWidth: '65px',
  },

  chatPreview: {
    width: '100%',
  },

  chatPreviewHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: theme.spacing(0.5),
  },

  chatName: {
    fontWeight: theme.typography.fontWeightMedium,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    maxWidth: '125px',
  },

  lastUpdateTime: {
    color: theme.palette.grey[400],
    fontSize: '14px'
  },

  lastMessage: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  lastMessageSentBy: {
    fontSize: '14px'
  },

  lastMessageTextPreview: {
    fontSize: '14px',
  },

  chatPreviewContent: {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    maxWidth: '160px',
  },

  unreadBadge: {
    height: '10px',
    width: '10px',
    backgroundColor: theme.palette.secondary.main,
    borderRadius: '50%',
  },
}));
