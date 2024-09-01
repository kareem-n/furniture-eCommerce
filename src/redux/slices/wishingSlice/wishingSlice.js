import { createSlice } from "@reduxjs/toolkit";
import { getWishlistItems } from "./ACT";

export const wishingSlice = createSlice({
  name: "wishingSlice",
  initialState: {
    items: [],
    wishListFullDetails: null,
    loading: false,
    isWishListOpened: false,
  },
  reducers: {
    toggleWishList: (state, action) => {
      const ElIndex = state.items.findIndex(
        (item) => item.id === action.payload.id
      );

      if (ElIndex >= 0) {
        state.items.splice(ElIndex, 1);
      } else {
        state.items.push({ id: action.payload.id, cat: action.payload.cat });
      }

      localStorage.setItem("wish", JSON.stringify(state.items));
    },
    returnFromLocal: (state) => {
      if (localStorage.getItem("wish")) {
        state.items = JSON.parse(localStorage.getItem("wish"));
      }
    },
    setIsWishListOpened: (state, action) => {
      state.isWishListOpened = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getWishlistItems.fulfilled, (state, action) => {
      state.wishListFullDetails = action.payload;
      state.loading = false;
    });
    builder.addCase(getWishlistItems.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(getWishlistItems.pending, (state) => {
      state.loading = true;
    });
  },
});

export default wishingSlice.reducer;
export const { toggleWishList, returnFromLocal, setIsWishListOpened } =
  wishingSlice.actions;
