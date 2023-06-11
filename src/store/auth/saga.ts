import axios from "axios";
import { all, put, takeLatest } from "redux-saga/effects";
import { ActionType, getType } from "typesafe-actions";
import { AutoLogin, RegisterAction, IUser, LoginAction } from "./action";

// eslint-disable-next-line @typescript-eslint/no-unused-vars

function* createUser(parms: ActionType<typeof RegisterAction.request>) {
  try {
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    const data: { data: IUser } = yield axios.post(
      "https://chat-backend-ge69.onrender.com/user/register",
      { ...parms.payload, phoneNumber:parms.payload.phoneNumber },
      config
    );
      if(data.data.token)
    localStorage.setItem("chatToken", data.data.token);

    yield put(LoginAction.success(data.data));
    return;
  } catch (error) {
    console.log("first");
  }
}


function* loginUser(parms: ActionType<typeof LoginAction.request>) {
  try {
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    const data: { data: IUser } = yield axios.post(
      "https://chat-backend-ge69.onrender.com/user/login",
      { ...parms.payload },
      config
    );
      if(data.data.token)
    localStorage.setItem("chatToken", data.data.token);

    yield put(LoginAction.success(data.data));
    return;
  } catch (error) {
    console.log("first");
  }
}

function* autoLoginUser() {
  const token = localStorage.getItem("chatToken");
  console.log(token, "token");
  if (token) {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          authorization: `${token}`,
        },
      };

      const { data } = yield axios.post(
        "https://chat-backend-ge69.onrender.com/user/autologin",
        { token: token },
        config
      );

      yield put(LoginAction.success(data));
      return;
    } catch (error) {
      console.log(error);
    }
  }
}

function* authSaga() {
  yield all([
    takeLatest(getType(LoginAction.request), loginUser),
    takeLatest(getType(AutoLogin.request), autoLoginUser),
    takeLatest(getType(RegisterAction.request),createUser)
  ]);
}

export default authSaga;
