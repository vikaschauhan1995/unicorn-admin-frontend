import React from 'react';
import '../style/Product.scss';
import Button from '@mui/material/Button';
import ProductForm from '../components/Product/ProductForm';
import { useDispatch, useSelector } from 'react-redux';
import { PRODUCT_REDUCER, PRODUCT_LIST, PRODUCT_FULL_ACCESS } from '../redux/Product/constants';
import { setProductFormVisibilityAction } from '../redux/Product/actions';
import ProductListTable from '../components/Product/ProductListTable';
import isUserAccessible from '../utils/isUserAccessible';
import { AUTH_REDUCER, USER } from '../redux/Auth/constants';
import { PERMISSIONS } from '../redux/Permission/constants';
import { USER_TYPE } from '../redux/Subuser/constants';

const Product = () => {
  const dispatch = useDispatch();
  const authReducerState = useSelector(state => state[AUTH_REDUCER]);
  const isAccessible = isUserAccessible(PRODUCT_FULL_ACCESS, authReducerState?.[USER]?.[PERMISSIONS]?.permissions, authReducerState?.[USER]?.[USER_TYPE]);
  return (
    <div className="Product__container">
      <div className="Product__head mx-3">
        <div><h3>Product Page</h3></div>
        <div>
          <Button variant="contained" disabled={isAccessible ? false : true} onClick={() => dispatch(setProductFormVisibilityAction())} >Add New</Button>
        </div>
      </div>
      <div className="Product__body mx-3">
        <ProductListTable />
      </div>
      <ProductForm />
    </div>
  )
}

export default Product
