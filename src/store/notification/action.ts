import { createAsyncAction } from "typesafe-actions";
import { NotificationInfo } from "../../interface/notification";

export const NotificationGetAction = createAsyncAction(
  "NOTIFICATION_MESSAGE_REQUEST",
  "NOTIFICATION_MESSAGE_SUCCESS",
  "NOTIFICATION_MESSAGE_FAILURE"
)<{ token: string; chatId: string }, NotificationInfo[], Error>();
