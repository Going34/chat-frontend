import { all } from "@redux-saga/core/effects";
import authSaga from "./auth/saga";
import searchSaga from "./user/saga";
import chatSaga from "./chat/saga";
import sendMessageSaga from "./message/saga";
import groupSaga from "./group/saga";
import notificationSaga from "./notification/saga";


export default function* rootSaga() {
  yield all([
   authSaga(),
   searchSaga(),
   chatSaga(),
   sendMessageSaga(),
   groupSaga(),
   notificationSaga()
  ]);
}