import React, { useEffect } from 'react';
import Button from '@mui/material/Button';
import '../style/Order.scss';
import { useDispatch, useSelector } from 'react-redux';
import { IS_DELETE_ORDER_LOADING, ORDER_REDUCER, SELECTED_ORDER_FOR_DELETING } from '../redux/Order/constants';
import OrderForm from '../components/Order/OrderForm';
import { deleteOrderAction, removeSelectedOrderForDeletingAction, toggleOrderFormVisibleAction } from '../redux/Order/actions';
import { getProductListAction } from '../redux/Product/actions';
import OrderListTable from '../components/Order/OrderListTable';
import DeleteDialogueBox from '../components/DeleteDialogueBox';
import isUserAccessible from '../utils/isUserAccessible';
import { PERMISSION_REDUCER, PERMISSIONS } from '../redux/Permission/constants';
import { SUBUSER_FULL_ACCESS, USER_TYPE } from '../redux/Subuser/constants';
import { AUTH_REDUCER, USER } from '../redux/Auth/constants';

const Orders = () => {
  const dispatch = useDispatch();
  const orderReducerState = useSelector(state => state[ORDER_REDUCER]);
  // console.log("orderReducerState=>", orderReducerState);
  const handleCloseDeleteDialogueBox = () => {
    dispatch(removeSelectedOrderForDeletingAction());
  }
  const clickDeleteButton = () => {
    const order_id = orderReducerState?.[SELECTED_ORDER_FOR_DELETING]?._id;
    dispatch(deleteOrderAction(order_id));
  }
  const authReducerState = useSelector(state => state[AUTH_REDUCER]);
  const isAccessible = isUserAccessible(SUBUSER_FULL_ACCESS, authReducerState?.[USER]?.[PERMISSIONS]?.permissions, authReducerState?.[USER]?.[USER_TYPE]);
  console.log("authReducerState=>", authReducerState);
  useEffect(() => {
    dispatch(getProductListAction());
  }, [dispatch]);
  return (
    <div className="Order__container">
      <div className="Order__head mx-3">
        <div><h3>Orders</h3></div>
        <div>
          <Button variant="contained" onClick={() => dispatch(toggleOrderFormVisibleAction())} disabled={isAccessible ? false : true}>New</Button>
        </div>
      </div>
      <div className="Order__body mx-3">
        <OrderListTable />
      </div>
      <OrderForm />
      <DeleteDialogueBox selectedItem={orderReducerState?.[SELECTED_ORDER_FOR_DELETING]} handleClose={handleCloseDeleteDialogueBox} handleSubmit={clickDeleteButton} submitLoading={orderReducerState?.[IS_DELETE_ORDER_LOADING]} />
    </div>
  )
}

export default Orders
