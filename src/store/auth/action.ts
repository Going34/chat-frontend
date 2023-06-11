import { createAsyncAction } from "typesafe-actions";


interface ILogin {
  email: string;
  password: string;
}

export interface IUser {
  _id:string;
  name: string;
  email: string;
  password: string;
  phoneNumber: string;
  pic: string;
  timeStamp: number;
  token: string;
}



export const RegisterAction = createAsyncAction(
  "CREATE_USER_ACTION_REQUEST",
  "CREATE_USER_ACTION_SUCCESS",
  "CREATE_USER_ACTION_FAILURE"
)<Partial<IUser>, IUser, Error>();


export const LoginAction = createAsyncAction(
  "LOGIN_ACTION_REQUEST",
  "LOGIN_ACTION_SUCCESS",
  "LOGIN_ACTION_FAILURE"
)<ILogin, IUser, Error>();

export const AutoLogin = createAsyncAction(
    "AUTO_LOGIN_ACTION_REQUEST",
    "AUTO_LOGIN_ACTION_SUCCESS",
    "AUTO_LOGIN_ACTION_FAILURE"
  )<undefined, undefined, Error>();

  export const LogOutAction = createAsyncAction(
    "LOGOUT_ACTION_REQUEST",
    "LOGOUT_ACTION_SUCCESS",
    "LOGOUT_ACTION_FAILURE"
  )<undefined, undefined, Error>();