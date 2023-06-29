import React, { useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import '../../style/SubuserList.scss';
import { useSelector, useDispatch } from 'react-redux';
import { getAllSubusersAction } from '../../redux/Subuser/actions';
import { SUBUSER_LIST, SUBUSER_REDUCER } from '../../redux/Subuser/constants';
import { AUTH_REDUCER, USER } from '../../redux/Auth/constants';

const SubuserList = () => {
  const dispatch = useDispatch();
  const state = useSelector(state => state);
  const subuserReducerState = state?.[SUBUSER_REDUCER];
  const authReducerState = state?.[AUTH_REDUCER];
  const subusers = subuserReducerState?.[SUBUSER_LIST];
  const list = () => {
    if (!subusers?.length) {
      return <div>No Sub-users</div>
    }
    const l = subusers?.map(subuser => {
      return <li key={subuser?._id}>{subuser?.email}</li>
    });
    return <ul>{l}</ul>
  }
  // console.log("authReducerState._id=>", authReducerState?.[USER]?._id);
  useEffect(() => {
    dispatch(getAllSubusersAction(authReducerState?.[USER]?._id));
  }, [dispatch, authReducerState]);
  return (
    <div>
      subuser list
      {list()}
    </div>
  )
}

export default SubuserList
