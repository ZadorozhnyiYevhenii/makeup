import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IProd } from "../../types/IProduct";

interface CartState {
  cart: IProd[];
  counts: Record<string, number>;
}

const initialState: CartState = {
  cart: [],
  counts: {},
};

const getKey = (productId: number, amount: number): string => `${productId}_${amount}`;

const cartState = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<IProd>) => {
      const { id, amount } = action.payload;
      const key = getKey(id, amount);

      if (state.counts[key]) {
        state.counts[key] += 1;
      } else {
        state.cart.push(action.payload);
        state.counts[key] = 1;
      }
    },
    removeFromCart: (state, action: PayloadAction<{ productId: number, amount: number }>) => {
      const { productId, amount } = action.payload;
      const key = getKey(productId, amount);

      state.cart = state.cart?.filter(item => item.id !== productId || item.amount !== amount);
      delete state.counts[key];
    },
    addCount: (state, action: PayloadAction<{ productId: number, amount: number }>) => {
      const { productId, amount } = action.payload;
      const key = getKey(productId, amount);
      state.counts[key] += 1;
    },
    decrementCount: (state, action: PayloadAction<{ productId: number, amount: number }>) => {
      const { productId, amount } = action.payload;
      const key = getKey(productId, amount);

      if (state.counts[key] > 1) {
        state.counts[key] -= 1;
      } else {
        state.cart = state.cart?.filter(item => item.id !== productId || item.amount !== amount);
        delete state.counts[key];
      }
    },
  },
});

export const { addToCart, removeFromCart, addCount, decrementCount } = cartState.actions;

export const cartReducer = cartState.reducer;
