import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  commingMessage: {
    _id: '',
    time: '',
    user: '',
    content: '',
    type: '',
  },
  latestMessage: {
    _id: '',
    room: '',
    user: '',
    content: '',
    type: '',
  },
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setLatestMessage: (state, action) => {
      state.latestMessage = action.payload;
    },
    setCommingMessage: (state, action) => {
      state.commingMessage = action.payload;
    },
  },
});

export const chatActions = chatSlice.actions;
export default chatSlice.reducer;
