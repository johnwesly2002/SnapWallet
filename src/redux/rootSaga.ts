import { all } from "redux-saga/effects";
import watchUserCreation from "./sagas/userSaga";
import { watchFetchAllCardsData } from "./sagas/cardAddSaga";
import { watchFetchAllTransactionGroupsData } from "./sagas/transactionGroupsSaga";
import { watchFetchExpensesData } from "./sagas/expensesSaga";
import { watchFetchCountryData } from "./sagas/countrySaga";


export default function* rootSaga() {
    yield all([
        watchUserCreation(),
        watchFetchAllCardsData(),
        watchFetchAllTransactionGroupsData(),
        watchFetchExpensesData(),
        watchFetchCountryData(),
    ]);
};