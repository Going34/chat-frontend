import { ActionType, getType } from "typesafe-actions";
import { NotificationInfo } from "../../interface/notification";
import { IApplicationState } from "../rootReducer";
import * as actions from "./action";

type IMessage = ActionType<typeof actions>;

const intialstate = {
  _id: "",
  message: "",
  chat: "",
  recipient: "",
  messageIds: [],
  read: false,
  createdAt: "",
  updatedAt: "",
};

export const getNotificationReducer = (
  state: NotificationInfo = intialstate,
  action: IMessage
): NotificationInfo => {
  switch (action.type) {
    case getType(actions.NotificationGetAction.success):
      if (action.payload.length === 0) return intialstate;
      return action.payload[0]
    default:
      return state;
  }
};

export const selectNotification = (state: IApplicationState) => state.getNotification;

