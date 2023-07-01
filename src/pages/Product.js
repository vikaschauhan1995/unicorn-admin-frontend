import React from 'react';
import '../style/Product.scss';
import Button from 'react-bootstrap/Button';
import ProductForm from '../components/Product/ProductForm';
import { useDispatch, useSelector } from 'react-redux';
import { PRODUCT_REDUCER, PRODUCT_LIST } from '../redux/Product/constants';
import { setProductFormVisibilityAction } from '../redux/Product/actions';
import ProductListTable from '../components/Product/ProductListTable';

const Product = () => {
  const dispatch = useDispatch();

  return (
    <div className="Product__container">
      <div className="Product__head mx-3">
        <div><h3>Product Page</h3></div>
        <div>
          <Button onClick={() => dispatch(setProductFormVisibilityAction())} variant="primary">Add New</Button>
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
