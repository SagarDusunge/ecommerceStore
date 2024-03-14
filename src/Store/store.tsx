import { configureStore } from "@reduxjs/toolkit";
import cartUpdateReducer from "./CartReducer"; // Assuming the reducer is correctly defined in cartReducer.ts
import { Product } from "../Component/ProductListing";

export type RootState = {
  cartItems: Product[] | [];
  displayCart: boolean;
};

const store = configureStore({
  reducer: cartUpdateReducer,
  preloadedState: { cartItems: [], displayCart: false },
});

export type AppDispatch = typeof store.dispatch;
export default store;