import React, { useEffect } from 'react';
import Card from 'react-bootstrap/Card';
// import Button from 'react-bootstrap/Button';
import '../../style/SubuserList.scss';
import { useSelector, useDispatch } from 'react-redux';
import { deleteSubuserAction, getAllSubusersAction } from '../../redux/Subuser/actions';
import { SUBUSER_LIST, SUBUSER_REDUCER, SUBUSER_DELETE_LOADING, SUBUSER_FULL_ACCESS } from '../../redux/Subuser/constants';
import { AUTH_REDUCER, USER } from '../../redux/Auth/constants';
import style from '../../style/Button.module.scss';
import isSubuserAccessible from '../../utils/isSubuserAccessible';
import { PERMISSIONS } from '../../redux/Permission/constants';

const SubuserList = () => {
  const dispatch = useDispatch();
  const state = useSelector(state => state);
  const subuserReducerState = state?.[SUBUSER_REDUCER];
  const authReducerState = state?.[AUTH_REDUCER];
  const subusers = subuserReducerState?.[SUBUSER_LIST];
  const isAccessible = isSubuserAccessible(SUBUSER_FULL_ACCESS, authReducerState?.[USER]?.[PERMISSIONS]?.permissions);
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
        return "No Permissions";
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
          {isAccessible ? <button className={style.btn} disabled={subuserReducerState?.[SUBUSER_DELETE_LOADING] === subuser._id} onClick={() => clickDeleteButton(subuser)}>{subuserReducerState?.[SUBUSER_DELETE_LOADING] === subuser._id ? 'Loading' : 'Delete'}</button> : null}
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
