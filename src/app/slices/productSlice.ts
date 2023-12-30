import { createSlice } from "@reduxjs/toolkit";
import { IProd } from "../../types/IProduct"

type ProductState = {
  products: IProd[],
}

const initialState: ProductState = {
  products: [],
};

const productsSlice = createSlice({
  name: 'products',
  initialState: initialState,
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
    },
  },
});

export const { setProducts } = productsSlice.actions;
export const productsReducer = productsSlice.reducer;