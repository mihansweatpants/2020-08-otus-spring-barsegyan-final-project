import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
  formRoot: {
    width: '500px',
  },

  submitActions: {
    padding: theme.spacing(1, 0),
  },

  selectMembers: {
    margin: theme.spacing(2, 0),
  },
}));

export const useSelectUsersStyles = makeStyles(theme => ({
  searchInputRoot: {
    padding: theme.spacing(1),
    display: 'inline-flex',
    flexWrap: 'wrap',
  },

  searchInput: {
    width: 0,
    minWidth: '30px',
    flex: 1,
    padding: theme.spacing(1, 0.5),
  },

  chip: {
    margin: '3px',
  },

  list: {
    maxHeight: '300px',
    overflow: 'auto',
  },
}));
