import { configureStore } from "@reduxjs/toolkit";
import { filterReducer } from "./slices/filterSlice";
import { cartReducer } from "./slices/cartSlice";
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { productsReducer } from "./slices/productSlice";

const persistConfig = {
  key: 'root',
  storage,
}

const cartPersistedReducer = persistReducer(persistConfig, cartReducer);
const filterPersistedReducer = persistReducer(persistConfig, filterReducer);
const productsPersistedReducer = persistReducer(persistConfig, productsReducer);

export const store = configureStore({
  reducer: {
    filters: filterPersistedReducer,
    cart: cartPersistedReducer,
    products: productsPersistedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;