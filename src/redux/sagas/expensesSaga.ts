import React from "react";
import { call, put, select, takeEvery } from "redux-saga/effects";
import { createExpensesFailure, createExpensesRequest, createExpensesSuccess } from "../slices/expensesSlice";
import { selectedLoginId } from "../slices/LoginIdSlice";
import { getExpensesData } from "../../services/expensesService";

function* handleExpensesData(): Generator<any,void,any> {
    try{
        yield put(createExpensesRequest());
        const userId = yield select(selectedLoginId);
        const expenseData = yield call(getExpensesData, userId);
        yield put(createExpensesSuccess(expenseData));
        console.log("expenseData",expenseData);
    }catch(error){
        console.log("error while handling the expenses");
        yield put(createExpensesFailure(error));
    }
}
export function* watchFetchExpensesData(){
    yield takeEvery('FetchExpensesData', handleExpensesData);
}