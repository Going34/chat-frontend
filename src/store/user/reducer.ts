import { ActionType, getType } from "typesafe-actions";
import * as actions from "./action";
import { IApplicationState } from "../rootReducer";
import { IUsers } from "./action";

type Search = ActionType<typeof actions>;

export const intialState = [];

export const searchReducer = (
  state: IUsers[] = intialState,
  action: Search
): IUsers[] => {
  switch (action.type) {
    case getType(actions.SearchAction.success):
      state = action.payload;
      return state;
    default:
      return state;
  }
};

export const selectSearch = (state:IApplicationState) => state.search


