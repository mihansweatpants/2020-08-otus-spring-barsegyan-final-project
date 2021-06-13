import React, { FC } from 'react';

import { Typography } from '@material-ui/core';
import { Avatar } from 'components';

import { useSelector } from 'store';

import { useStyles } from './styles';

const ChatHeader: FC = () => {
  const styles = useStyles();

  const chat = useSelector(state => state.chats.selectedChat!);

  return (
    <div className={styles.root}>
      <div className={styles.chatInfo}>
        <Avatar
          fallback={chat.name}
          className={styles.chatAvatar}
        />

        <div className={styles.chatNameAndMembers}>
          <Typography className={styles.chatName}>
            {chat.name}
          </Typography>

          <Typography className={styles.chatMembers}>
            {chat.members.length} members, {chat.members.reduce((acc, curr) => curr.isOnline ? acc + 1 : acc, 0)} online
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;
