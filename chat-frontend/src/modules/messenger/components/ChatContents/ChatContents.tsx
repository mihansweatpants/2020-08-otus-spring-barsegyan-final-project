import React, { FC, useEffect } from 'react';

import { Typography } from '@material-ui/core';

import { ChatHeader, ChatMessagesList, PostMessageForm } from 'modules/messenger/components';

import { useSelector, useDispatch } from 'store';
import { fetchMessages } from 'store/messenger/messagesSlice';

import { useStyles } from './styles';

const ChatContents: FC = () => {
  const styles = useStyles();
  const dispatch = useDispatch();

  const { chatsList, selectedChat, isLoading: isChatsListLoading } = useSelector(state => state.chats);

  useEffect(
    () => {
      if (selectedChat != null) {
        dispatch(fetchMessages(selectedChat.id));
      }
    },
    [dispatch, selectedChat],
  );

  if (chatsList.length === 0 && !isChatsListLoading) {
    return (
      <div className={styles.empty}>
        <Typography variant="h6" color="textSecondary">
          No chats yeat. Create one
        </Typography>
      </div>
    )
  }

  if (!selectedChat) {
    return (
      <div className={styles.empty}>
        <Typography variant="h6" color="textSecondary">
          Select a chat to start messaging
        </Typography>
      </div>
    )
  }

  return (
    <div className={styles.root}>
      <div className={styles.chatHeader}><ChatHeader /></div>
      <div className={styles.messagesList}><ChatMessagesList /></div>
      <div className={styles.postMessage}><PostMessageForm /></div>
    </div>
  );
};

export default ChatContents;
