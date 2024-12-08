import {createSlice} from '@reduxjs/toolkit';
import {RootState} from '../rootReducer';

const initialState = {
  currencyId: '',
  currencyName: '',
  currencyCode: '',
  currencySymbol: '',
  countryName: '',
};

const countryNameSlice = createSlice({
  name: 'countryName',
  initialState,
  reducers: {
    setcountryData: (state, action) => {
      console.log(action.payload);
      state.currencyId = action.payload.currencyId;
      state.countryName = action.payload.countryName;
      state.currencyName = action.payload.currencyName;
      state.currencyCode = action.payload.currencyCode;
      state.currencySymbol = action.payload.currencySymbol;
    },
  },
});
export const selectCurrencyId = (state: RootState) =>
    state.countryName.currencyId;
export const selectCountryName = (state: RootState) =>
  state.countryName.currencyName;
export const selectCurrencyCode = (state: RootState) =>
  state.countryName.currencyCode;
export const selectCurrencySymbol = (state: RootState) =>
  state.countryName.currencySymbol;
export const selectCountry = (state: RootState) =>
    state.countryName.countryName;
export const {setcountryData} = countryNameSlice.actions;

export default countryNameSlice.reducer;
