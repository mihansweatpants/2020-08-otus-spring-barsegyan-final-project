import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ReadMarksApi } from 'api';
import { ReadMarkDto } from 'api/types/readMarks';

import { AppThunk } from 'store';

interface State {
  readMarksByChatId: {
    [chatId: string]: ReadMarkDto;
  }
}

const initialState: State = {
  readMarksByChatId: {},
};

const readMarks = createSlice({
  name: 'readMarks',
  initialState,
  reducers: {
    setReadMarks(state, { payload }: PayloadAction<ReadMarkDto[]>) {
      const readMarksByChatId: State['readMarksByChatId'] = {};

      for (const readMark of payload) {
        readMarksByChatId[readMark.chatId] = readMark;
      }

      state.readMarksByChatId = readMarksByChatId;
    },

    setReadMark(state, { payload }: PayloadAction<ReadMarkDto>) {
      state.readMarksByChatId[payload.chatId] = payload;
    }
  },
});

export const {
  setReadMarks,
  setReadMark,
} = readMarks.actions;

export const fetchReadMarks = (): AppThunk => async (dispatch) => {
  const readMarks = await ReadMarksApi.getUserReadMarks();
  dispatch(setReadMarks(readMarks));
}

export const markLastReadMessage = (chatId: string, messageId: string): AppThunk => async (dispatch, getState) => {
  const { id: readMarkId, lastReadMessageId } = getState().readMarks.readMarksByChatId[chatId];

  if (messageId === lastReadMessageId) return;

  const updatedReadMark = await ReadMarksApi.markLastReadMessage(readMarkId, messageId);
  dispatch(setReadMark(updatedReadMark));
};

export default readMarks.reducer;
