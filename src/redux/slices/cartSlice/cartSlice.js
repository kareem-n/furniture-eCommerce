import { createSlice } from "@reduxjs/toolkit";
import { getCardData } from "./ACTGetCartData";

export const cartSlice = createSlice({
  name: "cartSlice",
  initialState: {
    items: [],
    cartFullData: null,
    cartFullDataLoading: false,
    cartFullDataError: null,
    totalPrice: 0,
    isCartOpen: false,
  },
  reducers: {
    setCartItems: (state, action) => {
      const indexOfItem = state.items.findIndex(
        (item) => item.id === action.payload.id
      );
      
      if (indexOfItem >= 0) {
        state.items[indexOfItem].quan += 1;
      } else {
        state.items.push({ id: action.payload.id, quan: 1 , cat:action.payload.cat });
      }
      
      localStorage.setItem("cartItems", JSON.stringify(state.items));
    },
    getItemFromLocal: (state) => {
      if (localStorage.getItem("cartItems")) {
        state.items = JSON.parse(localStorage.getItem("cartItems"));
      }
    },
    removeCartItem: (state, action) => {
      const indexOfItem = state.items.findIndex(
        (item) => item.id === action.payload
      );

      if (indexOfItem >= 0) {
        state.items.splice(indexOfItem, 1);
      }

      localStorage.setItem("cartItems", JSON.stringify(state.items));
    },
    decreaseItemQuantity: (state, action) => {
      const indexOfItem = state.items.findIndex(
        (item) => item.id === action.payload
      );

      if (indexOfItem >= 0) {
        if (state.items[indexOfItem].quan > 1)
          state.items[indexOfItem].quan -= 1;
      }

      localStorage.setItem("cartItems", JSON.stringify(state.items));
    },
    increaseItemQuantity: (state, action) => {
      const indexOfItem = state.items.findIndex(
        (item) => item.id === action.payload
      );

      if (indexOfItem >= 0) {
        state.items[indexOfItem].quan += 1;
      }

      localStorage.setItem("cartItems", JSON.stringify(state.items));
    },
    calcTotalPrice: (state) => {
      const quantityMap = state.items.reduce((map, item) => {
        map[item.id] = item.quan;
        return map;
      }, {});

      const totalPrices = state.cartFullData.reduce((total, product) => {
        return total + product.price * quantityMap[product._id];
      }, 0);

      state.totalPrice = totalPrices;
    },
    setIsCartOpen: (state, action) => {
      state.isCartOpen = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCardData.fulfilled, (state, action) => {
      state.cartFullDataLoading = false;
      state.cartFullData = action.payload;
    });
    builder.addCase(getCardData.pending, (state) => {
      state.cartFullDataLoading = true;
    });
    builder.addCase(getCardData.rejected, (state) => {
      state.cartFullDataLoading = false;
    });
  },
});

export default cartSlice.reducer;

export const {
  setIsCartOpen,
  setCartItems,
  getItemFromLocal,
  removeCartItem,
  decreaseItemQuantity,
  increaseItemQuantity,
  calcTotalPrice,
} = cartSlice.actions;
