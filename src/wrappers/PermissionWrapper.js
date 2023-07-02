import React from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { AUTH_REDUCER, USER } from '../redux/Auth/constants';
import { PERMISSIONS } from '../redux/Permission/constants';
import getActiveComponents from '../utils/getActiveComponents';
import isRouteAccessible from '../utils/isRouteAccessible';

const PermissionWrapper = ({ user_type, children }) => {
  const location = useLocation();
  const authReducerState = useSelector(state => state);

  const allPermissionObjects = authReducerState?.[AUTH_REDUCER]?.[USER]?.[PERMISSIONS];
  const allActiveComponents = getActiveComponents(allPermissionObjects);
  allActiveComponents.push("");
  const isAccessible = isRouteAccessible(location.pathname, allActiveComponents, user_type);
  // console.log("user_type=>", user_type)
  if (isAccessible) {
    return (
      <>
        {children}
      </>
    )
  } else {
    return (
      <Navigate to="/" />
    );
  }
}

export default PermissionWrapper
