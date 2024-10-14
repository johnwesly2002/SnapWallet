import { call, put, select, takeEvery } from "redux-saga/effects";
import { TransactionGroupsAddRequest, TransactionGroupsAddSuccess } from "../slices/transactionGroupsSlice";
import { selectedLoginId } from "../slices/LoginIdSlice";
import { getTransactionGroupsById } from "../../services/transactionGroupsService";




function* handleTransactionGroupsData() : Generator<any,void,any>{
    try{
        yield put(TransactionGroupsAddRequest());
        const userId = yield select(selectedLoginId);
        console.log("handleTransactionGroups userId",userId);
        const Cards = yield call(getTransactionGroupsById, userId)
        yield put(TransactionGroupsAddSuccess(Cards));
        console.log("Successfully fetched TransactionGroups details", Cards);
    }catch(error){
        console.log("error while Fetching handleTransactionGroups");
    }
};
export function* watchFetchAllTransactionGroupsData() {
    yield takeEvery('FetchTransactionGroupsData', handleTransactionGroupsData);
  }