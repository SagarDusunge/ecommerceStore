import React from "react";
import { useDispatch } from "react-redux";
import "./Navbar.css";
const Navbar = () => {
  const dispatch = useDispatch();
  const returnToHomeHandler = () => {
    dispatch({
      type: "TOGGLE_CART",
    });
  };

  return (
    <nav className="navbar_app">
      <h1 onClick={returnToHomeHandler}>SagaMart</h1>
    </nav>
  );
};

export default Navbar;
