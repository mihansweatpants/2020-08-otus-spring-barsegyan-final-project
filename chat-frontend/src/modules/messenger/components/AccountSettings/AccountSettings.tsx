import React, { FC } from 'react';

import { Avatar, Typography } from '@material-ui/core';

import { useSelector } from 'store';

import { stringToHexColor } from 'utils/colors';
import { useStyles } from './styles';

const AccountSettings: FC = () => {
  const styles = useStyles();

  const currentUser = useSelector(state => state.auth.user!);

  return (
    <>
      <Typography variant="h6" color="textSecondary">
        Account
      </Typography>

      <div className={styles.accountInfo}>
        <Avatar className={styles.avatar} style={{ backgroundColor: stringToHexColor(currentUser.username) }}>
          {currentUser.username[0].toUpperCase()}
        </Avatar>

        <div className={styles.userInfo}>
          <Typography variant="h6">{currentUser.username}</Typography>
          <Typography color="textSecondary">{currentUser.email}</Typography>
          <Typography color="textSecondary">{currentUser.id}</Typography>
        </div>
      </div>
    </>
  );
};

export default AccountSettings;