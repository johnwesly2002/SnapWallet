import { call, put, select, takeEvery } from "redux-saga/effects";
import { selectedLoginId } from "../slices/LoginIdSlice";
import { CountryFailure, CountryRequest, CountrySuccess } from "../slices/countrySlice";
import { getAllCurrencies, getCurrencyByUserId } from "../../services/countryService";



function* handleCountryData(): Generator<any,void,any>{
    try{
        yield put(CountryRequest());
        const userId = yield select(selectedLoginId);
        console.log("handleCardsData userId",userId);
        const Countries = yield call(getCurrencyByUserId, userId)
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