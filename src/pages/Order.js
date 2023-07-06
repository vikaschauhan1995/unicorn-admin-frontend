import React, { useEffect } from 'react';
import Button from '@mui/material/Button';
import '../style/Order.scss';
import { useDispatch, useSelector } from 'react-redux';
import { ORDER_REDUCER } from '../redux/Order/constants';
import OrderForm from '../components/Order/OrderForm';
import { toggleOrderFormVisibleAction } from '../redux/Order/actions';
import { getProductListAction } from '../redux/Product/actions';

const Orders = () => {
  const dispatch = useDispatch();
  const orderReducerState = useSelector(state => state);
  // console.log("orderReducerState=>", orderReducerState);
  useEffect(() => {
    dispatch(getProductListAction());
  }, [dispatch]);
  return (
    <div className="Order__container">
      <div className="Order__head mx-3">
        <div><h3>Order</h3></div>
        <div>
          <Button variant="contained" onClick={() => dispatch(toggleOrderFormVisibleAction())}>New</Button>
        </div>
      </div>
      <div className="Order__body mx-3">

      </div>
      <OrderForm />
    </div>
  )
}

export default Orders
