import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useDispatch, useSelector } from 'react-redux';
import {
  IS_PRODUCT_FORM_VISIBLE, PRODUCT_FORM_DATA, PRODUCT_NAME, PRODUCT_REDUCER, PRODUCT_SKU, PRODUCT_NAME_ERROR,
  PRODUCT_SKU_ERROR,
  PRODUCT_IMAGES,
  PRODUCT_CREATED_BY_ID,
  PRODUCT_CREATED_BY_EMAIL
} from '../../redux/Product/constants';
import { saveProductData, setProductFormDataAction, setProductFormVisibilityAction } from '../../redux/Product/actions';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { AUTH_REDUCER, USER } from '../../redux/Auth/constants';

const ProductForm = () => {
  const dispatch = useDispatch();
  const productReducerState = useSelector(state => state[PRODUCT_REDUCER]);
  const authReducerState = useSelector(state => state[AUTH_REDUCER]);
  const [formStateError, setFormStateError] = useState({
    [PRODUCT_NAME_ERROR]: false,
    [PRODUCT_SKU_ERROR]: false,
  });
  const handleFieldChange = (event) => {
    const value = event.target.value;
    const key = event.target.name;
    if (value !== '' && value !== undefined && value !== null) {
      dispatch(setProductFormDataAction(key, value));
      setFormStateError(oldState => {
        return { ...oldState, [key + '_error']: false }
      });
    } else {
      dispatch(setProductFormDataAction(key, value));
      setFormStateError(oldState => {
        return { ...oldState, [key + '_error']: true }
      });
    }
  }
  const productName = productReducerState?.[PRODUCT_FORM_DATA]?.[PRODUCT_NAME];
  const productSKU = productReducerState?.[PRODUCT_FORM_DATA]?.[PRODUCT_SKU];
  // console.log("authReducerState=>", authReducerState);
  const clickSaveButton = () => {
    if (!productName.length) {
      setFormStateError(oldState => {
        return { ...oldState, [PRODUCT_NAME_ERROR]: true }
      });
    }
    if (!productSKU.length) {
      setFormStateError(oldState => {
        return { ...oldState, [PRODUCT_SKU_ERROR]: true }
      });
    }
    if (productSKU.length && productName.length) {
      const productData = {
        [PRODUCT_NAME]: productName,
        [PRODUCT_SKU]: productSKU,
        // [PRODUCT_IMAGES]:[],
        [PRODUCT_CREATED_BY_ID]: authReducerState?.[USER]?._id,
        [PRODUCT_CREATED_BY_EMAIL]: authReducerState?.[USER]?.email
      }
      dispatch(saveProductData(productData));
    }
  }
  return (
    <Modal show={productReducerState?.[IS_PRODUCT_FORM_VISIBLE]} onHide={() => dispatch(setProductFormVisibilityAction())}>
      <Modal.Header closeButton>
        <Modal.Title>Add Product</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Box
          component="form"
          sx={{
            '& > :not(style)': { m: 1, width: '25ch' },
          }}
          autoComplete="off"
        >
          <TextField name={PRODUCT_NAME} onChange={handleFieldChange} value={productName} error={formStateError?.[PRODUCT_NAME_ERROR]} label="Name" variant="outlined" />
          <TextField name={PRODUCT_SKU} onChange={handleFieldChange} error={formStateError?.[PRODUCT_SKU_ERROR]} value={productSKU} label="SKU" variant="outlined" />
        </Box>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={() => dispatch(setProductFormVisibilityAction())} variant="secondary">
          Close
        </Button>
        <Button variant="primary" onClick={clickSaveButton}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default ProductForm;