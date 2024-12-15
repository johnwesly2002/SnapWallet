import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../rootReducer";

const initialState = {
    isRegister: false,
}

const isRegisterSlice = createSlice({
    initialState: initialState,
    name: "isRegister",
    reducers : {
        setIsRegister: (state,action) => {
            state.isRegister = action.payload;
        },
    }
});
export const selectIsRegistered = (state: RootState) => state.userRegistration.isRegister;
export const {setIsRegister} = isRegisterSlice.actions;
export default isRegisterSlice.reducer;