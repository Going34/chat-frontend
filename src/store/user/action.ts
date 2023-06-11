import { createAsyncAction } from "typesafe-actions";
import { IUser } from "../auth/action";

interface ISearch {
  search: string;
  token: string;
}

export interface IUsers extends IUser {
  _id: string;
}

export const SearchAction = createAsyncAction(
  "SEARCH_USER_REQUEST",
  "SEARCH_USER_SUCCESS",
  "SEARCH_USER_FAILURE"
)<ISearch, IUsers[], Error>();
