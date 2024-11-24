import React from "react";
import reducer from "./userSlice";
import { createSelector, createSlice } from "@reduxjs/toolkit";
import transactionGroups from "../../schemas/transactionGroups";

const initialState = {
    transactionGroupsDetails: [],
    loading: false,
    error: null,
}

const transactionGroupsSlice = createSlice({
    name: 'transactionGroups',
    initialState: initialState,
    reducers:{
        TransactionGroupsAddRequest: (state) => {
            state.loading = true;
            state.error = null;
        },
        TransactionGroupsAddSuccess: (state, action) => {
            state.transactionGroupsDetails = action.payload;
            state.loading = false;
            state.error = null;
        },
        TransactionGroupsFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    }
});
export const selectTransactionGroupsData = (state: { transactionGroups: any; }) => state.transactionGroups.transactionGroupsDetails;
export const selectActiveTransactionGroups = createSelector(
    [selectTransactionGroupsData],
    cardData =>
        cardData.filter(
        (cardData: transactionGroups) => cardData.status === true,
      ),
  );
export const {TransactionGroupsAddRequest, TransactionGroupsAddSuccess, TransactionGroupsFailure} = transactionGroupsSlice.actions;

export default transactionGroupsSlice.reducer;