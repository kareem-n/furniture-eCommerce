import { createSlice } from "@reduxjs/toolkit";
import { getUser } from "./CAT/getUser";
import { createNewUser } from "./CAT/createUser";

export const userSlice = createSlice({
  name: "userSlice",
  initialState: {
    user: null,
    loading: false,
    newUserLoading: false,
    isLoginSectionOpened: false,
    errorMSG: "",
  },
  reducers: {
    setIsLoginSectionOpened: (state, action) => {
      state.isLoginSectionOpened = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setErrorMSG: (state, action) => {
      state.errorMSG = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUser.fulfilled, (state, action) => {
      state.user = action.payload;
      state.loading = false;
    });
    builder.addCase(getUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getUser.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(createNewUser.fulfilled, (state, action) => {
      state.user = action.payload;
      localStorage.setItem("userID", action.payload._id);
      state.newUserLoading = false;
    });
    builder.addCase(createNewUser.pending, (state) => {
      state.newUserLoading = true;
    });
    builder.addCase(createNewUser.rejected, (state) => {
      state.newUserLoading = false;
    });
  },
});

export default userSlice.reducer;
export const { setIsLoginSectionOpened, setUser, setErrorMSG } =
  userSlice.actions;
