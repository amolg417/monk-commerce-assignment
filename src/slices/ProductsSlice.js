import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  productsInCart: [
    {
      id: 1,
      title: "Select Product",
      variants: [],
      image: {},
    },
  ],
};

const cartSlice = createSlice({
  name: "cartProducts",
  initialState,
  reducers: {
    addEmptyProduct: (state, action) => {
      state.productsInCart.push(action.payload);
    },
    updateCartProducts: (state, action) => {
      state.productsInCart = action.payload;
    },
    deleteItem: (state, action) => {
      const { product_id, varient_id, isVarient } = action.payload;

      if (isVarient) {
        const product = state.productsInCart.find(
          (item) => item.id === product_id
        );

        if (product) {
          product.variants = product.variants.filter(
            (variant) => variant.id !== varient_id
          );
        }
      } else {
        state.productsInCart = state.productsInCart.filter(
          (item) => item.id !== product_id
        );
      }
    },
    addOrReplaceItem: (state, action) => {
      const { productIndex, UpdatedProducts } = action.payload;
      state.productsInCart.splice(productIndex, 1, ...UpdatedProducts);
    },
  },
});

export const {
  addEmptyProduct,
  updateCartProducts,
  deleteItem,
  addOrReplaceItem,
} = cartSlice.actions;

const cartReducer = cartSlice.reducer;
export default cartReducer;
