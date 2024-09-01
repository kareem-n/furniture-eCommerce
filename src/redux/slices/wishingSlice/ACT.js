import { createAsyncThunk } from "@reduxjs/toolkit";
import client from "../../../utils/sanityClient";

export const getWishlistItems = createAsyncThunk(
  "wishingSlice/getWishlistItems",
  (IDs) => {
    const finalIDs = IDs.map((item) => `"${item.id}"`).join(",");

    const query = `*[_type == 'finalProduct' && _id in [${finalIDs}]]{
        _id ,
        name,
        subText,
        price,
        mainImage,
    }
    `;

    return client
      .fetch(query)
      .then((res) => res)
      .catch((error) => error);
  }
);
