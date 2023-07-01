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
import { getProductListAction } from '../../redux/Product/actions';
import { PRODUCT_LIST, PRODUCT_NAME, PRODUCT_REDUCER, PRODUCT_SKU, PRODUCT_CREATED_BY_EMAIL, PRODUCT_CREATED_AT, PRODUCT_MODIFIED_LAST } from '../../redux/Product/constants';
import formatDistance from 'date-fns/formatDistanceToNowStrict';

const columns = [
  { id: PRODUCT_NAME, label: 'Name', minWidth: 170 },
  { id: PRODUCT_SKU, label: 'SKU', minWidth: 100 },
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
    // format: (value) => value.toFixed(2),
  },
];

export default function ProductListTable() {
  const dispatch = useDispatch();
  const productReducerState = useSelector(state => state[PRODUCT_REDUCER]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(25);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  console.log("productReducerState list =>", productReducerState);
  const rows = productReducerState[PRODUCT_LIST];
  useEffect(() => {
    dispatch(getProductListAction());
  }, [dispatch]);
  return (
    <Paper sx={{ width: '100%', height: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
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
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format
                            ? column.format(value)
                            : value}
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
