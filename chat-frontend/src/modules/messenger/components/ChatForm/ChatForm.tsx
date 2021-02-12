import React, { FC, useState } from 'react';
import { isEmpty } from 'lodash';

import { TextField, DialogActions, Button } from '@material-ui/core';

import SelectUsers from './SelectUsers';

import { UserDto } from 'api/types/users';
import { ChatFormValues } from './types';

import { useStyles } from './styles';

interface Props {
  values: ChatFormValues;
  onSubmit: (values: ChatFormValues) => Promise<void>;
  onCancel?: () => void;
  disabledUsers?: UserDto[];
  isEdit?: boolean;
}

const ChatForm: FC<Props> = ({
  values,
  onSubmit,
  onCancel,
  disabledUsers = [],
  isEdit,
}) => {
  const styles = useStyles();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [chatName, setChatName] = useState(values.chatName);
  const [members, setMembers] = useState(values.members);

  const formValues = { chatName, members };
  const [errors, setErrors] = useState<{ [K in keyof typeof formValues]?: boolean }>({});

  const handleChangeName = ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
    setChatName(value);
    setErrors(errors => ({ ...errors, chatName: isEmpty(value) }));
  };

  const handleChangeMembers = (selectedMembers: UserDto[]) => {
    setMembers(selectedMembers);
    setErrors(errors => ({ ...errors, members: isEmpty(selectedMembers) }));
  };

  const validateFormValues = (): boolean => {
    const errors = {};

    for (const [key, value] of Object.entries(formValues)) {
      if (isEmpty(value)) {
        errors[key] = true;
      }
    }

    setErrors(errors);

    return Object.values(errors).every(isError => !isError);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const isFormValid = validateFormValues();

    if (isFormValid) {
      try {
        setIsSubmitting(true);
        onSubmit(formValues);
      }
      finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.formRoot}>
      <TextField
        value={formValues.chatName}
        onChange={handleChangeName}
        fullWidth
        label="Chat name"
        variant="outlined"
        error={errors.chatName}
      />

      <div className={styles.selectMembers}>
        <SelectUsers
          value={formValues.members}
          onChange={handleChangeMembers}
          isValueDisabled={value => disabledUsers.some(user => user.id === value.id)}
          error={errors.members}
        />
      </div>

      <DialogActions className={styles.submitActions}>
        {
          onCancel != null && (
            <Button onClick={onCancel} type="button">
              Cancel
            </Button>
          )
        }

        <Button
          type="submit"
          color="primary"
          variant="contained"
          disabled={isSubmitting}
        >
          {isEdit ? 'Save' : 'Create'}
        </Button>
      </DialogActions>
    </form>
  );
};

export default ChatForm;
