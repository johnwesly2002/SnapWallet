import { createSlice } from "@reduxjs/toolkit";
import React from "react";

const initialState = {
    expenseData: [],
    loading: false,
    error: null,
}
const expensesSlice = createSlice({
    name: 'expenses',
    initialState: initialState,
    reducers: {
        createExpensesRequest: (state) => {
            state.loading = true;
            state.error = null;
        },
        createExpensesSuccess: (state,action) => {
            state.expenseData  = action.payload;
            state.loading = false;
            state.error = null;
        },
        createExpensesFailure: (state,action) => {
            state.loading = false;
            state.error = action.payload;
        }
    }
});

export const selectedExpenses = (state: {expenses: any}) => state.expenses.expenseData;
export const {createExpensesRequest, createExpensesSuccess, createExpensesFailure} = expensesSlice.actions;
export default expensesSlice.reducer;