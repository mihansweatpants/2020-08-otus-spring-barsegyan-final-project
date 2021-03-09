import React, { FC } from 'react';

import { AccountSettings, SessionsSettings } from 'modules/messenger/components';

import { useSelector } from 'store';
import { SettingsSection } from 'store/settings/types';

import { useStyles } from './styles';

const UserSettings: FC = () => {
  const styles = useStyles();

  const { selectedSection } = useSelector(state => state.settings);

  return (
    <div className={styles.root}>
      {selectedSection === SettingsSection.Account && <AccountSettings />}
      {selectedSection === SettingsSection.Sessions && <SessionsSettings />}
    </div>
  );
};

export default UserSettings;
