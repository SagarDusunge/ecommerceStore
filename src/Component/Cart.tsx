import React from "react";
import ProductCard from "./ProductCard.tsx";
import { useSelector } from "react-redux";
import { RootState } from "../Store/store.tsx";
import { Product } from "./ProductListing";

const Cart: React.FC = () => {
  const addedcartItems = useSelector((state: RootState) => state.cartItems);
  const cartItems = addedcartItems.filter((item: Product) => item.id);
  const displayCartItems =
    cartItems.length > 0 ? (
      cartItems.map((product: Product) => (
        <ProductCard key={product.id} product={product} />
      ))
    ) : (
      <p> Cart is Empty</p>
    );
  return <div className="product-list">{displayCartItems}</div>;
};

export default Cart;
