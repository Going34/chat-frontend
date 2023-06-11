import { ActionType, getType } from "typesafe-actions";
import { Group } from "../../interface/group-interface";
import { IApplicationState } from "../rootReducer";
import * as actions from "./action";

type IGroup = ActionType<typeof actions>;

export const groupReducer = (
  state: Group = {
    _id: "",
    chatName: "",
    isGroupChat: true,
    users: [],
    deleteBy: [],
    createdAt: "",
    updatedAt: "",
  },
  action: IGroup
): Group => {
  switch (action.type) {
    case getType(actions.GroupCreateAction.success):
      state = action.payload;
      return state;
    default:
      return state;
  }
};

// export const getMessageReducer = (
//   state: MessageRecive[] = [],
//   action: IMessage
// ): MessageRecive[] => {
//   switch (action.type) {
//     case getType(actions.GetMessageAction.success):
//       state = action.payload;
//       return state;
//     default:
//       return state;
//   }
// };

export const selectGroup = (state: IApplicationState) => state.createGroup;
