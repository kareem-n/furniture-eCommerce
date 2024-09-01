import { createSlice } from "@reduxjs/toolkit";
import { getHomeData } from "./homeCAT";

const initialState = {
  isLoading: false,
  hero: {
    data: [],
    error: null,
  },
  categories: {
    data: [],
    error: null,
  },
  nowIn: {
    data: [],
    error: null,
  },
  allInOne: {
    data: [],
    error: null,
  },
  hotProducts: {
    data: [],
    error: null,
  },
};

export const HomeSlice = createSlice({
  name: "homeSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getHomeData.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getHomeData.fulfilled, (state, action) => {
      
      state.hotProducts.data = action.payload.hotProducts[0].products;
      state.hero.data = action.payload.hero[0].images;

      state.categories.data = action.payload.category;
      state.nowIn.data = action.payload.nowIn;
      state.allInOne.data = action.payload.allInOne[0];

      // console.log(action.payload.allInOne[0]);

      state.isLoading = false;
    });
    builder.addCase(getHomeData.rejected, (state) => {
      state.hero.error = "something went wrong";
      state.isLoading = false;
    });
  },
});

export default HomeSlice.reducer;
// export const {} = HomeSlice.actions;
