import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import cardSlice from "./slices/cardSlice";
import LoginIdReducer from "./slices/LoginIdSlice";
import transactionGroupsSlice from "./slices/transactionGroupsSlice";
import ExpensesSlice from './slices/expensesSlice';
import countrySlice from "./slices/countrySlice";
import userNameReducer from "./slices/usernameSlice";
import countryNameReducer from "./slices/countrynameSlice";
import profilePicReducer from "./slices/userPictureSlice";
import isRegisterReducer from './slices/registerSlice';
const rootReducer = combineReducers({
    user: userReducer,
    CardAdd: cardSlice,
    LoginId: LoginIdReducer,
    userName: userNameReducer,
    ProfilePic: profilePicReducer,
    countryName: countryNameReducer,
    userRegistration: isRegisterReducer,
    transactionGroups: transactionGroupsSlice,
    expenses: ExpensesSlice,
    country: countrySlice,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;