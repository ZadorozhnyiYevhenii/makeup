import { configureStore } from "@reduxjs/toolkit";
import { filterReducer } from "./slices/filterSlice";

export const store = configureStore({
  reducer: {
    filters: filterReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;