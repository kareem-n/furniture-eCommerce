import { createSlice } from "@reduxjs/toolkit";

export const global = createSlice({
  name: "global",
  initialState: {
    navbarH: 0,
    currentRoute: null,
    cartItems : null ,

  },
  reducers: {
    setNavbarH: (state, action) => {
      state.navbarH = action.payload;
    },
    setCurrentRoute : (state ,action)=>{
      state.currentRoute = action.payload
    },
    
  },
});

export default global.reducer;
export const { setNavbarH ,setCurrentRoute  } = global.actions;
