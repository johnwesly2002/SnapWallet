import { all } from "redux-saga/effects";
import watchUserCreation from "./sagas/userSaga";


export default function* rootSaga() {
    yield all([
        watchUserCreation(),
    ]);
};