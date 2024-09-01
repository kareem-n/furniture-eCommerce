import { createAsyncThunk } from "@reduxjs/toolkit";
import client from "../../../../utils/sanityClient";

export const getRoomDetails = createAsyncThunk(
  "roomSlice/getRoomDetails",

  async (cat) => {
    const query = `
    *[_type == "roomCategory" && title == '${cat}'][0]{
        _id,
        mainImage,
        title,
        text,
        subText,
        products[]->{
          _id,
          name,
          subText ,
          rate,
          price,
          mainImage ,
          secondImage,
          colors
          // Add other product fields you want to retrieve
        }
      }
  `;

    return client
      .fetch(query)
      .then((res) => res)
      .catch((error) => error);
  }
);
