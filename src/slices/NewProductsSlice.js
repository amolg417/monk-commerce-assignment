import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { enableMapSet } from "immer";
enableMapSet();
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
      if (data === null) {
        throw new Error("No next page is availabel");
      }
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
  selectedProducts: new Map(),
  isAddingProducts: false,
  productToBeReplacedIndex: null,
  loading: false,
  error: null,
  hasNextPage: true,
};

const newProductsSlice = createSlice({
  name: "newProducts",
  initialState,
  reducers: {
    toggleProductSelection: (state, action) => {
      const { productId, allVariants } = action.payload;

      if (state.selectedProducts.has(productId)) {
        state.selectedProducts.delete(productId);
      } else {
        state.selectedProducts.set(
          productId,
          new Set(allVariants.map((variant) => variant.id))
        );
      }
    },
    toggleVariantSelection: (state, action) => {
      const { productId, variantId } = action.payload;

      if (!state.selectedProducts.has(productId)) {
        state.selectedProducts.set(productId, new Set());
      }
      const selectedVariants = state.selectedProducts.get(productId);
      if (selectedVariants.has(variantId)) {
        selectedVariants.delete(variantId);
        if (selectedVariants.size === 0) {
          state.selectedProducts.delete(productId);
        }
      } else {
        selectedVariants.add(variantId);
      }
    },
    hangleModalVisibility: (state, action) => {
      state.isAddingProducts = action.payload.visibility;
      state.productToBeReplacedIndex = action.payload.itemPosition;
    },
    resetProductsToBeAddedInCart: (state) => {
      state.selectedProducts = new Map();
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
        console.log({"action.meta.arg.search":action.meta.arg.search?.length," action.payload": action.payload});
        if (action.meta.arg.search?.length) {
          console.log(`"action.meta.arg.search !==""`)
          if (action.meta.arg.page === 1) {
            state.productList = action.payload;
          } else {
            state.productList = [...state.productList, ...action.payload];
          }
        } else {
          console.log(`"action.meta.arg.search ===""`)
          if (action.meta.arg.page === 1) {
            state.productList = action.payload;
          } else {
            state.productList = [...state.productList, ...action.payload];
          }
        }
      })
      .addCase(fetchProductList.rejected, (state, action) => {
        if (action.payload === "No next page is availabel") {
          state.hasNextPage = false;
        }
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      });
  },
});

export const selectSelectedProducts = (state) => {
  const selectedProductsMap = state.selectedProducts;
  const addedProductIds = new Set();

  return state.productList.reduce((result, product) => {
    if (addedProductIds.has(product.id)) {
      return result;
    }
    const selectedVariantIds = selectedProductsMap.get(product.id);
    if (selectedVariantIds && selectedVariantIds.size > 0) {
      const selectedVariants = product.variants.filter((variant) =>
        selectedVariantIds.has(variant.id)
      );

      result.push({
        id: product.id,
        title: product.title,
        variants: selectedVariants,
        image: product?.image,
      });
      addedProductIds.add(product.id);
    }
    return result;
  }, []);
};

export const {
  addProductToCart,
  hangleModalVisibility,
  resetProductsToBeAddedInCart,
  toggleProductSelection,
  toggleVariantSelection,
} = newProductsSlice.actions;

const newProductsSliceReducer = newProductsSlice.reducer;
export default newProductsSliceReducer;
