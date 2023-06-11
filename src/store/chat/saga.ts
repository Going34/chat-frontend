import axios from "axios";
import { all, put, takeLatest } from "redux-saga/effects";
import { ActionType, getType } from "typesafe-actions";
import { CreateChatAction, FetchAllActionChat } from "./action";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function* fetchChat(parms: ActionType<typeof FetchAllActionChat.request>) {
  try {
    const config = {
      headers: {
        "Content-type": "application/json",
        authorization: parms.payload.token,
      },
    };

    const { data } = yield axios.get("https://chat-backend-ge69.onrender.com/chat/", config);

    yield put(FetchAllActionChat.success(data));
    return;
  } catch (error) {
    console.log("first");
  }
}

function* createChat(parms: ActionType<typeof CreateChatAction.request>) {
  try {
    const config = {
      headers: {
        "Content-type": "application/json",
        authorization: parms.payload.token,
      },
    };

    const { data } = yield axios.post(
      "https://chat-backend-ge69.onrender.com/chat/",
      { ...parms.payload },
      config
    );

    yield put(CreateChatAction.success(data));
    return;
  } catch (error) {
    console.log("first");
  }
}

function* chatSaga() {
  yield all([
    takeLatest(getType(FetchAllActionChat.request), fetchChat),
    takeLatest(getType(CreateChatAction.request), createChat),
  ]);
}

export default chatSaga;
