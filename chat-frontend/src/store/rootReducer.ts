import { combineReducers } from '@reduxjs/toolkit';

import auth, { clearCurrentUser } from './auth/authSlice';
import chats from './messenger/chatsSlice';
import messages from './messenger/messagesSlice';
import settings from './settings/settingsSlice';
import sessions from './settings/sessionsSlice';
import readMarks from './messenger/readMarksSlice';

const appReducer = combineReducers({
  auth,
  chats,
  messages,
  sessions,
  settings,
  readMarks,
});

const rootReducer = (state, action) => {
  if (action.type === clearCurrentUser.type) {
    state = undefined;
  }

  return appReducer(state, action);
}

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
