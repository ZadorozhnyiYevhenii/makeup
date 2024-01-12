import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IProd } from "../../types/IProduct";

interface CartState {
  cart: IProd[];
  counts: Record<string, number>;
  totalAmount: number;
}

const initialState: CartState = {
  cart: [],
  counts: {},
  totalAmount: 0
};

const getKey = (productId: number, variationName: string): string => `${productId}_${variationName}`;

const cartState = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<IProd>) => {
      const { id, variationName } = action.payload;
      const key = getKey(id, variationName);

      console.log(key)

      console.log(variationName)

      if (state.counts[key]) {
        state.counts[key] += 1;
      } else {
        state.cart.push(action.payload);
        state.counts[key] = 1;
      }
    },
    removeFromCart: (state, action: PayloadAction<{ productId: number, variationName: string }>) => {
      const { productId, variationName } = action.payload;
      const key = getKey(productId, variationName);

      state.cart = state.cart?.filter(item => item.id !== productId || item.variationName !== variationName);
      delete state.counts[key];
    },
    addCount: (state, action: PayloadAction<{ productId: number, variationName: string }>) => {
      const { productId, variationName } = action.payload;
      const key = getKey(productId, variationName);
      state.counts[key] += 1;
    },
    decrementCount: (state, action: PayloadAction<{ productId: number, variationName: string }>) => {
      const { productId, variationName } = action.payload;
      const key = getKey(productId, variationName);

      if (state.counts[key] > 1) {
        state.counts[key] -= 1;
      } else {
        state.cart = state.cart?.filter(item => item.id !== productId || item.variationName !== variationName);
        delete state.counts[key];
      }
    },
    setTotalAmount: (state, action) => {
      state.totalAmount = action.payload
    }
  },
});

export const {
  addToCart,
  removeFromCart,
  addCount,
  decrementCount,
  setTotalAmount
} = cartState.actions;

export const cartReducer = cartState.reducer;
