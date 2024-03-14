import React from "react";
import CartItemCard from "./CartItemCard";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../Store/store";
import { Product } from "./ProductListing";
import usePagination from "../customHooks/usePagination";
import "./Cart.css";

const Cart: React.FC = () => {
  const ResetPageNo = 1;
  const itemsPerPage = 3;
  const dispatch = useDispatch();
  const addedcartItems: Product[] = useSelector(
    (state: RootState) => state.cartItems
  );

  const clearCartHandler = () => {
    if (!addedcartItems.length) return;
    dispatch({
      type: "CLEAR_CART",
    });
    updatePage(ResetPageNo);
  };

  // Aggregate products by id and count duplicates as cartCount
  const aggregatedItems: Product[] = Object.values(
    addedcartItems.reduce((acc, product) => {
      if (!acc[product.id]) {
        acc[product.id] = {
          ...JSON.parse(JSON.stringify(product)), // we can use clonedeep from lodash
          cartCount: 1,
        }; // Initialize if not present
      } else {
        acc[product.id].cartCount = (acc[product.id].cartCount ?? 0) + 1; // Increment cartCount for duplicates
      }
      return acc;
    }, {} as Record<number, Product>)
  );

  const { currentItem, currentPage, updatePage } = usePagination(
    aggregatedItems,
    itemsPerPage
  );

  const cartButtonElements = (
    <div className="productList-button">
      <button
        onClick={() => {
          addedcartItems.length && updatePage(currentPage - 1);
        }}
      >
        {currentPage}
      </button>
      <button
        onClick={() => {
          addedcartItems.length && updatePage(currentPage + 1);
        }}
      >
        {currentPage + 1}
      </button>
    </div>
  );

  const displayCartItems =
    currentItem.length > 0 ? (
      currentItem.map((product: Product) => (
        <CartItemCard key={product.id} product={product} />
      ))
    ) : (
      <p>Your cart is Empty</p>
    );

  return (
    <>
      <div data-testid="cart" className="product-list">
        {displayCartItems}
      </div>
      {currentItem.length ? cartButtonElements : null}
      <button id="clear_cart" onClick={clearCartHandler}>
        Clear Cart
      </button>
    </>
  );
};

export default Cart;
