import { createSelector, createSlice } from "@reduxjs/toolkit";
import Country from "../../schemas/countryScehma";
const  initialState = {
    countryDetails: [],
    loading: false,
    error: null,
}

const countrySlice = createSlice({
    name: 'country',
    initialState: initialState,
    reducers: {
        CountryRequest: (state) => {
            state.loading = true;
            state.error = null;
        },
        CountrySuccess: (state, action) => {
            state.countryDetails = action.payload;
            state.loading = false;
            state.error = null;
        },
        CountryFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    }
});

export const selectCountryData = (state: { country: any; }) => state.country.countryDetails;
export const {CountryRequest, CountrySuccess, CountryFailure} = countrySlice.actions;
export default countrySlice.reducer;