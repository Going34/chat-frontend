import axios from "axios";
import { all, put, takeLatest } from "redux-saga/effects";
import { ActionType, getType } from "typesafe-actions";
import { GetMessageAction, MessageSendAction } from "./action";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function* sendMessage(parms: ActionType<typeof MessageSendAction.request>) {
  try {
    const config = {
      headers: {
        "Content-type": "application/json",
        authorization: parms.payload.token,
      },
    };

    const { data } = yield axios.post(
      "https://chat-backend-ge69.onrender.com/message/send",
      { ...parms.payload },
      config
    );

    yield put(MessageSendAction.success(data));
    return;
  } catch (error) {
    console.log("first");
  }
}

function* getMessage(parms: ActionType<typeof GetMessageAction.request>) {
  try {
    const config = {
      headers: {
        "Content-type": "application/json",
        authorization: parms.payload.token,
      },
    };


    const { data } = yield axios.get(
      `https://chat-backend-ge69.onrender.com/message/recive/${parms.payload.chatId}?page=${parms.payload.pageNumber}&limit=${parms.payload.pageSize}`,
      config
    );
    console.log(data,"get");
    yield put(GetMessageAction.success(data));
    return;
  } catch (error) {
    yield put(GetMessageAction.success({messages: Array(0), page: 0, totalPages: 0, loading: false}));
  }
}

function* sendMessageSaga() {
  yield all([
    takeLatest(getType(MessageSendAction.request), sendMessage),
    takeLatest(getType(GetMessageAction.request), getMessage),
  ]);
}

export default sendMessageSaga;
