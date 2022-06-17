import { createSlice } from '@reduxjs/toolkit';
import { UserDefaultProfile } from '../../api/common';

const initialState = {
  role: '',
  email: '',
  specializations: [],
  background: [],
  profile: {
    fullname: UserDefaultProfile.fullname,
    avatar: UserDefaultProfile.avatar,
    gender: null,
    age: null,
    phone: null,
    address: null,
  },
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserProfile: (state, action) => {
      const { role, email, specializations, background, profile } = action.payload;

      state.role = role || state.role;
      state.email = email || state.email;
      state.specializations = specializations || state.specializations;
      state.background = background || state.background;
      state.profile =
        (profile && {
          fullname: profile.fullname || state.profile.fullname,
          avatar: profile.avatar || state.profile.avatar,
          gender: profile.fullname || state.profile.gender,
          age: profile.age || state.profile.age,
          phone: profile.phone || state.profile.phone,
          address: profile.address || state.profile.address,
        }) ||
        state.profile;
    },

    // eslint-disable-next-line no-unused-vars
    resetUserInfo: (state, action) => {
      state.role = initialState.role;
      state.email = initialState.email;
      state.specializations = initialState.specializations;
      state.background = initialState.background;
      state.profile = {
        ...initialState.profile,
      };
    },
  },
});

export const userActions = userSlice.actions;
export default userSlice.reducer;
