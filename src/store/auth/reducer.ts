import { ActionType, getType } from "typesafe-actions";
import { IUser } from "./action";
import * as actions from "./action";
import { IApplicationState } from "../rootReducer";

type Auth = ActionType<typeof actions>;

const intialState = {
  _id:"",
  name: "",
  email: "",
  password: "",
  phoneNumber: "",
  pic: "",
  timeStamp: 0,
  token: "",
};

export const authReducer = (
  state: IUser = intialState,
  action: Auth
): IUser => {
  switch (action.type) {
    case getType(actions.LogOutAction.request):
      state = intialState
      return state
    case getType(actions.LoginAction.success):
      state = action.payload;
      return state;
    default:
      return state;
  }
};

export const selectAuth = (state:IApplicationState) => state.auth


