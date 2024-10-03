import { call, put, select, takeEvery } from "redux-saga/effects";
import { CardAddFailure, CardAddRequest, CardAddSuccess } from "../slices/cardSlice";
import { getAllCardsByUserId } from "../../services/cardService";
import { selectedLoginId } from "../slices/LoginIdSlice";



function* handleCardsData(): Generator<any,void,any>{
    try{
        yield put(CardAddRequest());
        const userId = yield select(selectedLoginId);
        console.log("handleCardsData userId",userId);
        const Cards = yield call(getAllCardsByUserId, userId)
        yield put(CardAddSuccess(Cards));
        console.log("Successfully fetched card details", Cards);
    }catch(error: any){
        console.log("Error while fetching card Data");
        yield put(CardAddFailure(error.message));
    }
}
export function* watchFetchAllCardsData() {
    yield takeEvery('FetchCardData', handleCardsData);
  }