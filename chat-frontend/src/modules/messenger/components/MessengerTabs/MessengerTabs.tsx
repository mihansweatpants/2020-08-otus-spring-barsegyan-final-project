import React, { FC } from 'react';

import { IconButton, Badge } from '@material-ui/core';
import { ChatBubbleRounded as ChatBubbleRoundedIcon, SettingsRounded as SettingsRoundedIcon } from '@material-ui/icons';

import { MessengerTab } from './types';

import { useSelector } from 'store';

import { useStyles } from './styles';

interface Props {
  selectedTab: MessengerTab;
  onChange: (value: MessengerTab) => void;
}

const MessengerTabs: FC<Props> = ({
  selectedTab,
  onChange
}) => {
  const styles = useStyles();

  const { chatsList } = useSelector(state => state.chats);
  const { readMarksByChatId } = useSelector(state => state.readMarks);

  const unreadChatsCount = chatsList.reduce(
    (unreadCount, chat) => {
      const lastChatMessageId = chat.lastMessage?.id;
      const lastMarkedMessageId = readMarksByChatId[chat.id]?.lastReadMessageId;

      if (lastChatMessageId != null && lastMarkedMessageId != null && lastChatMessageId !== lastMarkedMessageId) {
        return unreadCount + 1;
      }

      return unreadCount;
    },
    0,
  );

  return (
    <div className={styles.root}>
      <IconButton
        color={selectedTab === MessengerTab.Chats ? 'primary' : 'default'}
        onClick={() => onChange(MessengerTab.Chats)}
        className={styles.button}
      >
        <Badge
          invisible={unreadChatsCount === 0}
          badgeContent={unreadChatsCount}
          max={999}
          overlap="rectangle"
          color="secondary"
        >
          <ChatBubbleRoundedIcon />
        </Badge>
      </IconButton>

      <IconButton
        color={selectedTab === MessengerTab.Settings ? 'primary' : 'default'}
        onClick={() => onChange(MessengerTab.Settings)}
        className={styles.button}
      >
        <SettingsRoundedIcon />
      </IconButton>
    </div>
  );
};

export default MessengerTabs;
