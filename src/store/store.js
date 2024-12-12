import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../slices/ProductsSlice";
import newProductsSliceReducer from "../slices/NewProductsSlice";

const store = configureStore({
  reducer: {
    cart: cartReducer,
    newProducts: newProductsSliceReducer,
  },
});

export default store;
