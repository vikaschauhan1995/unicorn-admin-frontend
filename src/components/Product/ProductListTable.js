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
import { deleteProductAction, getProductListAction, removeSelectedProductForDeletingAction, setProductFormVisibilityAction, setProductInProductFormAction, setSelectedProductForDeleting } from '../../redux/Product/actions';
import { PRODUCT_LIST, PRODUCT_NAME, PRODUCT_REDUCER, PRODUCT_SKU, PRODUCT_CREATED_BY_EMAIL, PRODUCT_CREATED_AT, PRODUCT_MODIFIED_LAST, IS_PRODUCT_LIST_LOADING, SELECTED_PRODUCT_FOR_DELETING, PRODUCT_ID, IS_PRODUCT_DELETING, PRODUCT_FULL_ACCESS, PRODUCT_QUANTITY } from '../../redux/Product/constants';
import formatDistance from 'date-fns/formatDistanceToNowStrict';
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import ProductDeleteDialogBox from './ProductDeleteDialogBox';
import { AUTH_REDUCER, USER } from '../../redux/Auth/constants';
import { PERMISSIONS } from '../../redux/Permission/constants';
import isUserAccessible from '../../utils/isUserAccessible';
import { USER_TYPE } from '../../redux/Subuser/constants';


export default function ProductListTable() {
  const dispatch = useDispatch();
  const productReducerState = useSelector(state => state[PRODUCT_REDUCER]);
  const authReducerState = useSelector(state => state[AUTH_REDUCER]);
  const isAccessible = isUserAccessible(PRODUCT_FULL_ACCESS, authReducerState?.[USER]?.[PERMISSIONS]?.permissions, authReducerState?.[USER]?.[USER_TYPE]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(25);
  const clickEditButton = (product) => {
    dispatch(setProductInProductFormAction(product));
    dispatch(setProductFormVisibilityAction());
    // console.log("product=>", product);
  }
  const clickDeleteButton = (product) => {
    dispatch(setSelectedProductForDeleting(product));
  }
  const columns = [
    { id: PRODUCT_NAME, label: 'Name', minWidth: 170 },
    { id: PRODUCT_SKU, label: 'SKU', minWidth: 100 },
    { id: PRODUCT_QUANTITY, label: 'Qty', minWidth: 30 },
    {
      id: PRODUCT_CREATED_BY_EMAIL,
      label: 'Created By',
      minWidth: 170,
      align: 'right',
    },
    {
      id: PRODUCT_CREATED_AT,
      label: 'Created At',
      minWidth: 170,
      align: 'right',
      format: (value) => {
        return formatDistance(new Date(value), new Date(), { addSuffix: false }) + " ago"
      },
    },
    {
      id: PRODUCT_MODIFIED_LAST,
      label: 'Modified Last',
      minWidth: 170,
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

  const handleCloseDeleteDialogBox = () => {
    dispatch(removeSelectedProductForDeletingAction());
  }

  const handleSubmitDeleteDialogBox = () => {
    const product_id = productReducerState?.[SELECTED_PRODUCT_FOR_DELETING]?.[PRODUCT_ID];
    dispatch(deleteProductAction(product_id));
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const rows = productReducerState[PRODUCT_LIST];
  useEffect(() => {
    dispatch(getProductListAction());
  }, [dispatch]);
  if (productReducerState[IS_PRODUCT_LIST_LOADING]) {
    return <div>Loading...</div>
  }
  // console.log("rows", rows);
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
      <ProductDeleteDialogBox selectedItem={productReducerState?.[SELECTED_PRODUCT_FOR_DELETING]} handleClose={handleCloseDeleteDialogBox} handleSubmit={handleSubmitDeleteDialogBox} submitLoading={productReducerState?.[IS_PRODUCT_DELETING]} />
    </Paper>
  );
}
