import { createSlice } from '@reduxjs/toolkit';

const initialState = {
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
  },
});

export const chatActions = chatSlice.actions;
export default chatSlice.reducer;
