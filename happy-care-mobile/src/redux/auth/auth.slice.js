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
    setLoggedInStatus: (state, action) => {
      state.isLoggedIn = action.payload;
    },
    setRegisterCredentials(state, action) {
      state.registerCredentials = action.payload;
    },
    setLoginCredentials(state, action) {
      state.loginCredentials = action.payload;
    },
    setLogout(state, action) {
      state.isLoggedIn = action.payload.isLoggedIn;
      state.registerCredentials = action.payload.registerCredentials;
      state.loginCredentials = action.payload.loginCredentials;
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
