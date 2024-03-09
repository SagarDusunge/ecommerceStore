import React from "react";
import "./App.css";
import ProductListing from "./Component/ProductListing.tsx";
import CartNote from "./Component/CartNote.tsx";
import Navbar from "./Component/NavBar.tsx";

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
