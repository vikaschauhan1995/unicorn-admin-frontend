import { ADD_SUB_USER_ACTION } from "./constants";




export function addSubUserAction(subuser) {
  return {
    type: ADD_SUB_USER_ACTION,
    payload: subuser
  }
}