import React, { FC, memo } from 'react';

import { Avatar, Typography } from '@material-ui/core';

import { ChatMessageDto, ChatMessageType } from 'api/types/chats';

import { stringToHexColor } from 'utils/colors';
import { formatToShortTime } from 'utils/date';

import { useStyles } from './styles';

interface Props {
  message: ChatMessageDto;
}

const MessagesListItem: FC<Props> = ({ message }) => {
  const styles = useStyles();

  if (message.type === ChatMessageType.SERVICE_MESSAGE) {
    return (
      <div className={styles.message}>
        <div className={styles.stretch}>
          <div className={styles.messageHeader}>
            <Typography className={styles.sentAtTime}>
              {formatToShortTime(message.sentAt)}
            </Typography>
          </div>

          <div className={styles.messageContent}>
            <Typography className={styles.messageText}>
              {message.text}
            </Typography>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.message}>
      <Avatar style={{ backgroundColor: stringToHexColor(message.sentBy?.username) }}>
        {message.sentBy != null ? message.sentBy.username[0].toUpperCase() : '!'}
      </Avatar>

      <div className={styles.stretch}>
        <div className={styles.messageHeader}>
          <Typography className={styles.username} style={{ color: stringToHexColor(message.sentBy?.username) }}>
            {message.sentBy?.username ?? 'Service message'}
          </Typography>

          <Typography className={styles.sentAtTime}>
            {formatToShortTime(message.sentAt)}
          </Typography>
        </div>

        <div className={styles.messageContent}>
          <Typography className={styles.messageText}>
            {message.text}
          </Typography>
        </div>
      </div>
    </div>
  );
};

const arePropsEqual = (prevProps: Props, nextProps: Props) =>
  prevProps.message.id === nextProps.message.id &&
  prevProps.message.text === nextProps.message.text;

export default memo(MessagesListItem, arePropsEqual);
