import axios from "axios";
import { put, takeLatest } from "redux-saga/effects";
import { ActionType } from "typesafe-actions";
import { SearchAction } from "./action";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function* fetchUser(parms: ActionType<typeof SearchAction.request>) {
  if (parms.payload.search.length !== 0) {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          authorization: parms.payload.token,
        },
      };

      const { data } = yield axios.post(
        "https://chat-backend-ge69.onrender.com/user/search",
        { phoneNumber: parms.payload.search },
        config
      );

      yield put(SearchAction.success(data));
      return;
    } catch (error) {
      console.log("first");
    }
  }
  else {
    yield put(SearchAction.success([]));
  }
}

function* searchSaga() {
  yield takeLatest(SearchAction.request, fetchUser);
}

export default searchSaga;
