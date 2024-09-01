import { createSlice } from "@reduxjs/toolkit";
import { getRoomDetails } from "./CAT/GetRoomDeatils";

export const roomSLice = createSlice({
  name: "roomSlice",
  initialState: {
    room: {
      loading: false,
      data: null,
      error: null,
    },
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getRoomDetails.fulfilled, (state, action) => {
      console.log(action.payload);
      
      state.room.data = action.payload;
      state.room.loading = false;

      // console.log(action.payload);
      // console.log(0);
    });
    builder.addCase(getRoomDetails.rejected, (state) => {
      // console.log(action.payload);
      state.room.loading = false;

      // console.log(0);
    });
    builder.addCase(getRoomDetails.pending, (state) => {
      state.room.loading = true;
      // console.log(0);
    });
  },
});

export default roomSLice.reducer;

// export const {} = roomSLice.actions;
