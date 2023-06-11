export interface Participant {
  _id: string;
  name: string;
  email: string;
  phoneNumber: string;
  pic: string;
  isAdmin: boolean;
  timeStamp: number;
  __v?: number;
}

interface Message {
  _id: string;
  sender: {
    _id: string;
    name: string;
    email: string;
    pic: string;
  };
  content: string;
  chat: string;
  readBy: string[];
  deleteBy: string[];
  createdAt: string;
  updatedAt: string;
}

export interface AllChat {
  _id: string;
  chatName: string;
  groupAdmin:Participant
  isGroupChat: boolean;
  pic:string;
  users: {
    participants: Participant;
    timestamps: string;
    _id: string;
  }[];
  createdAt: string;
  updatedAt: string;
  deleteBy?: string[];
  latestMessage?: Message;
}
