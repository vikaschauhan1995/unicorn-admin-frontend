import '../style/Sidebar.scss';
import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';


import { useSelector } from 'react-redux';
import { AUTH_REDUCER, USER } from '../redux/Auth/constants';
import { Link } from 'react-router-dom';
import getActiveComponents from '../utils/getActiveComponents';
import { USER_TYPE } from '../redux/Subuser/constants';

const ORDER_PAGE_OBJ = { key: 'orders', title: 'Orders' };
const SUB_USER_PAGE_OBJ = { key: 'subuser', title: 'Sub-Users' };
const PRODUCT_PAGE_OBJ = { key: 'product', title: 'Products' };
const INVENTORY_PAGE_OBJ = { key: 'inventory', title: 'Inventory' };

const all_page_objs = [ORDER_PAGE_OBJ, SUB_USER_PAGE_OBJ, PRODUCT_PAGE_OBJ, INVENTORY_PAGE_OBJ];

const makeSidebarList = (componentsArray, user_type) => {
  if (user_type === "root") {
    return all_page_objs;
  }
  const provideTitleToPage = all_page_objs.filter(item => {
    if (componentsArray.includes(item.key)) {
      return item;
    }
  });
  return provideTitleToPage;
}



const drawerWidth = 200;

export default function Sidebar() {
  const authState = useSelector(state => state[AUTH_REDUCER]);
  const permissions = authState?.[USER].permissions ? authState?.[USER].permissions : [];
  const components = getActiveComponents(permissions);
  const sidebarObjList = makeSidebarList(components, authState?.[USER]?.[USER_TYPE]);
  const sidebarList = sidebarObjList.map((item, index) => {
    return (
      <Link to={`/${item.key}`} className="text-decoration-none Sidebar__link">
        <ListItem key={item.key} disablePadding>
          <ListItemButton>
            <ListItemIcon>
              {item?.title[0]}
            </ListItemIcon>
            <ListItemText primary={item.title} />
          </ListItemButton>
        </ListItem>
      </Link>
    );
  });
  return (
    <Box sx={{ display: 'flex' }}>
      <List className="w-100">
        {sidebarList}
      </List>
      <Divider />
    </Box>
  );
}
