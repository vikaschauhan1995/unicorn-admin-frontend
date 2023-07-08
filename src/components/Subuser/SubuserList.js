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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRotateRight } from "@fortawesome/free-solid-svg-icons";

import Box from '@mui/material/Box';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';




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
      const list = array.map((permission, index) => {
        return <span className="Subuser_list_permission_item mx-1 px-2 py-1">{permission?.key}</span>
      });
      return <div>{list}</div>;
    }
    const l = subusers?.map(subuser => {
      return <Card key={subuser?._id} className="my-2">
        <CardContent>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            <Card.Title>{subuser?.email}</Card.Title>
          </Typography>
          <Card.Text>{permissionsList(subuser?.[PERMISSIONS]?.[0]?.permissions)}</Card.Text>
          <div>
            <Button variant="contained" color="error" className={style.btn} disabled={!isAccessible ? true : subuserReducerState?.[SUBUSER_DELETE_LOADING] === subuser._id} onClick={() => clickDeleteButton(subuser)}>{subuserReducerState?.[SUBUSER_DELETE_LOADING] === subuser._id ? 'Loading' : 'Delete'}</Button>
          </div>
        </CardContent>
      </Card>
    });
    return l;
  }
  const clickRefreshButton = () => {
    dispatch(getAllSubusersAction(authReducerState?.[USER]?._id));
  }
  // console.log("subuserReducerState=>", subuserReducerState);
  useEffect(() => {
    dispatch(getAllSubusersAction(authReducerState?.[USER]?._id));
  }, [dispatch, authReducerState]);
  return (
    <div>
      <strong>Sub-User List:</strong> <Button onClick={() => clickRefreshButton()}>
        <FontAwesomeIcon icon={faArrowRotateRight} />
      </Button>refresh
      {list()}
    </div>
  )
}

export default SubuserList
