import {createSlice} from '@reduxjs/toolkit';
import {RootState} from '../rootReducer';

const initialState = {
  profilePic: '',
};

const userPictureSlice = createSlice({
  name: 'profilePic',
  initialState,
  reducers: {
    setprofilePic: (state, action) => {
      state.profilePic = action.payload;
    },
  },
});

export const selectprofilePic = (state: RootState) => state.ProfilePic.profilePic;

export const {setprofilePic} = userPictureSlice.actions;

export default userPictureSlice.reducer;
