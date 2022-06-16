import { configureStore } from '@reduxjs/toolkit';
import uiReducer from './ui/ui.slice';
import socketReducer from './socket/socket.slice';
import authReducer from './auth/auth.slice';
import userReducer from './user/user.slice';

const store = configureStore({
  reducer: {
    ui: uiReducer,
    socket: socketReducer,
    auth: authReducer,
    user: userReducer,
  },
});

export default store;
