import { createAsyncThunk } from "@reduxjs/toolkit";
import client from "../../../utils/sanityClient";

export const getCardData = createAsyncThunk(
  "cartSlice/getCardData",
  (items) => {
    const IDs = items.map((item) => `"${item.id}"`).join(",");

    console.log(items);

    const query = `*[_type == "finalProduct" && _id in [${IDs}]] {
        _id,
        name,
        price,
        subText ,
        stripeProductID,
        mainImage 
      }`;

    return client
      .fetch(query)
      .then((res) => res)
      .catch((error) => error);
  }
);
