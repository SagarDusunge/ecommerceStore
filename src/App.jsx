import "./App.css";
import ProductListing from "./Component/ProductListing.tsx";
import CartNote from "./Component/CartNote.tsx";


function App() {
  return (
    <div className="App logincontainer">
      <CartNote/>
      <ProductListing />
    </div>
  );
}

export default App;
