import React, { useEffect } from 'react'
import {
  useParams
} from "react-router-dom";
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
// import { ORDER_LIST, ORDER_REDUCER } from '../redux/Orders/constants';
// import { getOrder } from '../redux/Orders/actions';

const Order = () => {
  const { _id } = useParams();
  const dispatch = useDispatch();
  // const ordersReducerState = useSelector(state => state[ORDER_REDUCER]);
  // const orderList = ordersReducerState?.[ORDER_LIST]
  const getOrderFromOrderListLocally = (_id, orderList) => {
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
  const order = () => {
    // const o = getOrderFromOrderListLocally(_id, orderList);
    // if (!o) {
    //   dispatch(getOrder(_id));
    // }
    // return o;
  };
  // console.log("order=>", order());
  // const order =
  // useEffect(() => {
  // }, [_id]);
  return (
    <div className="Order__container mx-3">
      <div className="Order__upper_head">
        <Link to="/orders">Orders</Link> &gt; <Link to={`/order/${_id}`}>{_id}</Link>
      </div>
      <div className="Order__innerContainer">
        <div className="Order__head">
          <div className="container mx-0 px-0">
            <div className="row">
              <div className="col-sm">
                Name:
              </div>
              <div className="col-sm">
                Address:
              </div>
              <div className="col-sm">
                Created By:
              </div>
            </div>
            <div className="row">
              <div className="col-sm">
                Mobile:
              </div>
              <div className="col-sm">
                State:
              </div>
              <div className="col-sm">
                Created At:
              </div>
            </div>
            <div className="row">
              <div className="col-sm">
                Pin:
              </div>
              <div className="col-sm">
                Origin:
              </div>
              <div className="col-sm">
                Status:
              </div>
            </div>
          </div>
        </div>
        <div className="Order__body">
          body
        </div>
        <div className="Order__footer">
          footer
        </div>
      </div>
      Order page id:
    </div>
  )
}

export default Order
