import React, { FC } from 'react';

import { List, ListItem, ListItemAvatar, Avatar, Typography } from '@material-ui/core';

import { ChatDto } from 'api/types/chats';

import { useSelector, useDispatch } from 'store';
import { setSelectedChat } from 'store/messenger/chatsSlice';

import { formatToShortTime } from 'utils/date';
import { stringToHexColor } from 'utils/colors';

import { useStyles } from './styles';

const ChatsList: FC = () => {
  const styles = useStyles();
  const dispatch = useDispatch();

  const { chatsList, selectedChat } = useSelector(state => state.chats);
  const { readMarksByChatId } = useSelector(state => state.readMarks);

  const handleSetSelectedChat = (chat: ChatDto) => {
    if (selectedChat?.id !== chat.id) {
      dispatch(setSelectedChat(chat));
    }
  };

  const isChatSelected = (chat: ChatDto) => chat.id === selectedChat?.id;

  return (
    <List className={styles.listRoot} disablePadding>
      {
        chatsList.map(chat => (
          <ListItem
            key={chat.id}
            onClick={() => handleSetSelectedChat(chat)}
            button
            selected={isChatSelected(chat)}
            className={styles.listItem}
          >
            <ListItemAvatar className={styles.listItemAvatar}>
              <Avatar className={styles.chatAvatar} style={{ backgroundColor: stringToHexColor(chat.name) }}>
                {chat.name[0].toUpperCase()}
              </Avatar>
            </ListItemAvatar>

            <div className={styles.chatPreview}>
              <div className={styles.chatPreviewHeader}>
                <Typography className={styles.chatName}>
                  {chat.name}
                </Typography>

                {
                  chat.lastMessage?.sentAt != null && (
                    <Typography className={styles.lastUpdateTime}>
                      {formatToShortTime(chat.lastMessage.sentAt)}
                    </Typography>
                  )
                }
              </div>

              {
                chat.lastMessage && (
                  <div className={styles.lastMessage}>
                    <div className={styles.chatPreviewContent}>
                      <Typography display="inline" style={{ color: stringToHexColor(chat.lastMessage?.sentBy.username) }} className={styles.lastMessageSentBy}>
                        {chat.lastMessage?.sentBy.username}:
                      </Typography>
                      {' '}
                      <Typography display="inline" className={styles.lastMessageTextPreview}>
                        {chat.lastMessage?.text}
                      </Typography>
                    </div>

                    {
                      readMarksByChatId[chat.id]?.lastReadMessageId !== chat.lastMessage.id && (
                        <div className={styles.unreadBadge} />
                      )
                    }
                  </div>
                )
              }
            </div>
          </ListItem>
        ))
      }
    </List>
  );
};

export default ChatsList;
