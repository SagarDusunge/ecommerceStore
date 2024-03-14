import React from "react";
import "./App.css";
import ProductListing from "./Component/ProductListing";
import CartNote from "./Component/CartNote";
import Navbar from "./Component/NavBar";

function App() {
  return (
    <div className="App logincontainer">
      <Navbar />
      <CartNote />
      <ProductListing />
    </div>
  );
}

export default App;
