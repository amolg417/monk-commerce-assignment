import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../slices/ProductsSlice";
import newProductsSliceReducer from "../slices/NewProductsSlice";

const store = configureStore({
  reducer: {
    cart: cartReducer,
    newProducts: newProductsSliceReducer,
  }, 
  // Allow Map and Set in the Redux state
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          "newProducts/toggleProductSelection",
          "newProducts/toggleVariantSelection",
        ],
        ignoredPaths: ["newProducts.selectedProducts"],
      },
    }),
});

export default store;
