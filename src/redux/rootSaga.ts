import { all } from "redux-saga/effects";
import watchUserCreation from "./sagas/userSaga";
import { watchFetchAllCardsData } from "./sagas/cardAddSaga";


export default function* rootSaga() {
    yield all([
        watchUserCreation(),
        watchFetchAllCardsData(),
    ]);
};