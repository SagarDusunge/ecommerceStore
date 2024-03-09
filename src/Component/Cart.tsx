import React from "react";
import CartItemCard from "./CartItemCard.tsx";
import { useSelector } from "react-redux";
import { RootState } from "../Store/store.tsx";
import { Product } from "./ProductListing";
import usePagination from "../customHooks/usePagination.tsx";

const Cart: React.FC = () => {
  const addedcartItems: Product[] = useSelector(
    (state: RootState) => state.cartItems
  );

  // Aggregate products by id and count duplicates as cartCount
  const aggregatedItems: Product[] = Object.values(
    addedcartItems.reduce((acc, product) => {
      if (!acc[product.id]) {
        acc[product.id] = { ...product, cartCount: 1 }; // Initialize if not present
      } else {
        acc[product.id].cartCount! += 1; // Increment cartCount for duplicates
      }
      return acc;
    }, {} as Record<number, Product>)
  );

  const itemsPerPage = 3;
  const { currentItem, currentPage, updatePage } = usePagination(
    aggregatedItems,
    itemsPerPage
  );

  // Rest of the component remains the same...
  const displayCartItems =
    currentItem.length > 0 ? (
      currentItem.map((product: Product) => (
        <CartItemCard key={product.id} product={product} />
      ))
    ) : (
      <p> Cart is Empty</p>
    );
  return (
    <div className="product-list">
      {displayCartItems}
      <div className="productList-button">
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
    </div>
  );
};

export default Cart;
