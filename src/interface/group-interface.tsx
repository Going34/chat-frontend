export interface Group {
    _id: string;
    chatName: string;
    isGroupChat: boolean;
    users: User[];
    deleteBy: string[];
    groupAdmin?: User;
    createdAt: string;
    updatedAt: string;
  }
  
  interface User {
    _id: string;
    participants: Participant;
    timestamps: string;
  }
  
  interface Participant {
    _id: string;
    name: string;
    email: string;
    phoneNumber: string;
    pic: string;
    isAdmin: boolean;
    timeStamp?: number;
    __v?: number;
  }
  