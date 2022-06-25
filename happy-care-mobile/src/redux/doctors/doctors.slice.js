import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  doctorsBySpec: [],
};

const doctorsSlice = createSlice({
  name: 'doctorsBySpec',
  initialState,
  reducers: {
    setDoctors: (state, action) => {
      const { doctors } = action.payload;
      state.doctorsBySpec = doctors;
    },
  },
});

export const doctorsAction = doctorsSlice.actions;
export default doctorsSlice.reducer;
