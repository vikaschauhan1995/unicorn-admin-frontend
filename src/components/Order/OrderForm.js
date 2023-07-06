import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@mui/material/Button';
import Modal from 'react-bootstrap/Modal';
import {
  IS_ORDER_FORM_VISIBLE, ORDER_REDUCER, ORDER_NAME,
  ORDER_MOBILE,
  ORDER_ADDRESS,
  ORDER_STATE,
  ORDER_PIN,
  ORDER_FORM_DATA,
  ORDER_PRODUCTS,
  PRODUCT_QUANTITY,
  ORDER_NAME_ERROR,
  ORDER_MOBILE_ERROR,
  ORDER_ADDRESS_ERROR,
  ORDER_STATE_ERROR,
  ORDER_PIN_ERROR,
  FORM_STATE_ERRORS,
  ORDER_PRODUCT_QUANTITY_ERROR,
  ORDER_PRODUCT_ERROR,
  IS_SAVE_ORDER_LOADING,
  ORDER_CREATED_BY_ID,
  ORDER_CREATED_BY_EMAIL,
  ORDER_ORIGIN,
  CUSTOM_ORDER_GENERATE_KEY
} from '../../redux/Order/constants';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import IconButton from '@mui/material/IconButton';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { addErrorDataForProductVirtualFieldAction, addOrderProductVirualFieldAction, saveOrderAction, setErrorOnFieldByKeyValueAction, setOrderFormDataAction, toggleOrderFormVisibleAction, updateErrorDataUsedForProductVirualFieldByIdIndexAction } from '../../redux/Order/actions';
import OrderProductsVirualFields from './OrderProductsVirualFields';
import { AUTH_REDUCER, USER, EMAIL } from '../../redux/Auth/constants';


const OrderForm = () => {
  const dispatch = useDispatch();
  const authReducerState = useSelector(state => state[AUTH_REDUCER]);
  const orderReducerState = useSelector(state => state[ORDER_REDUCER]);
  const clickCloseButton = () => {
    dispatch(toggleOrderFormVisibleAction());
  }
  const virtualProductListData = orderReducerState?.[ORDER_FORM_DATA]?.[ORDER_PRODUCTS];
  const generateProductVirtualFeilds = () => {
    try {
      const list = virtualProductListData.map((productData, index) => {
        return <OrderProductsVirualFields key={index} index={index} productData={productData} />
      });
      return list;
    } catch (error) {
      return <OrderProductsVirualFields key_={0} productData={{ [PRODUCT_QUANTITY]: 0 }} />;
    }
  }
  const addProductVirtualFields = () => {
    dispatch(addOrderProductVirualFieldAction());
    dispatch(addErrorDataForProductVirtualFieldAction());
  }
  const handleFieldChange = (event) => {
    const value = event.target.value;
    const key = event.target.name;
    if (value !== '' && value !== undefined && value !== null) {
      dispatch(setOrderFormDataAction(key, value));
      dispatch(setErrorOnFieldByKeyValueAction(key + '_error', false));
    } else {
      dispatch(setOrderFormDataAction(key, value));
      dispatch(setErrorOnFieldByKeyValueAction(key + '_error', true));
    }
  }
  const handleNumberFieldChange = (event) => {
    const value = event.target.value;
    const key = event.target.name;
    if (value <= 0) {
      dispatch(setOrderFormDataAction(key, value));
      dispatch(setErrorOnFieldByKeyValueAction(key + '_error', true));
    } else {
      dispatch(setOrderFormDataAction(key, value));
      dispatch(setErrorOnFieldByKeyValueAction(key + '_error', false));
    }
  }

  const name = orderReducerState?.[ORDER_FORM_DATA]?.[ORDER_NAME];
  const mobile = orderReducerState?.[ORDER_FORM_DATA]?.[ORDER_MOBILE];
  const address = orderReducerState?.[ORDER_FORM_DATA]?.[ORDER_ADDRESS];
  const state = orderReducerState?.[ORDER_FORM_DATA]?.[ORDER_STATE];
  const pin = orderReducerState?.[ORDER_FORM_DATA]?.[ORDER_PIN];

  const nameError = orderReducerState?.[FORM_STATE_ERRORS]?.[ORDER_NAME_ERROR];
  const mobileError = orderReducerState?.[FORM_STATE_ERRORS]?.[ORDER_MOBILE_ERROR];
  const addressError = orderReducerState?.[FORM_STATE_ERRORS]?.[ORDER_ADDRESS_ERROR];
  const stateError = orderReducerState?.[FORM_STATE_ERRORS]?.[ORDER_STATE_ERROR];
  const pinError = orderReducerState?.[FORM_STATE_ERRORS]?.[ORDER_PIN_ERROR];

  const checkVirualProductFormFieldsValidationError = () => {
    const virtualProductErros = orderReducerState?.[ORDER_FORM_DATA]?.[ORDER_PRODUCTS];
    let hasError = false;
    try {
      virtualProductErros.forEach((errorData, index) => {
        if (!errorData?._id) {
          dispatch(updateErrorDataUsedForProductVirualFieldByIdIndexAction(true, index, ORDER_PRODUCT_ERROR));
          hasError = true;
        }
        if (errorData?.[PRODUCT_QUANTITY] <= 0) {
          dispatch(updateErrorDataUsedForProductVirualFieldByIdIndexAction(true, index, ORDER_PRODUCT_QUANTITY_ERROR));
          hasError = true;
        }
      });
      return hasError;
    } catch (error) {
      console.log("error: ", error.message);
      return true;
    }
  }
  const checkFormValidationError = () => {
    let hasAnyError = false;
    if (!name.length) {
      dispatch(setErrorOnFieldByKeyValueAction(ORDER_NAME_ERROR, true));
      hasAnyError = true;
    }
    if (mobile <= 0) {
      dispatch(setErrorOnFieldByKeyValueAction(ORDER_MOBILE_ERROR, true));
      hasAnyError = true;
    }
    if (!address.length) {
      dispatch(setErrorOnFieldByKeyValueAction(ORDER_ADDRESS_ERROR, true));
      hasAnyError = true;
    }
    if (!state.length) {
      dispatch(setErrorOnFieldByKeyValueAction(ORDER_STATE_ERROR, true));
      hasAnyError = true;
    }
    if (pin <= 0) {
      dispatch(setErrorOnFieldByKeyValueAction(ORDER_PIN_ERROR, true));
      hasAnyError = true;
    }
    return hasAnyError;
  }
  const clickSaveButton = () => {
    if (checkVirualProductFormFieldsValidationError() === false && checkFormValidationError() === false) {
      const order = {
        ...orderReducerState?.[ORDER_FORM_DATA],
        [ORDER_CREATED_BY_ID]: authReducerState?.[USER]?._id,
        [ORDER_CREATED_BY_EMAIL]: authReducerState?.[USER]?.[EMAIL],
        [ORDER_ORIGIN]: CUSTOM_ORDER_GENERATE_KEY,
      };
      dispatch(saveOrderAction(order));
    }
  }
  // console.log("authReducerState=>", authReducerState);
  return (
    <div>
      <Modal show={orderReducerState?.[IS_ORDER_FORM_VISIBLE]} onHide={clickCloseButton}>
        <Modal.Header closeButton>
          <Modal.Title>Add Custom Order</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Box
            component="form"
            sx={{
              '& > :not(style)': { m: 1, width: '25ch' },
            }}
            autoComplete="off"
          >
            <TextField name={ORDER_NAME} onChange={handleFieldChange} value={orderReducerState?.[ORDER_FORM_DATA]?.[ORDER_NAME]} error={nameError} label="Name" variant="outlined" />
            <TextField
              name={ORDER_MOBILE}
              onChange={handleNumberFieldChange}
              value={orderReducerState?.[ORDER_FORM_DATA]?.[ORDER_MOBILE]}
              error={mobileError}
              label="Mobile Number"
              type="number"
              InputLabelProps={{
                shrink: true,
              }}
              // value={productQuantity}
              variant="outlined"
            />
            <TextField name={ORDER_ADDRESS} onChange={handleFieldChange} value={orderReducerState?.[ORDER_FORM_DATA]?.[ORDER_ADDRESS]} error={addressError} label="Address" variant="outlined" />
            <TextField name={ORDER_STATE} onChange={handleFieldChange} value={orderReducerState?.[ORDER_FORM_DATA]?.[ORDER_STATE]} error={stateError} label="State" variant="outlined" />
            <TextField
              name={ORDER_PIN}
              onChange={handleFieldChange}
              value={orderReducerState?.[ORDER_FORM_DATA]?.[ORDER_PIN]}
              error={pinError}
              label="Pin"
              type="number"
              InputLabelProps={{
                shrink: true,
              }}
              // value={productQuantity}
              variant="outlined"
            />
            <div>Products</div>
            {/* <OrderProductsVirualFields key_={1} /> */}
            {generateProductVirtualFeilds()}
          </Box>
          <Button variant="text" onClick={addProductVirtualFields}>
            {/* <IconButton aria-label="plus" color="primary"> */}
            <FontAwesomeIcon icon={faPlus} size="2x" />
            {/* </IconButton> */}
          </Button>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={clickCloseButton}>
            Close
          </Button>
          <Button variant="contained" disabled={orderReducerState?.[IS_SAVE_ORDER_LOADING]} onClick={clickSaveButton}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default OrderForm
