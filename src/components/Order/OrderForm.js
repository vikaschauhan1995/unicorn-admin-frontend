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
  PRODUCT_QUANTITY
} from '../../redux/Order/constants';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import IconButton from '@mui/material/IconButton';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { addOrderProductVirualFieldAction, toggleOrderFormVisibleAction } from '../../redux/Order/actions';
import OrderProductsVirualFields from './OrderProductsVirualFields';


const OrderForm = () => {
  const dispatch = useDispatch();
  const orderReducerState = useSelector(state => state[ORDER_REDUCER]);
  const clickCloseButton = () => {
    dispatch(toggleOrderFormVisibleAction());
  }
  const virtualProductListData = orderReducerState?.[ORDER_FORM_DATA]?.[ORDER_PRODUCTS];
  const generateProductVirtualFeilds = () => {
    try {
      const list = virtualProductListData.map((productData, index) => {
        return <OrderProductsVirualFields key={index} key_={index} productData={productData} />
      });
      return list;
    } catch (error) {
      return <OrderProductsVirualFields key_={0} productData={{ [PRODUCT_QUANTITY]: 0 }} />;
    }
  }
  const addProductVirtualFields = () => {
    // console.log("orderReducerState?.[ORDER_FORM_DATA]?.[ORDER_PRODUCTS]", orderReducerState?.[ORDER_FORM_DATA]?.[ORDER_PRODUCTS]);
    dispatch(addOrderProductVirualFieldAction());
  }
  // console.log("virtualProductListData=>", virtualProductListData);
  return (
    <div>
      <Modal show={orderReducerState?.[IS_ORDER_FORM_VISIBLE]} onHide={clickCloseButton}>
        <Modal.Header closeButton>
          <Modal.Title>Add Order</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Box
            component="form"
            sx={{
              '& > :not(style)': { m: 1, width: '25ch' },
            }}
            autoComplete="off"
          >
            <TextField name={ORDER_NAME} value="" error={false} label="Name" variant="outlined" />
            <TextField
              name={ORDER_MOBILE}
              // onChange={handleNumberFieldChange}
              // error={formStateError?.[PRODUCT_QUANTITY_ERROR]}
              label="Mobile Number"
              type="number"
              InputLabelProps={{
                shrink: true,
              }}
              // value={productQuantity}
              variant="outlined"
            />
            <TextField name={ORDER_ADDRESS} value="" error={false} label="Address" variant="outlined" />
            <TextField name={ORDER_STATE} value="" error={false} label="State" variant="outlined" />
            <TextField
              name={ORDER_PIN}
              // onChange={}
              // error={}
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
            <IconButton aria-label="plus" color="primary">
              <FontAwesomeIcon icon={faPlus} />
            </IconButton>
          </Button>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={clickCloseButton}>
            Close
          </Button>
          <Button variant="contained">
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default OrderForm
