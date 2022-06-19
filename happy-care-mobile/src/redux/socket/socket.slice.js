import { createSlice } from '@reduxjs/toolkit';
import { Logger } from '../../api/common';

const initialState = {
  isConnected: false,
  joinData: {},
  onlineUsers: {},
  onlineDoctors: [],
  onlineMembers: {},
  numOfUsers: 0,
  numOfDoctors: 0,
  numOfMembers: 0,
  socketRooms: 0,
};

const socketSlice = createSlice({
  name: 'socket',
  initialState,
  reducers: {
    connectApp: (state, action) => {
      state.isConnected = action.payload;
      Logger.Info('Websocket connected to server');
    },

    setOnlineDoctors: (state, action) => {
      state.onlineDoctors = action.payload;
    },
  },
});

export const socketActions = socketSlice.actions;
export default socketSlice.reducer;
