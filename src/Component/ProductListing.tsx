import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard.tsx";
import "./ProductListing.css";
import { useDispatch, useSelector } from "react-redux";
import Cart from "./Cart.tsx";
import { RootState } from "../Store/store.tsx";

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
  const returnToHomeHandler = () => {
    dispatch({
      type: "TOGGLE_CART",
      payload: false,
    });
  };
  useEffect(() => {
    // Fetch products from API or any data source
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://fakestoreapi.com/products");
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);
  let itemsPerPage = 4;
  let lastIndex: number =
    currentPage * itemsPerPage > products.length
      ? products.length
      : currentPage * itemsPerPage + 1;
  let startingIndex: number = lastIndex - itemsPerPage;
  const currentItem = products.slice(startingIndex, lastIndex);

  return (
    <div style={{ width: "100% " }}>
      <h1 onClick={returnToHomeHandler}>SagaMart</h1>
      {displayCart ? (
        <Cart />
      ) : (
        <div className="product-list">
          {currentItem.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
      <button
        onClick={() => {
          currentPage > 1 && setCurrentPage((prevpage) => prevpage - 1);
        }}
      >
        {currentPage}
      </button>
      {
        <button
          onClick={() => {
            if (currentPage * itemsPerPage < products.length) {
              setCurrentPage((prevpage) => prevpage + 1);
            }
          }}
        >
          {currentPage + 1}
        </button>
      }
    </div>
  );
};

export default ProductListingPage;
