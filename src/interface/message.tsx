import { Participant } from "./display-chat";

interface Sender {
  _id: string;
  name: string;
  pic: string;
}

interface LatestMessage {
  _id?: string;
  sender?: User;
}

interface Chat {
  _id: string;
  chatName: string;
  isGroupChat: boolean;
  users: {
    participants: Participant;
    timestamps: string;
    _id: string;
  }[];
  createdAt: string;
  updatedAt: string;
  deleteBy: string[];
  latestMessage?: LatestMessage | undefined;
}

export interface MessageInfo {
  _id: string;
  sender: Sender;
  content: string;
  chat?: Chat;
  readBy: string[];
  deleteBy: string[];
  createdAt: string;
  updatedAt: string;
}


export interface Message {
  messages: MessageInfo[];
  page: number;
  totalPages: number;
  loading:boolean
}

interface User {
  _id: string;
  name: string;
  email: string;
  pic: string;
}

interface Chat {
  _id: string;
  chatName: string;
  isGroupChat: boolean;
  users: {
    participants: string;
    timestamps: string;
    _id: string;
  }[];
  deleteBy: string[];
  createdAt: string;
  updatedAt: string;
  latestMessage: string;
}

export interface MessageRecive {
  _id: string;
  sender: User;
  content: string;
  chat: Chat;
  readBy: string[];
  deleteBy: string[];
  createdAt: string;
  updatedAt: string;
}
