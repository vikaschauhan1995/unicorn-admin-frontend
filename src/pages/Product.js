import React from 'react';
import '../style/Product.scss';
import Button from 'react-bootstrap/Button';
import ProductForm from '../components/Product/ProductForm';
import { useDispatch, useSelector } from 'react-redux';
import { PRODUCT_REDUCER, PRODUCT_LIST } from '../redux/Product/constants';
import { setProductFormVisibilityAction } from '../redux/Product/actions';

const Product = () => {
  const dispatch = useDispatch();
  const productReducerState = useSelector(state => state[PRODUCT_REDUCER]);
  console.log("productReducerState LIST=>", productReducerState?.[PRODUCT_LIST]);
  return (
    <div className="Product__container">
      <div className="Product__head mx-3">
        <div><h3>Product Page</h3></div>
        <div>
          <Button onClick={() => dispatch(setProductFormVisibilityAction())} variant="primary">Add New</Button>
        </div>
      </div>
      <div className="Product__body mx-3">
        Product list goes here...
      </div>
      <ProductForm />
    </div>
  )
}

export default Product
