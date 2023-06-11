import { createAsyncAction } from "typesafe-actions";
import {  MessageRecive } from "../../interface/message";
import { Group } from "../../interface/group-interface";

interface IGroup{
  chatName:string;
  group:string;
  token:string;
}



export const GroupCreateAction = createAsyncAction(
  "CREATE_GROUP_REQUEST",
  "CREATE_GROUP_SUCCESS",
  "CREATE_GROUP_FAILURE"
)<IGroup, Group, Error>();

export const GetMessageAction = createAsyncAction(
  "ADD_NEW_USER_IN_GROUP_REQUEST",
  "ADD_NEW_USER_IN_GROUP_SUCCESS",
  "ADD_NEW_USER_IN_GROUP_FAILURE"
)<{userId:string, groupId:string}, MessageRecive[], Error>();

