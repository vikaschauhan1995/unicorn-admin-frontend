import { ADD_SUB_USER_ACTION, GET_ALL_SUB_USERS_ACTION, DELETE_SUBUSER_ACTION } from "./constants";




export function addSubUserAction(subuser) {
  return {
    type: ADD_SUB_USER_ACTION,
    payload: subuser
  }
}

export function getAllSubusersAction(_id) {
  return {
    type: GET_ALL_SUB_USERS_ACTION,
    payload: _id
  }
}

export function deleteSubuserAction(subuser) {
  return {
    type: DELETE_SUBUSER_ACTION,
    payload: subuser
  }
}