import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { SessionsApi } from 'api';
import { SessionDto } from 'api/types/sessions';

import { AppThunk } from 'store';

interface State {
  sessions: SessionDto[];
  pendingRequests: {
    isLoadingList: boolean;
    [sessionId: string]: boolean;
  }
}

const initialState: State = {
  sessions: [],
  pendingRequests: {
    isLoadingList: false,
  },
};

const sessions = createSlice({
  name: 'sessions',
  initialState,
  reducers: {
    setSessionsListLoading(state) {
      state.pendingRequests.isLoadingList = true;
    },

    setSessionsListLoaded(state) {
      state.pendingRequests.isLoadingList = false;
    },

    setSessionsList(state, { payload }: PayloadAction<SessionDto[]>) {
      state.sessions = payload;
    },

    setSessionRequestPending(state, { payload: sessionId }: PayloadAction<string>) {
      state.pendingRequests[sessionId] = true;
    },

    setSessionRequestFinished(state, { payload: sessionId }: PayloadAction<string>) {
      state.pendingRequests[sessionId] = false;
    },

    removeSession(state, { payload: sessionToRemoveId }: PayloadAction<string>) {
      state.sessions = state.sessions.filter(session => session.id !== sessionToRemoveId);
    }
  },
});

export const {
  setSessionsList,
  setSessionsListLoaded,
  setSessionsListLoading,
  removeSession,
  setSessionRequestPending,
  setSessionRequestFinished,
} = sessions.actions;

export default sessions.reducer;

export const fetchUserSessions = (): AppThunk => async (dispatch) => {
  dispatch(setSessionsListLoading());

  const sessions = await SessionsApi.getUserSessions();
  dispatch(setSessionsList(sessions));

  dispatch(setSessionsListLoaded());
};

export const revokeSession = (sessionId: string): AppThunk => async (dispatch) => {
  dispatch(setSessionRequestPending(sessionId));

  await SessionsApi.logoutAll([sessionId]);
  dispatch(removeSession(sessionId));

  dispatch(setSessionRequestFinished(sessionId));
};
