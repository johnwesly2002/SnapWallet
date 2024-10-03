import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../rootReducer";



const initialState = {
    userId: '',
};

const LoginIdSlice = createSlice({
    name: 'LoginId',
    initialState: initialState,
    reducers: {
        setLoginId: (state, action) => {
            state.userId = action.payload;
        }
    }
});

export const selectedLoginId = (state: RootState) => state.LoginId.userId;

export const {setLoginId} = LoginIdSlice.actions;

export default LoginIdSlice.reducer;