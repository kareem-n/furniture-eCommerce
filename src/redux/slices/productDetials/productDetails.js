import { createSlice } from "@reduxjs/toolkit";
import { getProductDetails } from "./CAT/getProductDetails";

export const productDetails = createSlice({
  name: "productDetails",
  initialState: {
    loading: false,
    product: {
      data: null,
      error: null,
    },
    related: {
      data: null,
      error: null,
    },
  },
  reducers: {
    
  },
  extraReducers: (builder) => {
    builder.addCase(getProductDetails.fulfilled, (state, action) => {
      state.loading = false;
      state.product.data = action.payload.product;
      state.related.data = action.payload.related;
      // console.log(action.payload.related);
    });
    builder.addCase(getProductDetails.pending, (state) => {
      state.loading = true;
      state.product.data = null;
    });
    builder.addCase(getProductDetails.rejected, (state, action) => {
      state.loading = false;
      state.product.error = action.payload;
    });
  },
});

export default productDetails.reducer;
