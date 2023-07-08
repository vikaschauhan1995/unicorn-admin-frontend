import { PRODUCT_QUANTITY } from "../../redux/Order/constants";



export const getTotalNumberOfQuantityFromProducts = (products) => {
  try {
    if (products?.length > 0) {
      let quantity = 0;
      products.forEach(product => {
        if (product?.[PRODUCT_QUANTITY]) {
          quantity += Number(product?.[PRODUCT_QUANTITY]);
        } else {
          quantity += 0;
        }
      });
      return quantity;
    } else {
      return 0;
    }
  } catch (error) {
    return 0;
  }
}