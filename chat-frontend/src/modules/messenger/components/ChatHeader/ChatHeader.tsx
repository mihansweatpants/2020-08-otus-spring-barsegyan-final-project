import React, { FC } from 'react';

import { Avatar, Typography } from '@material-ui/core';

import { useSelector } from 'store';

import { stringToHexColor } from 'utils/colors';

import { useStyles } from './styles';

const ChatHeader: FC = () => {
  const styles = useStyles();

  const chat = useSelector(state => state.chats.selectedChat!);

  return (
    <div className={styles.root}>
      <div className={styles.chatInfo}>
        <Avatar className={styles.chatAvatar} style={{ backgroundColor: stringToHexColor(chat.name) }}>
          {chat.name[0].toUpperCase()}
        </Avatar>

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
