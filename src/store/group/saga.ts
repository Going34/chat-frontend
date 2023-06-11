import axios from "axios";
import { all, put, takeLatest } from "redux-saga/effects";
import { ActionType, getType } from "typesafe-actions";
import {  GroupCreateAction } from "./action";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function* createGroup(parms: ActionType<typeof GroupCreateAction.request>) {
  try {
    const config = {
      headers: {
        "Content-type": "application/json",
        authorization: parms.payload.token,
      },
    };

    const { data } = yield axios.post(
      "https://chat-backend-ge69.onrender.com/chat/group",
      { ...parms.payload },
      config
    );

    yield put(GroupCreateAction.success(data));
    return;
  } catch (error) {
    console.log("first");
  }
}

// function* getMessage(parms: ActionType<typeof GetMessageAction.request>) {
//   try {
//     const config = {
//       headers: {
//         "Content-type": "application/json",
//         authorization: parms.payload.token,
//       },
//     };

//     const { data } = yield axios.get(
//       `https://chat-backend-ge69.onrender.com/message/recive/${parms.payload.chatId}`,
//       config
//     );

//     yield put(GetMessageAction.success(data));
//     return;
//   } catch (error) {
//     console.log("first");
//   }
// }

function* groupSaga() {
  yield all([
    takeLatest(getType(GroupCreateAction.request), createGroup)
  ]);
}

export default groupSaga;
