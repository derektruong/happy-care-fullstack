import { createSlice } from '@reduxjs/toolkit';
import { ScreenName, UiStatus } from '../../api/common';

const initialState = { currentScreen: ScreenName.login, notification: {} };

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    navigateScreen: (state, action) => {
      state.currentScreen = action.payload;
    },

    showSuccessUI: (state, action) => {
      state.notification = {
        status: UiStatus.success,
        title: action.payload.title,
        message: action.payload.message,
      };
    },

    showLoadingUI: (state, action) => {
      state.notification = {
        status: UiStatus.loading,
        title: action.payload.title,
        message: action.payload.message,
      };
    },

    showErrorUI: (state, action) => {
      state.notification = {
        status: UiStatus.error,
        title: action.payload.title,
        message: action.payload.message,
      };
    },
  },
});

export const uiActions = uiSlice.actions;
export default uiSlice.reducer;
