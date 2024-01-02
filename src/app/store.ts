import { configureStore } from "@reduxjs/toolkit";
import { filterReducer } from "./slices/filterSlice";
import { cartReducer } from "./slices/cartSlice";
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { productsReducer } from "./slices/productSlice";
import { userReducer } from "./slices/userSlice";

const persistConfig = {
  key: 'root',
  storage,
}

const cartPersistedReducer = persistReducer(persistConfig, cartReducer);
const filterPersistedReducer = persistReducer(persistConfig, filterReducer);
const productsPersistedReducer = persistReducer(persistConfig, productsReducer);
const userPersistedReducer = persistReducer(persistConfig, userReducer);

export const store = configureStore({
  reducer: {
    filters: filterPersistedReducer,
    cart: cartPersistedReducer,
    products: productsPersistedReducer,
    user: userPersistedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;