import { RootState } from "./store";

type Action = {
  type: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  payload?: any;
};

const initialState: RootState = {
  cartItems: [],
  displayCart: false,
};

const cartReducer = (
  state: RootState = initialState,
  action: Action
): RootState => {
  switch (action.type) {
    case "ADD_ITEM":
      return { ...state, cartItems: [...state.cartItems, action.payload] };
    case "CLEAR_CART":
      return { ...state, cartItems: [] };
    case "TOGGLE_CART":
      return { ...state, displayCart: action.payload };
    default:
      return state;
  }
};

export default cartReducer;
