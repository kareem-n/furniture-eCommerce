import { createAsyncThunk } from "@reduxjs/toolkit";
import client from "../../../../utils/sanityClient";

export const getProductDetails = createAsyncThunk(
  "productDetails/getProductDetails",
  ({ id, categoryName }) => {

    const query = `{
    "product" : *[_type == 'finalProduct' && _id == '${id}'][0] ,
    "related" : *[_type == 'roomCategory' && title == '${categoryName}'][0]{
    title ,
        products[]->{
            _id ,
            name ,
            subText , 
            price , 
            mainImage , 
            secondImage
        }
    }
    
    }`;

    return client
      .fetch(query)
      .then((res) => res)
      .catch((error) => error);
  }
);
