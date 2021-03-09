import React, { FC } from 'react';

import { List, ListItem, ListItemText, ListItemIcon, ListSubheader, Typography } from '@material-ui/core';
import { PersonRounded as PersonRoundedIcon, DevicesRounded as DevicesRoundedIcon } from '@material-ui/icons';

import { useSelector, useDispatch } from 'store';
import { setSelectedSection } from 'store/settings/settingsSlice';
import { SettingsSection } from 'store/settings/types';

import { useStyles } from './styles';

const UserSettingsMenu: FC = () => {
  const styles = useStyles();
  const dispatch = useDispatch();

  const { selectedSection } = useSelector(state => state.settings);

  return (
    <List
      subheader={
        <ListSubheader className={styles.listSubheader}>
          <Typography variant="h6" color="textSecondary">
            Settings
          </Typography>
        </ListSubheader>
      }
      disablePadding
    >
      <ListItem
        button
        onClick={() => dispatch(setSelectedSection(SettingsSection.Account))}
        selected={selectedSection === SettingsSection.Account}
        className={styles.listItem}
      >
        <ListItemIcon>
          <PersonRoundedIcon />
        </ListItemIcon>
        <ListItemText primary="Account" />
      </ListItem>

      <ListItem
        button
        onClick={() => dispatch(setSelectedSection(SettingsSection.Sessions))}
        selected={selectedSection === SettingsSection.Sessions}
        className={styles.listItem}
      >
        <ListItemIcon>
          <DevicesRoundedIcon />
        </ListItemIcon>
        <ListItemText primary="Sessions" />
      </ListItem>
    </List>
  );
};

export default UserSettingsMenu;
