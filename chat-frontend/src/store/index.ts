import { configureStore, Action } from '@reduxjs/toolkit';
import { ThunkAction } from 'redux-thunk';
import { useDispatch as useReduxDispatch, useSelector as useReduxSelector, TypedUseSelectorHook } from 'react-redux';

import rootReducer, { RootState } from './rootReducer';

export const createStore = (preloadedState) => configureStore({
  reducer: rootReducer,
  preloadedState
});

type store = ReturnType<typeof createStore>;

export type StoreState = ReturnType<store['getState']>;
export type AppDispatch = store['dispatch'];
export type AppThunk<T = void> = ThunkAction<T, RootState, null, Action<string>>;

export const useSelector: TypedUseSelectorHook<StoreState> = useReduxSelector;
export const useDispatch = (): AppDispatch => useReduxDispatch();
