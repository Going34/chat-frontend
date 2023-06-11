export interface NotificationInfo {
  _id: string;
  message: string;
  chat: string;
  recipient: string;
  messageIds: string[];
  read: boolean;
  createdAt: string;
  updatedAt: string;
}
