import { configureStore } from "@reduxjs/toolkit";
import global from "./slices/global";
import homeSlice from "./slices/homeSlice/homeSlice";
import roomSLice from "./slices/roomSlice/roomSlice";
import productDetails from "./slices/productDetials/productDetails";
import userSlice from "./slices/userSlice/userSlice";
import cartSlice from "./slices/cartSlice/cartSlice";
import wishingSlice from "./slices/wishingSlice/wishingSlice";

export const store = configureStore({
  reducer: {
    global,
    homeSlice,
    roomSLice,
    productDetails,
    userSlice,
    cartSlice,
    wishingSlice
  },
});
