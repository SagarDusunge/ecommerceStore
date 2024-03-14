import React from "react";
import "./ProductCard.css";
import { Product } from "./ProductListing";

type CartItemCardProps = {
  product: Product;
};

const CartItemCard: React.FC<CartItemCardProps> = ({ product }) => {
  const { title, price, image } = product;

  return (
    <>
      <div className="cartCard">
        <div className="imageContainer">
          <img loading="lazy" src={image} alt="productImg"></img>
        </div>
        <div className="productInfo">
          <label>{title}</label>
          <label>&#x20B9;{price}</label>
          {product.cartCount && product.cartCount > 0 && (
            <span>Quantity: {product.cartCount}</span>
          )}
        </div>
      </div>
    </>
  );
};

export default CartItemCard;
