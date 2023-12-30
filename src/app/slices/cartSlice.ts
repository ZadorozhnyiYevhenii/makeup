import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IProd } from "../../types/IProduct"


interface CartState {
  cart: IProd[] | undefined;
  counts: Record<number, number>;
}

const initialState: CartState = {
  cart: [],
  counts: {},
};

const cartState = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<IProd>) => {
      const existingProduct = state.cart?.find(item => item.id === action.payload.id);

      if (existingProduct) {
        state.counts[action.payload.id] += 1;
      } else {
        state.cart?.push(action.payload);
        state.counts[action.payload.id] = 1;
      }
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.cart = state.cart?.filter(item => item.id !== action.payload);
      delete state.counts[action.payload];
    },
    addCount: (state, action: PayloadAction<number>) => {
      state.counts[action.payload] += 1;
    },
    decrementCount: (state, action: PayloadAction<number>) => {
      if (state.counts[action.payload] > 1) {
        state.counts[action.payload] -= 1;
      }
    },
  },
});

export const { addToCart, removeFromCart, addCount, decrementCount } = cartState.actions;

export const cartReducer = cartState.reducer;
