import { createAsyncThunk } from "@reduxjs/toolkit";
import client from "../../../../utils/sanityClient";

export const createNewUser = createAsyncThunk(
  "userSlice/createNewUser",
  (userData) => {
    return client
      .create({
        _type: "user",
        username: userData.username,
        email: userData.email,
        phone: userData.phone,
        password: userData.password,
      })
      .then((res) => res)
      .catch((error) => error);
  }
);
