import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  specs: [],
};

const specSlice = createSlice({
  name: 'spec',
  initialState,
  reducers: {
    setSpecs: (state, action) => {
      const { specs } = action.payload;
      state.specs = specs;
    },
  },
});

export const specActions = specSlice.actions;
export default specSlice.reducer;
