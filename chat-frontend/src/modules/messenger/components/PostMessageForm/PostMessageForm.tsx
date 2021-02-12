import React, { FC, useState } from 'react';

import { InputBase, IconButton } from '@material-ui/core';
import { SendRounded as SendRoundedIcon } from '@material-ui/icons';

import { useSelector, useDispatch } from 'store';
import { sendMessage } from 'store/messenger/messagesSlice';

import { useStyles } from './styles';

const PostMessageForm: FC = () => {
  const styles = useStyles();
  const dispatch = useDispatch();

  const chat = useSelector(state => state.chats.selectedChat!);
  const { isSendingMessage } = useSelector(state => state.messages);

  const [messageText, setMessageText] = useState('');

  const resetForm = () => {
    setMessageText('');
  };

  const handleSubmit = async () => {
    await dispatch(sendMessage(chat.id, messageText));

    resetForm();
  };

  const handleKeyDown = ({ key }: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (key === 'Enter' && messageText.length > 0) {
      handleSubmit();
    }
  };

  return (
    <div className={styles.root}>
      <InputBase
        value={messageText}
        onChange={({ target: { value } }) => setMessageText(value)}
        fullWidth
        placeholder="Write a message..."
        className={styles.textField}
        multiline
        rowsMax={10}
        disabled={isSendingMessage}
        onKeyDown={handleKeyDown}
        autoFocus
        inputRef={input => input && input.focus()}
      />

      <IconButton
        onClick={handleSubmit}
        disabled={isSendingMessage || !messageText}
        className={styles.iconButton}
      >
        <SendRoundedIcon />
      </IconButton>
    </div>
  );
};

export default PostMessageForm;
