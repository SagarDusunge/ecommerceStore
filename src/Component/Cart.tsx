import React from "react";
import ProductCard from "./ProductCard.tsx";
import { useSelector } from "react-redux";
import { RootState } from "../Store/store.tsx";
import { Product } from "./ProductListing";

const Cart: React.FC = () => {
  const addedcartItems = useSelector((state: RootState) => state.cartItems);
  const cartItems = addedcartItems.filter((item: Product) => item.id);

  return (
    <div className="product-list">
      {cartItems.map((product: Product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default Cart;
