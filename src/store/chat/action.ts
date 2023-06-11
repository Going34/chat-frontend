import { createAsyncAction } from "typesafe-actions";
import { AllChat } from "../../interface/display-chat";

interface ISearch {
  token: string;
}

export interface ICreateChat {
  _id: string;
  chatName: string;
  isGroupChat: boolean;
  users: {
    participants: string;
    timestamps: string;
    _id: string;
  }[];
  createdAt: string;
  updatedAt: string;
  deleteBy: string[];
  latestMessage: string;
}

export const FetchAllActionChat = createAsyncAction(
  "FETCH_ALL_EXIST_CHAT_REQUEST",
  "FETCH_ALL_EXIST_CHAT_SUCCESS",
  "FETCH_ALL_EXIST_CHAT_FAILURE"
)<ISearch, AllChat[], Error>();

export const CreateChatAction = createAsyncAction(
  "CREATE_CHAT_REQUEST",
  "CREATE_CHAT_SUCCESS",
  "CREATE_CHAT_FAILURE"
)<ISearch & {userId:string}, AllChat, Error>();

