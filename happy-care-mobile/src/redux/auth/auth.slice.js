import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  registerCredentials: {},
  loginCredentials: {},
  isLoggedIn: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setRegisterCredentials(state, action) {
      state.registerCredentials = action.payload;
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
