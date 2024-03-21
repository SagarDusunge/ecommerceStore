import React from "react";
import { useDispatch } from "react-redux";
import "./Navbar.css";
import { Product } from "./ProductListing";

type NavbarProps = {
  allProducts: Product[] | [];
  searchInputHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const Navbar: React.FC<NavbarProps> = ({ searchInputHandler }) => {
  const dispatch = useDispatch();
  const returnToHomeHandler = () => {
    dispatch({
      type: "TOGGLE_CART",
    });
  };

  return (
    <nav className="navbar_app">
      <h1 onClick={returnToHomeHandler}>SagaMart</h1>
      <div className="search_submit">
        <input
          id="search_input"
          onChange={(e) => {
            searchInputHandler(e);
          }}
          type="text"
          placeholder="Search mart"
        />
        <input id="submit_search" type="submit" />
      </div>
    </nav>
  );
};

export default Navbar;
