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
  let routeRemovedPath = location?.pathname?.substr(1, location.pathname.length);
  try {
    const l = routeRemovedPath.split("/");
    if (l.length > 1) {
      routeRemovedPath = l[0];
    }
  } catch (error) {
    throw Error("Error: " + error.message);
  }
  const isAccessible = isRouteAccessible(routeRemovedPath, allActiveComponents, user_type);
  // console.log("routeRemovedPath, allActiveComponents, isAccessible=>", routeRemovedPath, allActiveComponents, isAccessible);
  if (isAccessible) {
    return (
      <>
        {children}
      </>
    )
  } else {
    console.log("location.pathname, allActiveComponents, user_type=>", location.pathname, allActiveComponents, user_type)
    return (
      <Navigate to="/" />
    );
  }
}

export default PermissionWrapper
