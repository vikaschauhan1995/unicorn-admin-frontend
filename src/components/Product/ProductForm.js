import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Modal from 'react-bootstrap/Modal';
import Alert from 'react-bootstrap/Alert';
import { useDispatch, useSelector } from 'react-redux';
import {
  IS_PRODUCT_FORM_VISIBLE, PRODUCT_FORM_DATA, PRODUCT_NAME, PRODUCT_REDUCER, PRODUCT_SKU, PRODUCT_NAME_ERROR,
  PRODUCT_SKU_ERROR,
  PRODUCT_IMAGES,
  PRODUCT_CREATED_BY_ID,
  PRODUCT_CREATED_BY_EMAIL,
  IS_SAVING_FORM_DATA,
  SAVE_PRODUCT_DATA_ERROR,
  PRODUCT_ID,
  IS_UPDATE_PRODUCT_LOADING
} from '../../redux/Product/constants';
import { makeProductFormDataEmpty, removeFormErrorAction, saveProductData, setProductFormDataAction, setProductFormVisibilityAction, updateProductAction } from '../../redux/Product/actions';
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
  // console.log("productReducerState=>", productReducerState);
  const checkFieldsValidation = () => {
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
  }
  const clickSaveButton = () => {
    checkFieldsValidation();
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
  const clickUpdateButton = () => {
    checkFieldsValidation();
    if (productSKU.length && productName.length) {
      const productData = {
        [PRODUCT_ID]: productReducerState?.[PRODUCT_FORM_DATA]?.[PRODUCT_ID],
        [PRODUCT_NAME]: productName,
        [PRODUCT_SKU]: productSKU,
        // [PRODUCT_IMAGES]:[],
        // [PRODUCT_CREATED_BY_ID]: authReducerState?.[USER]?._id,
        // [PRODUCT_CREATED_BY_EMAIL]: authReducerState?.[USER]?.email
      }
      dispatch(updateProductAction(productData));
    }
  }
  const isProductSelected = productReducerState?.[PRODUCT_FORM_DATA]?.[PRODUCT_ID];
  const clickCloseButton = () => {
    if (isProductSelected) {
      dispatch(setProductFormVisibilityAction());
      dispatch(makeProductFormDataEmpty());
      dispatch(removeFormErrorAction());
    } else {
      dispatch(setProductFormVisibilityAction());
      dispatch(removeFormErrorAction());
    }
  }
  return (
    <Modal show={productReducerState?.[IS_PRODUCT_FORM_VISIBLE]} onHide={clickCloseButton}>
      <Modal.Header closeButton>
        <Modal.Title>{isProductSelected ? "Update" : "Add"} Product</Modal.Title>
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
        {productReducerState[SAVE_PRODUCT_DATA_ERROR] ? <Alert className="mx-2" variant="danger">{productReducerState[SAVE_PRODUCT_DATA_ERROR]}</Alert> : null}
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={clickCloseButton} variant="secondary">
          Close
        </Button>
        <Button disabled={productReducerState[IS_SAVING_FORM_DATA] || productReducerState[IS_UPDATE_PRODUCT_LOADING]} variant="contained" onClick={isProductSelected ? clickUpdateButton : clickSaveButton}>
          {isProductSelected ? "Update" : "Save"}
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default ProductForm;