import { createAsyncAction } from "typesafe-actions";
import { Message, MessageInfo } from "../../interface/message";

interface IMessage {
  content: string;
  chatId: string;
  token: string;
}

interface IGetMessage {
  chatId: string | undefined;
  token: string;
  pageNumber: number;
  pageSize: number;
  newChat:boolean
}

export const MessageSendAction = createAsyncAction(
  "SEND_MESSAGE_REQUEST",
  "SEND_MESSAGE_SUCCESS",
  "SEND_MESSAGE_FAILURE"
)<IMessage, MessageInfo, Error>();

export const GetMessageAction = createAsyncAction(
  "GET_MESSAGE_REQUEST",
  "GET_MESSAGE_SUCCESS",
  "GET_MESSAGE_FAILURE"
)<IGetMessage, Message, Error>();
