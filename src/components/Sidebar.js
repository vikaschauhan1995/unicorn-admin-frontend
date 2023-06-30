import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AUTH_REDUCER, USER } from '../redux/Auth/constants';
import { Link } from 'react-router-dom';
import getActiveComponents from '../utils/getActiveComponents';

const ORDER_PAGE_OBJ = { key: 'order', title: 'Orders' };
const SUB_USER_PAGE_OBJ = { key: 'subuser', title: 'Sub-Users' };
const PRODUCT_PAGE_OBJ = { key: 'product', title: 'Products' };

const page_objs = [ORDER_PAGE_OBJ, SUB_USER_PAGE_OBJ, PRODUCT_PAGE_OBJ];

const makeSidebarList = (componentsArray) => {
  const provideTitleToPage = page_objs.filter(item => {
    if (componentsArray.includes(item.key)) {
      return item;
    }
  });
  return provideTitleToPage;
}

const Sidebar = () => {
  // const dispatch = useDispatch();
  const authState = useSelector(state => state[AUTH_REDUCER]);
  const permissions = authState?.[USER].permissions ? authState?.[USER].permissions : [];
  const components = getActiveComponents(permissions);
  const sidebarObjList = makeSidebarList(components);
  const sidebarList = sidebarObjList.map(item => {
    return <div key={item.key}><Link to={`/${item.key}`}>{item.title}</Link></div>
  });
  return (
    <div>
      {sidebarList}
    </div>
  )
}

export default Sidebar
