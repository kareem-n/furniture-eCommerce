import { createAsyncThunk } from "@reduxjs/toolkit";
import client from "../../../utils/sanityClient";

export const getHomeData = createAsyncThunk(
  "HomeSlice/getHomeData",

  async () => {
    let query = `{
    
    "hero": *[_type =='heroSection'] ,
    "category" : *[_type == 'category'],
    "nowIn" : *[_type == 'nowIn'] ,
    "allInOne" : *[_type == 'allInOne'],
    "hotProducts" : *[_type == 'hotProducts'] {
      products[]->{
    _id,
    coordinates[]{
      top,
      left,
      productDetails->{
        _id,
        name,
        cat,
        subText ,
        price,
      }
    },
    name,
    price,
    image
  }
    }
    
    }`;

    return client
      .fetch(query)
      .then((res) => res)
      .catch((error) => error);
  }
);
