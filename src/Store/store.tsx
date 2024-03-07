import { configureStore } from "@reduxjs/toolkit";
import cartreducer from "./reducer";

const store = configureStore({
  reducer: cartreducer,
  preloadedState: { cartItems: [], displayCart: false },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export default store;
