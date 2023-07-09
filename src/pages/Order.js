import '../style/Order.scss';
import React, { useEffect } from 'react'
import {
  useParams
} from "react-router-dom";
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { ORDER_FOR_ORDER_PAGE, ORDER_LIST, ORDER_NAME, ORDER_REDUCER, ORDER_ADDRESS, ORDER_CREATED_BY_EMAIL, ORDER_MOBILE, ORDER_STATE, ORDER_CREATED_AT, ORDER_PIN, ORDER_ORIGIN, ORDER_STATUS, ORDER_STATUS_CREATED, ORDER_STATUS_CANCELED, ORDER_STATUS_DISPATCHED, ORDER_PRODUCTS, ORDER_PROCEED_LOADING } from '../redux/Order/constants';
import { getOrder, orderProceedAction, setOrder } from '../redux/Order/actions';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import formatDistance from 'date-fns/formatDistanceToNowStrict';
import Card from 'react-bootstrap/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { PRODUCT_NAME } from '../redux/Product/constants';
import Products from '../components/Order/Products';




const Order = () => {
  const { _id } = useParams();
  const dispatch = useDispatch();
  const ordersReducerState = useSelector(state => state[ORDER_REDUCER]);
  const orderList = ordersReducerState?.[ORDER_LIST]
  const getOrderFromOrderListLocally = () => {
    let order_ = null;
    try {
      orderList.forEach((order) => {
        if (order?._id == _id) {
          order_ = order;
        }
      });
      return order_;
    } catch (error) {
      console.log("error: ", error.message);
      return false;
    }
  }
  const getOrder_ = () => {
    const order = getOrderFromOrderListLocally(_id, orderList);
    if (order) {
      dispatch(setOrder(order));
    } else {
      dispatch(getOrder(_id));
    }
  };
  const order = ordersReducerState?.[ORDER_FOR_ORDER_PAGE];
  // console.log("ordersReducerState=>", ordersReducerState?.[ORDER_FOR_ORDER_PAGE]);
  // const order =
  useEffect(() => {
    getOrder_();
  }, []);
  const buttonNameByOrderStatus = (orderStatus) => {
    switch (orderStatus) {
      case ORDER_STATUS_CREATED:
        return "Proceed";
      case ORDER_STATUS_CANCELED:
        return "Canceled";
      case ORDER_STATUS_DISPATCHED:
        return "Dispatched";
      default:
        return false;
    }
  }
  // console.log("ordersReducerState?.[ORDER_PROCEED_LOADING]=>", ordersReducerState);
  if (order) {
    return (
      <div className="Order__container mx-3">
        <div className="Order__upper_head">
          <div>
            <Link to="/orders">Orders</Link> &gt; <Link to={`/order/${_id}`}>{_id}</Link>
          </div>
          <div>
            <Button variant="contained" onClick={() => dispatch(orderProceedAction(order))}
              disabled={
                ordersReducerState?.[ORDER_PROCEED_LOADING] ? true :
                  order?.[ORDER_STATUS] !== ORDER_STATUS_CREATED
              }>{buttonNameByOrderStatus(order?.[ORDER_STATUS]) && buttonNameByOrderStatus(order?.[ORDER_STATUS])}</Button>
          </div>
        </div>
        <div className="Order__innerContainer">
          <div className="Order__head">

          </div>
          <div className="Order__body">
            <div className="container mx-0 px-0">
              <div className="row">
                <div className="col-sm">
                  Name: {order?.[ORDER_NAME]}
                </div>
                <div className="col-sm">
                  Address:{order?.[ORDER_ADDRESS]}
                </div>
                <div className="col-sm">
                  Created By:{order?.[ORDER_CREATED_BY_EMAIL]}
                </div>
              </div>
              <Divider variant="inset" className="my-3" />
              <div className="row">
                <div className="col-sm">
                  Mobile:{order?.[ORDER_MOBILE]}
                </div>
                <div className="col-sm">
                  State:{order?.[ORDER_STATE]}
                </div>
                <div className="col-sm">
                  Created At:{formatDistance(new Date(order?.[ORDER_CREATED_AT]), new Date(), { addSuffix: false }) + " ago"}
                </div>
              </div>
              <Divider variant="inset" className="my-3" />
              <div className="row">
                <div className="col-sm">
                  Pin:{order?.[ORDER_PIN]}
                </div>
                <div className="col-sm">
                  Origin:{order?.[ORDER_ORIGIN]}
                </div>
                <div className="col-sm">
                  Status:{order?.[ORDER_STATUS]}
                </div>
              </div>
              <Divider variant="inset" className="my-3" />
              <div className="row">
                <Products />
              </div>
            </div>
          </div>
          <div className="Order__footer">

          </div>
        </div>
      </div>
    )
  }
}

export default Order
