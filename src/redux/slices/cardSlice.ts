import { createSelector, createSlice } from "@reduxjs/toolkit";
import creditCard from "../../schemas/creditCardSchema";

const  initialState = {
    cardDetails: [],
    loading: false,
    error: null,
}

const cardSlice = createSlice({
    name: 'CardAdd',
    initialState: initialState,
    reducers: {
        CardAddRequest: (state) => {
            state.loading = true;
            state.error = null;
        },
        CardAddSuccess: (state, action) => {
            state.cardDetails = action.payload;
            state.loading = false;
            state.error = null;
        },
        CardAddFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
});
export const selectCardsData = (state: { CardAdd: any; }) => state.CardAdd.cardDetails;
export const selectActiveCards = createSelector(
    [selectCardsData],
    cardData =>
        cardData.filter(
        (cardData: creditCard) => cardData.cardStatus === true,
      ),
  );
export const {CardAddRequest, CardAddSuccess, CardAddFailure} = cardSlice.actions;

export default cardSlice.reducer;