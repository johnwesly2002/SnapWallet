import { call, put, select, takeEvery } from "redux-saga/effects";
import { selectedLoginId } from "../slices/LoginIdSlice";
import { CountryFailure, CountryRequest, CountrySuccess } from "../slices/countrySlice";
import { getAllCurrencies, getCurrencyByUserId } from "../../services/countryService";
import { setcountryData } from "../slices/countrynameSlice";



function* handleCountryData(): Generator<any,void,any>{
    try{
        yield put(CountryRequest());
        const userId = yield select(selectedLoginId);
        console.log("handleCardsData userId",userId);
        const Countries = yield call(getCurrencyByUserId, userId)
        const currencyId = String(Countries[0]?._id);
        const currencyName = Countries[0]?.name;
        const currencySymbol = Countries[0]?.symbol;
        const currencyCode = Countries[0]?.code;
        const countryName = Countries[0]?.country;
        const currencyData = {
          currencyId,
          currencyName,
          currencySymbol,
          currencyCode,
          countryName,
        };
        yield put(setcountryData(currencyData));
        yield put(CountrySuccess(Countries));
        console.log("Successfully fetched Countries details", Countries);
    }catch(error: any){
        console.log("Error while fetching card Data");
        yield put(CountryFailure(error.message));
    }
}
export function* watchFetchCountryData() {
    yield takeEvery('FetchCountryData', handleCountryData);
  }