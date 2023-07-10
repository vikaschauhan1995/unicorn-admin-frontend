import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ORDER_LIST, ORDER_REDUCER,
  ORDER_NAME,
  ORDER_MOBILE,
  ORDER_STATE,
  ORDER_PIN,
  ORDER_PRODUCTS,
  ORDER_CREATED_BY_EMAIL,
  ORDER_CREATED_AT,
  ORDER_MODIFIED_LAST,
  ALL_DELIVERED_ORDERS_TO_DELIVERED_ORDERS_PAGE,
} from '../redux/Order/constants';
import { getTotalNumberOfQuantityFromProducts } from '../methods/Orders/getTotalNumberOfQuantityFromProducts';
import formatDistance from 'date-fns/formatDistanceToNowStrict';
import { useDispatch, useSelector } from 'react-redux';
import Table from '../components/Table';
import { getAllDeliveredOrdersAction } from '../redux/Order/actions';

const DeliveredOrders = () => {
  const dispatch = useDispatch();
  const orderReducerState = useSelector(state => state[ORDER_REDUCER]);
  const allDeliveredOrders = orderReducerState?.[ALL_DELIVERED_ORDERS_TO_DELIVERED_ORDERS_PAGE];
  console.log("allDeliveredOrders=>", allDeliveredOrders);
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
    }
  ];
  useEffect(() => {
    dispatch(getAllDeliveredOrdersAction());
  }, [dispatch]);
  return (
    <div>
      DeliveredOrders
      <Table columns={columns} rows={allDeliveredOrders} />
    </div>
  )
}

export default DeliveredOrders
