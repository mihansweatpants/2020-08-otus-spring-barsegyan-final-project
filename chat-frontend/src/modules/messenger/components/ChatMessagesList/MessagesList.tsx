import React, { FC, useRef, useEffect, useCallback } from 'react';
import { throttle } from 'lodash';

import { Typography, CircularProgress } from '@material-ui/core';
import MessagesListItem from './MessagesListItem';

import { useSelector, useDispatch } from 'store';
import { fetchMessages, incrementMessagesPage, decrementMessagesPage } from 'store/messenger/messagesSlice';

import { useStyles } from './styles';

// TODO: write this component properly
const MessagesList: FC = () => {
  const styles = useStyles();
  const dispatch = useDispatch();

  const { id: chatId } = useSelector(state => state.chats.selectedChat!);
  const { messagesList, isLoadingList } = useSelector(state => state.messages);

  const messagesListRootRef = useRef<HTMLDivElement | null>(null);

  const { page, totalPages } = messagesList;

  const getNextPageOfMessages = useCallback(
    async () => {
      if (page === 0 || isLoadingList) return;

      dispatch(decrementMessagesPage());
      await dispatch(fetchMessages(chatId))
    },
    [page, isLoadingList, dispatch, chatId]
  );

  const getPreviousPageOfMessages = useCallback(
    async () => {
      if (page === totalPages - 1 || isLoadingList) return;

      dispatch(incrementMessagesPage());
      dispatch(fetchMessages(chatId))
    },
    [page, totalPages, isLoadingList, dispatch, chatId],
  );

  useEffect(
    () => {
      const listRootRef = messagesListRootRef;

      if (listRootRef.current != null) {
        const onScroll = throttle(
          async (event: Event) => {
            const eventTarget = event?.target as HTMLDivElement;

            if (eventTarget && eventTarget.scrollTop === 0) {
              await getNextPageOfMessages();
            }

            if (eventTarget && eventTarget.scrollHeight + eventTarget.scrollTop === eventTarget.clientHeight) {
              getPreviousPageOfMessages();
            }
          },
          300
        );

        listRootRef.current.addEventListener('scroll', onScroll);

        return () => {
          listRootRef.current?.removeEventListener('scroll', onScroll);
        };
      }
    },
    [getNextPageOfMessages, getPreviousPageOfMessages],
  );

  if (messagesList.totalItems === 0 && isLoadingList) {
    return (
      <div className={styles.empty}>
        <CircularProgress />
      </div>
    )
  }

  if (messagesList.totalItems === 0 && !isLoadingList) {
    return (
      <div className={styles.empty}>
        <Typography variant="h6" color="textSecondary">
          No messages yet
        </Typography>
      </div>
    )
  }

  return (
    <div className={styles.root} ref={messagesListRootRef}>
      {
        messagesList.items.map(message => (
          <MessagesListItem
            key={message.id}
            message={message}
          />
        ))
      }
    </div>
  )
};

export default MessagesList;
