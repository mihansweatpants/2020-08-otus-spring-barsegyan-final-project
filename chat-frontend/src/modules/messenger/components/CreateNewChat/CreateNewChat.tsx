import React, { FC, useState } from 'react';

import { Button } from '@material-ui/core';
import { AddRounded as AddRoundedIcon } from '@material-ui/icons';

import NewChatDialog from './NewChatDialog';

import { useStyles } from './styles';

const CreateNewChat: FC = () => {
  const styles = useStyles();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const openDialog = () => setIsDialogOpen(true);
  const closeDialog = () => setIsDialogOpen(false);

  return (
    <>
      <Button
        onClick={openDialog}
        color="primary"
        fullWidth
        className={styles.createNewChatButton}
      >
        <AddRoundedIcon fontSize="small" className={styles.addIcon} />

        Start new chat
      </Button>

      <NewChatDialog
        isOpen={isDialogOpen}
        onClose={closeDialog}
      />
    </>
  )
};

export default CreateNewChat;
