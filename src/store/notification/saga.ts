import axios from "axios";
import { all, put, takeLatest } from "redux-saga/effects";
import { ActionType, getType } from "typesafe-actions";
import { NotificationGetAction } from "./action";
import { NotificationInfo } from "../../interface/notification";


// eslint-disable-next-line @typescript-eslint/no-unused-vars
function* getNotification(parms: ActionType<typeof NotificationGetAction.request>) {
  try {
    const config = {
      headers: {
        "Content-type": "application/json",
        authorization: parms.payload.token,
      },
    };

    const { data }:{data:NotificationInfo[]} = yield axios.get(
      `https://chat-backend-ge69.onrender.com/notification/${parms.payload.chatId}`,
      config
    );

    yield put(NotificationGetAction.success(data));
    return;
  } catch (error) {
    console.log("first");
  }
}


function* notificationSaga() {
  yield all([
    takeLatest(getType(NotificationGetAction.request), getNotification),
  ]);
}

export default notificationSaga;
