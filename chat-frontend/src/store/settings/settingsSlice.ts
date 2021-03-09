import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { SettingsSection } from './types';

interface State {
  selectedSection: SettingsSection;
}

const initialState: State = {
  selectedSection: SettingsSection.Account,
};

const settings = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setSelectedSection(state, { payload }: PayloadAction<SettingsSection>) {
      state.selectedSection = payload;
    },
  },
});

export const {
  setSelectedSection
} = settings.actions;

export default settings.reducer;
