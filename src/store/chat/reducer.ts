import { ActionType, getType } from "typesafe-actions";
import { AllChat } from "../../interface/display-chat";
import { IApplicationState } from "../rootReducer";
import * as actions from "./action";

type Chat = ActionType<typeof actions>;

export const intialState = [];

export const chatReducer = (
  state: AllChat[] = intialState,
  action: Chat
): AllChat[] => {
  switch (action.type) {
    case getType(actions.FetchAllActionChat.success):
      state = action.payload;
      return state;
    default:
      return state;
  }
};

export const createChatReducer = (
  state: AllChat = {
    _id: "",
    chatName: "",
    isGroupChat: false,
    users: [],
    groupAdmin: {},
    createdAt: "",
    updatedAt: "",
    deleteBy: [],
  },
  action: Chat
): AllChat => {
  switch (action.type) {
    case getType(actions.CreateChatAction.success):
      state = action.payload;
      return state;
    default:
      return state;
  }
};



export const selectCreateChatDetails = (state: IApplicationState) =>
  state.createChatWithTwo;

export const selectChatInfo = (state: IApplicationState) => state.allChat;
