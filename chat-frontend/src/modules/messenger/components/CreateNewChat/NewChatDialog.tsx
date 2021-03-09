import React, { FC } from 'react';

import { Dialog, DialogTitle, DialogContent } from '@material-ui/core';

import { ChatForm } from 'modules/messenger/components';

import { useSelector, useDispatch } from 'store';
import { createChat } from 'store/messenger/chatsSlice';
import { ChatFormValues } from '../ChatForm/types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const NewChatDialog: FC<Props> = ({
  isOpen,
  onClose
}) => {
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.auth.user!);

  const handleSubmit = async (values: ChatFormValues) => {
    await dispatch(createChat({ ...values, memberIds: values.members.map(({ id }) => id) }));
    onClose();
  };

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      maxWidth="md"
    >
      <DialogTitle>
        Create new chat
      </DialogTitle>

      <DialogContent>
        <ChatForm
          values={{ chatName: '', members: [currentUser] }}
          disabledUsers={[currentUser]}
          onSubmit={handleSubmit}
        />
      </DialogContent>
    </Dialog>
  )
};

export default NewChatDialog;
