import React, { useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import Button from '@mui/material/Button';
import '../../style/SubuserList.scss';
import { useSelector, useDispatch } from 'react-redux';
import { deleteSubuserAction, getAllSubusersAction } from '../../redux/Subuser/actions';
import { SUBUSER_LIST, SUBUSER_REDUCER, SUBUSER_DELETE_LOADING, SUBUSER_FULL_ACCESS, USER_TYPE } from '../../redux/Subuser/constants';
import { AUTH_REDUCER, USER } from '../../redux/Auth/constants';
import style from '../../style/Button.module.scss';
import isUserAccessible from '../../utils/isUserAccessible';
import { PERMISSIONS } from '../../redux/Permission/constants';

const SubuserList = () => {
  const dispatch = useDispatch();
  const state = useSelector(state => state);
  const subuserReducerState = state?.[SUBUSER_REDUCER];
  const authReducerState = state?.[AUTH_REDUCER];
  const subusers = subuserReducerState?.[SUBUSER_LIST];
  const isAccessible = isUserAccessible(SUBUSER_FULL_ACCESS, authReducerState?.[USER]?.[PERMISSIONS]?.permissions, authReducerState?.[USER]?.[USER_TYPE]);
  const clickDeleteButton = (subuser) => {
    dispatch(deleteSubuserAction(subuser));
    // console.log("subuser=>", subuser);
  }
  const list = () => {
    if (!subusers?.length) {
      return <div>No Sub-users</div>
    }
    const permissionsList = (array) => {
      if (!array?.length) {
        return "You can't see the permissions of subusers";
      }
      let permissionsString = "";
      array.forEach((permission, index) => {
        permissionsString += permission?.key;
        if (!(array.length <= 1) && index !== array.length - 1) {
          permissionsString += ", ";
        }
      });
      return permissionsString;
    }
    const l = subusers?.map(subuser => {
      return <Card key={subuser?._id}>
        <Card.Title>{subuser?.email}</Card.Title>
        <Card.Text>{permissionsList(subuser?.[PERMISSIONS]?.[0]?.permissions)}</Card.Text>
        <div>
          <Button variant="contained" color="error" className={style.btn} disabled={!isAccessible ? true : subuserReducerState?.[SUBUSER_DELETE_LOADING] === subuser._id} onClick={() => clickDeleteButton(subuser)}>{subuserReducerState?.[SUBUSER_DELETE_LOADING] === subuser._id ? 'Loading' : 'Delete'}</Button>
        </div>
      </Card>
    });
    return l;
  }
  // console.log("subuserReducerState=>", subuserReducerState);
  useEffect(() => {
    dispatch(getAllSubusersAction(authReducerState?.[USER]?._id));
  }, [dispatch, authReducerState]);
  return (
    <div>
      <strong>Sub-User List</strong>
      {list()}
    </div>
  )
}

export default SubuserList
