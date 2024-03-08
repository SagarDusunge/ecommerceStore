import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard.tsx";
import "./ProductListing.css";
import { useDispatch, useSelector } from "react-redux";
import Cart from "./Cart.tsx";
import { RootState } from "../Store/store.tsx";
import fetchProducts from "../Util/fetchHelper.tsx";

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
  const [currentPage, setCurrentPage] = useState<number>(1);
  const dispatch = useDispatch();
  const displayCart: boolean = useSelector(
    (state: RootState) => state?.displayCart
  );
  const itemsPerPage = 4;
  const lastIndex: number =
    currentPage * itemsPerPage > products.length
      ? products.length
      : currentPage * itemsPerPage + 1;
  const startingIndex: number = lastIndex - itemsPerPage;
  const currentItem = products.slice(startingIndex, lastIndex);

  const productToDisplay = displayCart ? (
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
      {productToDisplay}
      <button
        onClick={() => {
          currentPage > 1 && setCurrentPage((prevpage) => prevpage - 1);
        }}
      >
        {currentPage}
      </button>
      <button
        onClick={() => {
          if (currentPage * itemsPerPage < products.length) {
            setCurrentPage((prevpage) => prevpage + 1);
          }
        }}
      >
        {currentPage + 1}
      </button>
    </div>
  );
};

export default ProductListingPage;
