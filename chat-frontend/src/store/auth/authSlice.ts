import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { UsersApi, AuthApi, HttpApi } from 'api';
import { SignInDto, SignUpDto } from 'api/types/auth';
import { UserDto } from 'api/types/users';

import { AppThunk } from 'store';
import { revokeSession } from 'store/settings/sessionsSlice';

interface State {
  user: UserDto | null;
}

const initialState: State = {
  user: null,
};

const auth = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCurrentUser(state, { payload }: PayloadAction<UserDto | null>) {
      state.user = payload;
    },

    clearCurrentUser(state) {
      state.user = null;
    }
  },
});

export const {
  setCurrentUser,
  clearCurrentUser
} = auth.actions;

export default auth.reducer;

export const fetchCurrentUser = (): AppThunk => async (dispatch) => {
  const user = await UsersApi.getCurrentUser();
  dispatch(setCurrentUser(user));
};

export const signIn = (credentials: SignInDto): AppThunk => async (dispatch) => {
  const authToken = await AuthApi.signIn(credentials);
  localStorage.setItem(HttpApi.AUTH_TOKEN_LOCAL_STORAGE_KEY, authToken);

  dispatch(fetchCurrentUser());
};

export const signUp = (credentials: SignUpDto): AppThunk => async (dispatch) => {
  const authToken = await AuthApi.signUp(credentials);
  localStorage.setItem(HttpApi.AUTH_TOKEN_LOCAL_STORAGE_KEY, authToken);

  dispatch(fetchCurrentUser());
};

export const signOut = (): AppThunk => async (dispatch) => {
  const sessionId = localStorage.getItem(HttpApi.AUTH_TOKEN_LOCAL_STORAGE_KEY)!;

  await dispatch(revokeSession(sessionId));

  localStorage.removeItem(HttpApi.AUTH_TOKEN_LOCAL_STORAGE_KEY)!;
  dispatch(clearCurrentUser());
};
