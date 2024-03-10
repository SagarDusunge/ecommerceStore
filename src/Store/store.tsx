import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./CartReducer"; // Assuming the reducer is correctly defined in cartReducer.ts
import { Product } from "../Component/ProductListing";

export type RootState = {
  cartItems: Product[] | [];
  displayCart: boolean;
};

const store = configureStore({
  reducer: cartReducer,
  preloadedState: { cartItems: [], displayCart: false },
});

export type AppDispatch = typeof store.dispatch;
export default store;