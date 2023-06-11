import { ActionType, getType } from "typesafe-actions";
import { Message, MessageInfo } from "../../interface/message";
import { IApplicationState } from "../rootReducer";
import * as actions from "./action";

type IMessage = ActionType<typeof actions>;

export const messageReducer = (
  state: MessageInfo = {
    _id: "",
    sender: { _id: "", name: "", pic: "" },
    content: "",
    chat: undefined,
    readBy: [],
    deleteBy: [],
    createdAt: "",
    updatedAt: "",
  },
  action: IMessage
): MessageInfo => {
  switch (action.type) {
    case getType(actions.MessageSendAction.success):
      state = action.payload;

      return state;
    default:
      return state;
  }
};

export const getMessageReducer = (
  state: Message = {
    messages: [],
    page: 0,
    totalPages: 0,
    loading: false,
  },
  action: IMessage
): Message => {
  switch (action.type) {
    case getType(actions.GetMessageAction.request):
      if(action.payload.newChat)
      state = { messages: [], page: 0, totalPages: 0, loading:true };
      return state;
    case getType(actions.GetMessageAction.success):
      state = {...action.payload, loading:false, messages: [...action.payload.messages,...state.messages,]};
      return state;
    default:
      return state;
  }
};

export const selectMessage = (state: IApplicationState) => state.getMessage;

export const selectSendMessage = (state: IApplicationState) =>
  state.sendMessage;
