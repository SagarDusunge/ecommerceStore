import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard.tsx";
import "./ProductListing.css";
import { useDispatch, useSelector } from "react-redux";
import Cart from "./Cart.tsx";
import { RootState } from "../Store/store.tsx";
import fetchProducts from "../Util/fetchHelper.tsx";
import usePagination from "../customHooks/usePagination.tsx";

export type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
};

const ProductListingPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const dispatch = useDispatch();
  const displayCart: boolean = useSelector(
    (state: RootState) => state?.displayCart
  );
  const itemsPerPage = 4;
  const { currentItem, currentPage, updatePage } = usePagination(
    products,
    itemsPerPage
  );
  console.log("product listing rendered")
  const productsToDisplay = displayCart ? (
    <Cart />
  ) : currentItem.length ? (
    <div className="product-list">
      {currentItem.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  ) : (
    <p>
      Error fetching products...please check you Internet connection and try
      again{" "}
    </p>
  );

  const returnToHomeHandler = () => {
    dispatch({
      type: "TOGGLE_CART",
      payload: false,
    });
  };

  useEffect(() => {
    // Fetch products from API or any data source
    fetchProducts("https://fakestoreapi.com/products").then(
      (data) => data && setProducts(data)
    );
  }, []);

  return (
    <div style={{ width: "100% " }}>
      <h1 onClick={returnToHomeHandler}>SagaMart</h1>
      {productsToDisplay}
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

export default ProductListingPage;
