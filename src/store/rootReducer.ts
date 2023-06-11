import { combineReducers } from "redux";
import { authReducer } from "./auth/reducer";
import { searchReducer } from "./user/reducer";
import { chatReducer, createChatReducer } from "./chat/reducer";
import { getMessageReducer, messageReducer } from "./message/reducer";
import { groupReducer } from "./group/reducer";
import { getNotificationReducer } from "./notification/reducer";

const rootReducer = combineReducers({
   auth: authReducer,
   search:searchReducer,
   allChat: chatReducer,
   sendMessage: messageReducer,
   getMessage: getMessageReducer,
   createGroup: groupReducer,
   createChatWithTwo: createChatReducer,
   getNotification: getNotificationReducer,
  });
  
  export type IApplicationState = ReturnType<typeof rootReducer>;
  
  export default rootReducer;