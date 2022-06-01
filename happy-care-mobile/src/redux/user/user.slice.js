import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  email: '',
  age: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUsername(state, action) {
      state.username = action.payload;
    },
    setAge(state, action) {
      state.age = action.payload;
    },
  },
});

export const userActions = userSlice.actions;
export default userSlice.reducer;
