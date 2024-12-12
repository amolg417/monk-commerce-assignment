import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchProductList = createAsyncThunk(
  "newProducts/fetchProductList",
  async (params, thunkAPI) => {
    try {
      const { search = "", page = 1, limit = 10 } = params;
      const myHeaders = new Headers();
      myHeaders.append("x-api-key", process.env.REACT_APP_API_KEY);
      let requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      };

      const response = await fetch(
        `https://stageapi.monkcommerce.app/task/products/search?search=${search}&page=${page}&limit=${limit}`,
        requestOptions
      );
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
      const data = await response.json();
      if (data?.length) {
        return data;
      } else {
        return [];
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const initialState = {
  productList: [],
  productsToBeAddedInCart: [],
  isAddingProducts: false,
  productToBeReplacedIndex: null,
  loading: false,
  error: null,
};

const newProductsSlice = createSlice({
  name: "newProducts",
  initialState,
  reducers: {
    addProductToCart: (state, action) => {
      const { product_id, variant_id, selectedVariants, selectedProducts } =
        action.payload;
      console.log({ selectedVariants, selectedProducts });
      const productToBeAdded = state.productList.find(
        (item) => item.id === product_id
      );

      if (!productToBeAdded) {
        console.error("Product not found!");
        return;
      }

      if (
        product_id &&
        variant_id &&
        selectedProducts.has(productToBeAdded.id)
      ) {
        // If the product is already in the cart and variants are selected
        state.productsToBeAddedInCart = state.productsToBeAddedInCart.map(
          (item) => {
            if (item.id === productToBeAdded.id) {
              return {
                ...item,
                variants: productToBeAdded.variants.filter((variant) =>
                  selectedVariants.has(variant.id)
                ),
              };
            } else {
              return item;
            }
          }
        );
      } else if (!selectedProducts.has(productToBeAdded.id) && variant_id) {
        // If the product is not in the cart and variants are selected
        let productToAdd = {
          ...productToBeAdded,
          variants: productToBeAdded.variants.filter((variant) =>
            selectedVariants.has(variant.id)
          ),
        };
        state.productsToBeAddedInCart.push(productToAdd);
      } else if (!selectedProducts.has(productToBeAdded.id)) {
        state.productsToBeAddedInCart.push(productToBeAdded);
      } else {
        // If the product is already in the cart, remove it
        state.productsToBeAddedInCart = state.productsToBeAddedInCart.filter(
          (item) => item.id !== productToBeAdded.id
        );
      }
    },
    hangleModalVisibility: (state, action) => {
      state.isAddingProducts = action.payload.visibility;
      state.productToBeReplacedIndex = action.payload.itemPosition;
    },
    resetProductsToBeAddedInCart: (state) => {
      state.productsToBeAddedInCart = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductList.fulfilled, (state, action) => {
        state.loading = false;
        if (action.meta.arg.search) {
          state.productList = action.payload;
        } else {
          if (action.meta.arg.search === 1) {
            state.productList = action.payload;
          } else {
            state.productList = [...state.productList, ...action.payload];
          }
        }
      })
      .addCase(fetchProductList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      });
  },
});

export const {
  addProductToCart,
  hangleModalVisibility,
  resetProductsToBeAddedInCart,
} = newProductsSlice.actions;

const newProductsSliceReducer = newProductsSlice.reducer;
export default newProductsSliceReducer;
