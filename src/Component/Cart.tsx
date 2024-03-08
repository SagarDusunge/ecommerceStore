import React from "react";
import ProductCard from "./ProductCard.tsx";
import { useSelector } from "react-redux";
import { RootState } from "../Store/store.tsx";
import { Product } from "./ProductListing";
import usePagination from "../customHooks/usePagination.tsx";

const Cart: React.FC = () => {
  const addedcartItems = useSelector((state: RootState) => state.cartItems);
  const cartItems = addedcartItems.filter((item: Product) => item.id);
  const itemsPerPage = 3;
  const { currentItem, currentPage, updatePage } = usePagination(
    cartItems,
    itemsPerPage
  );
  const displayCartItems =
    currentItem.length > 0 ? (
      currentItem.map((product: Product) => (
        <ProductCard key={product.id} product={product} />
      ))
    ) : (
      <p> Cart is Empty</p>
    );
  return (
    <div className="product-list">
      {displayCartItems}
      <button
        onClick={() => {
          updatePage(currentPage - 1);
        }}
      >
        {currentPage}
      </button>
      <button
        onClick={() => {
          updatePage(currentPage + 1);
        }}
      >
        {currentPage + 1}
      </button>
    </div>
  );
};

export default Cart;
