import client from "../../../../utils/sanityClient";
import { createAsyncThunk } from "@reduxjs/toolkit";
export const getUser = createAsyncThunk("userSlice/getUser", (id) => {
  const query = `*[_type == 'user' && _id == '${id}'][0]{
  email ,
  username ,
  password,
  cart->{
      products[]->{
        name,
        price,
        subText ,
        mainImage ,
      }
    }
  }`;

  return client
    .fetch(query)
    .then((res) => res)
    .catch((error) => error);
});
