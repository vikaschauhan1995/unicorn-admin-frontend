import React from 'react'
import {
  PRODUCT_NAME, PRODUCT_SKU,
  PRODUCT_QUANTITY,
  PRODUCT_PRICE,
  PRODUCT_CREATED_BY_EMAIL,
  PRODUCT_CREATED_AT,
  PRODUCT_MODIFIED_LAST
} from '../../redux/Product/constants';
import formatDistance from 'date-fns/formatDistanceToNowStrict';
import { useSelector } from 'react-redux';
import { ORDER_FOR_ORDER_PAGE, ORDER_PRODUCTS, ORDER_REDUCER } from '../../redux/Order/constants';
import Table from '../Table';

const Products = () => {
  const ordersReducerState = useSelector(state => state[ORDER_REDUCER]);
  const productList = ordersReducerState?.[ORDER_FOR_ORDER_PAGE]?.[ORDER_PRODUCTS]
  const columns = [
    { id: PRODUCT_NAME, label: 'Name', minWidth: 170 },
    { id: PRODUCT_SKU, label: 'SKU', minWidth: 100 },
    { id: PRODUCT_QUANTITY, label: 'Qty', minWidth: 30 },
    { id: PRODUCT_PRICE, label: 'Price', minWidth: 30 },
    {
      id: PRODUCT_CREATED_BY_EMAIL,
      label: 'Created By',
      minWidth: 140,
      align: 'right',
    },
    {
      id: PRODUCT_CREATED_AT,
      label: 'Created At',
      minWidth: 90,
      align: 'right',
      format: (value) => {
        return formatDistance(new Date(value), new Date(), { addSuffix: false }) + " ago"
      },
    },
    {
      id: PRODUCT_MODIFIED_LAST,
      label: 'Modified Last',
      minWidth: 90,
      align: 'right',
      format: (value) => {
        return formatDistance(new Date(value), new Date(), { addSuffix: false }) + " ago"
      },
    }
  ];
  return <Table columns={columns} rows={productList} />
}

export default Products
