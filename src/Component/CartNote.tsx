import React from "react";
import "./CartNote.css";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./../Store/store.tsx";

const CartNote: React.FC = () => {
  const count = useSelector((state: RootState) => state?.cartItems.length);
  const dispatch = useDispatch();

  const cartClickHandler = (e: React.MouseEvent) => {
    if ((e.target as HTMLInputElement).id === "cart") {
      dispatch({
        type: "TOGGLE_CART",
        payload: true,
      });
    }
  };

  return (
    <div
      className="cart_counter"
      onClick={(e) => {
        cartClickHandler(e);
      }}
    >
      <svg
        className="cart_icon"
        xmlns="http://www.w3.org/2000/svg"
        width="90"
        height="90"
        id="cart"
      >
        <path d="M91.8 27.3 81.1 61c-.8 2.4-2.9 4-5.4 4H34.4c-2.4 0-4.7-1.5-5.5-3.7L13.1 19H4c-2.2 0-4-1.8-4-4s1.8-4 4-4h11.9c1.7 0 3.2 1.1 3.8 2.7L36 57h38l8.5-27H35.4c-2.2 0-4-1.8-4-4s1.8-4 4-4H88c1.3 0 2.5.7 3.2 1.7.8 1 1 2.4.6 3.6zm-55.4 43c-1.7 0-3.4.7-4.6 1.9-1.2 1.2-1.9 2.9-1.9 4.6 0 1.7.7 3.4 1.9 4.6 1.2 1.2 2.9 1.9 4.6 1.9s3.4-.7 4.6-1.9c1.2-1.2 1.9-2.9 1.9-4.6 0-1.7-.7-3.4-1.9-4.6-1.2-1.2-2.9-1.9-4.6-1.9zm35.9 0c-1.7 0-3.4.7-4.6 1.9s-1.9 2.9-1.9 4.6c0 1.7.7 3.4 1.9 4.6 1.2 1.2 2.9 1.9 4.6 1.9 1.7 0 3.4-.7 4.6-1.9 1.2-1.2 1.9-2.9 1.9-4.6 0-1.7-.7-3.4-1.9-4.6s-2.9-1.9-4.6-1.9z"></path>
      </svg>
      <span id="counter_span">{count}</span>
    </div>
  );
};

export default CartNote;