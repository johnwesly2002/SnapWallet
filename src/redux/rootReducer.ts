import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import cardSlice from "./slices/cardSlice";
import LoginIdReducer from "./slices/LoginIdSlice";
import transactionGroupsSlice from "./slices/transactionGroupsSlice";
import ExpensesSlice from './slices/expensesSlice';
import countrySlice from "./slices/countrySlice";
const rootReducer = combineReducers({
    user: userReducer,
    CardAdd: cardSlice,
    LoginId: LoginIdReducer,
    transactionGroups: transactionGroupsSlice,
    expenses: ExpensesSlice,
    country: countrySlice,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;