import React, { useEffect } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { useDispatch, useSelector } from 'react-redux';
import formatDistance from 'date-fns/formatDistanceToNowStrict';
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import { AUTH_REDUCER, USER } from '../../redux/Auth/constants';
import { PERMISSIONS } from '../../redux/Permission/constants';
import isUserAccessible from '../../utils/isUserAccessible';
import { getOrderList, setCompleteOrderToFormAction, setSelectedorderForDeletingAction, toggleOrderFormVisibleAction } from '../../redux/Order/actions';
import {
  ORDER_LIST, ORDER_REDUCER,
  ORDER_NAME,
  ORDER_MOBILE,
  ORDER_ADDRESS,
  ORDER_STATE,
  ORDER_PIN,
  ORDER_PRODUCTS,
  ORDER_CREATED_BY_EMAIL,
  ORDER_CREATED_AT,
  ORDER_MODIFIED_LAST,
  ORDER_FORM_DATA
} from '../../redux/Order/constants';
import { Link } from 'react-router-dom';
import { getTotalNumberOfQuantityFromProducts } from '../../methods/Orders/getTotalNumberOfQuantityFromProducts';
import { SUBUSER_FULL_ACCESS, USER_TYPE } from '../../redux/Subuser/constants';

const OrderListTable = () => {
  const dispatch = useDispatch();
  const authReducerState = useSelector(state => state[AUTH_REDUCER]);
  const orderReducerState = useSelector(state => state[ORDER_REDUCER])
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(25);
  const clickEditButton = (selectedObj) => {
    dispatch(setCompleteOrderToFormAction(selectedObj));
    dispatch(toggleOrderFormVisibleAction());
  }
  const clickDeleteButton = (selectedObj) => {
    dispatch(setSelectedorderForDeletingAction(selectedObj));
  }
  const isAccessible = isUserAccessible(SUBUSER_FULL_ACCESS, authReducerState?.[USER]?.[PERMISSIONS]?.permissions, authReducerState?.[USER]?.[USER_TYPE]);

  const columns = [
    {
      label: 'ID', minWidth: 70, action: (obj) => {
        return (
          <Link to={`/order/${obj?._id}`}>{obj?._id}</Link>
        );
      }
    },
    { id: ORDER_NAME, label: 'Name', minWidth: 30 },
    { id: ORDER_MOBILE, label: 'Mobile', minWidth: 100 },
    {
      label: 'Items', align: 'center', minWidth: 30, action: (obj) => {
        const numberOfItems = getTotalNumberOfQuantityFromProducts(obj?.[ORDER_PRODUCTS]);
        // console.log("obj=>", obj);
        return numberOfItems;
      }
    },
    { id: ORDER_STATE, label: 'State', minWidth: 30 },
    { id: ORDER_PIN, label: 'Pin', minWidth: 30 },
    {
      id: ORDER_CREATED_BY_EMAIL,
      label: 'Created By',
      minWidth: 130,
      align: 'right',
    },
    {
      id: ORDER_CREATED_AT,
      label: 'Created At',
      minWidth: 130,
      align: 'right',
      format: (value) => {
        return formatDistance(new Date(value), new Date(), { addSuffix: false }) + " ago"
      },
    },
    {
      id: ORDER_MODIFIED_LAST,
      label: 'Modified Last',
      minWidth: 130,
      align: 'right',
      format: (value) => {
        return formatDistance(new Date(value), new Date(), { addSuffix: false }) + " ago"
      },
    },
    {
      label: 'Actions',
      align: 'right',
      action: (obj) => {
        // console.log("obj=>", obj);
        return (<>
          <ButtonGroup variant="text" aria-label="text button group">
            <Button disabled={isAccessible ? false : true} onClick={() => clickEditButton(obj)}>
              <FontAwesomeIcon icon={faEdit} />
            </Button>
            <Button disabled={isAccessible ? false : true} onClick={() => clickDeleteButton(obj)}>
              <FontAwesomeIcon icon={faTrash} />
            </Button>
          </ButtonGroup>
        </>
        );
      }
    }
  ];
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const rows = orderReducerState[ORDER_LIST];
  // const rows = [];
  useEffect(() => {
    dispatch(getOrderList());
  }, [dispatch]);
  // console.log("rows=>", rows);
  return (
    <Paper sx={{ width: '100%', height: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column, index) => (
                <TableCell
                  key={column.id + "" + index}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column, index) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id + index} align={column.align}>
                          {column.format
                            ? column.format(value)
                            : value}
                          {column?.action && column?.action(row)}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}

export default OrderListTable
