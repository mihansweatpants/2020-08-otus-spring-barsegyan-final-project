import React, { FC, useEffect } from 'react';
import { first } from 'lodash';

import { Typography, CircularProgress } from '@material-ui/core';
import MessagesList from './MessagesList';

import { useSelector, useDispatch } from 'store';
import { markLastReadMessage } from 'store/messenger/readMarksSlice';

import { useBrowserTabFocusContext } from 'hooks/useBrowserTabFocus';

import { useStyles } from './styles';

const ChatMessagesList: FC = () => {
  const styles = useStyles();
  const dispatch = useDispatch();

  const { id: currentUserId } = useSelector(state => state.auth.user!);
  const { messagesList, isLoadingList } = useSelector(state => state.messages);

  const { isBrowserTabFocused } = useBrowserTabFocusContext();

  useEffect(
    () => {
      if (isBrowserTabFocused && messagesList.items.length > 0) {
        const lastReadMessage = first(messagesList.items)!;

        const markMessage = () => dispatch(markLastReadMessage(lastReadMessage.chatId, lastReadMessage.id));

        if (lastReadMessage.sentBy.id === currentUserId) {
          markMessage();
        }
        else {
          setTimeout(markMessage, 200);
        }
      }
    },
    [currentUserId, messagesList, isBrowserTabFocused, dispatch],
  );

  return (
    <div className={styles.root}>
      {
        isLoadingList && messagesList.totalItems === 0 && (
          <div className={styles.empty}>
            <CircularProgress />
          </div>
        )
      }

      {
        !isLoadingList && messagesList.totalItems === 0 && (
          <div className={styles.empty}>
            <Typography variant="h6" color="textSecondary">
              No messages yet
            </Typography>
          </div>
        )
      }

      {
        !isLoadingList && messagesList.totalItems > 0 && (
          <MessagesList />
        )
      }
    </div>
  );
};

export default ChatMessagesList;
