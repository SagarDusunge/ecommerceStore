import { Product } from "../Component/ProductListing";
import { RootState } from "./store";
type Action = {
  type: string;
  payload: {
    cartItems: Product[];
    displayCart: boolean;
  };
};

const cartreducer: any = (state: RootState, action: Action) => {
  switch (action?.type) {
    case "ADD_ITEM":
      return { ...state, cartItems: [...state.cartItems, action.payload] };
    case "TOGGLE_CART":
      return { ...state, displayCart: action.payload };
    default:
      return state;
  }
};

export default cartreducer;
