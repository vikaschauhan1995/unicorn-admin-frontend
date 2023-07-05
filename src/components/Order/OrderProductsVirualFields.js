import React, { useState } from 'react';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import { useTheme } from '@mui/material/styles';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import OutlinedInput from '@mui/material/OutlinedInput';
import { ORDER_PRODUCT_ID, ORDER_REDUCER, PRODUCT_QUANTITY } from '../../redux/Order/constants';
import IconButton from '@mui/material/IconButton';
import { faMinus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TextField from '@mui/material/TextField';
import { useSelector, useDispatch } from 'react-redux';
import { PRODUCT_LIST, PRODUCT_REDUCER, PRODUCT_ID, PRODUCT_NAME, PRODUCT_SKU } from '../../redux/Product/constants';
import Stack from '@mui/material/Stack';
import { removeOrderProductVirtualFieldAction, updateProductFromProductListAction, updateQuantityFromFormProductListAction } from '../../redux/Order/actions';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

// function getStyles(name, personName, theme) {
//   return {
//     fontWeight:
//       personName.indexOf(name) === -1
//         ? theme.typography.fontWeightRegular
//         : theme.typography.fontWeightMedium,
//   };
// }


const OrderProductsVirualFields = ({ key_, productData }) => {
  // const theme = useTheme();
  // const [personName, setPersonName] = useState([]);
  const dispatch = useDispatch();
  const productReducerState = useSelector(state => state[PRODUCT_REDUCER]);
  const orderReducerState = useSelector(state => state[ORDER_REDUCER]);
  const productList = productReducerState?.[PRODUCT_LIST] ? productReducerState?.[PRODUCT_LIST] : [];
  // console.log("personName=>", personName);
  const getSelectedProductById = (arr, id) => {
    const list = arr.filter((item) => {
      if (item?.[ORDER_PRODUCT_ID] == id) {
        return item;
      }
    });
    return list?.[0];
  }
  const handleOptionSelectChange = (event) => {
    const {
      target: { value },
    } = event;
    const selectedProduct_id = typeof value === 'string' ? value.split(',') : value[0];
    const selectedProduct = getSelectedProductById(productList, selectedProduct_id);
    // console.log("selectedProduct=>", selectedProduct);
    dispatch(updateProductFromProductListAction({ selectedProduct, index: key_ }));
  };
  const handleQuantityChange = (event, index) => {
    const value = event.target.value;
    dispatch(updateQuantityFromFormProductListAction({ index, [PRODUCT_QUANTITY]: value }));
  }
  // console.log("orderReducerState", orderReducerState);
  return (
    <Stack className="w-100 mx-0" direction="row">
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-multiple-name-label">Product {key_}</InputLabel>
        <Select
          // name={productData?.[ORDER_PRODUCT_ID] + "_" + key_}
          // name={`${ORDER_PRODUCT_ID}_${key_}`}
          // multiple
          value={productData?.[ORDER_PRODUCT_ID] ? productData?.[ORDER_PRODUCT_ID] : ""}
          onChange={handleOptionSelectChange}
          input={<OutlinedInput label="Name" />}
          MenuProps={MenuProps}
        >
          {/* <MenuItem>Option</MenuItem> */}
          {productList.map((product) => (
            <MenuItem
              key={product?.[PRODUCT_ID]}
              value={product?.[PRODUCT_ID]}
            // value={product?.[PRODUCT_SKU]}
            // style={getStyles(product, personName, theme)}
            >
              {product?.[PRODUCT_NAME]}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <TextField
        name={`${PRODUCT_QUANTITY}_${key_}`}
        onChange={(event) => handleQuantityChange(event, key_)}
        error={productData?.[PRODUCT_QUANTITY] <= 0}
        value={productData?.[PRODUCT_QUANTITY]}
        label="Quantity"
        type="number"
        InputLabelProps={{
          shrink: true,
        }}
        // value={productQuantity}
        variant="outlined"
        style={{ marginTop: "9px" }}
      />
      <Button color="error">
        <IconButton>
          <FontAwesomeIcon icon={faMinus} />
        </IconButton>
      </Button>
    </Stack >

  )
}

export default OrderProductsVirualFields;