import React from "react";
import "./ProductCard.css";
import { useDispatch } from "react-redux";
import { Product } from "./ProductListing";

type ProductCardProps = {
  product: Product;
};

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { id, title, price, image } = product;
  const dispatch = useDispatch();

  const handleAddToCart = (
    id: number,
    title: string,
    price: number,
    image: string
  ) => {
    dispatch({
      type: "ADD_ITEM",
      payload: { id, title, price, image },
    });
  };

  return (
    <>
      <div className="productCard">
        <div className="imageContainer">
          <img loading="lazy" src={image} alt="productImg"></img>
        </div>
        <div className="productInfo">
          <label>{title}</label>
          <label>&#x20B9;{price}</label>
          {product.cartCount && product.cartCount > 1 && (
            <span>Quantity: {product.cartCount}</span>
          )}
          <button
            onClick={(e) => {
              handleAddToCart(id, title, price, image);
            }}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </>
  );
};

export default ProductCard;
