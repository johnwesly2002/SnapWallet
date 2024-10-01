
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    users: [],
    loading: false,
    error: null,
};
const userSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {
       createUserRequest: (state) => {
        state.loading = true;
        state.error = null;
       },
       createUserSuccess: (state, action) => {
        state.users = action.payload;
        state.loading = false;
        state.error = null;
       },
       createUserFailure: (state, action) =>{
        state.loading = false;
        state.error = action.payload;
       },
    },
});
export const selectUserDetailsData = (state: { user: any; }) => state.user.users;
export const {createUserRequest, createUserSuccess, createUserFailure} = userSlice.actions;

export default userSlice.reducer;