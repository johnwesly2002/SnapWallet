import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import cardSlice from "./slices/cardSlice";
import LoginIdReducer from "./slices/LoginIdSlice";


const rootReducer = combineReducers({
    user: userReducer,
    CardAdd: cardSlice,
    LoginId: LoginIdReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;