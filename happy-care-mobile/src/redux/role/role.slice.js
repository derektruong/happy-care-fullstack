import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  doctors: [],
  members: [],
};

const roleSlice = createSlice({
  name: 'role',
  initialState,
  reducers: {
    setDoctors: (state, action) => {
      const { doctors } = action.payload;
      state.doctors = doctors;
    },
    setMembers: (state, action) => {
      const { members } = action.payload;
      state.members = members;
    },
  },
});

export const roleActions = roleSlice.actions;
export default roleSlice.reducer;
