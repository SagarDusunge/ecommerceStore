import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import "./ProductListing.css";
import { useSelector } from "react-redux";
import Cart from "./Cart";
import { RootState } from "../Store/store";
import fetchProducts from "../Util/fetchHelper";
import usePagination from "../customHooks/usePagination";

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
  cartCount?: number;
};

const ProductListingPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const displayCart: boolean = useSelector(
    (state: RootState) => state?.displayCart
  );
  const itemsPerPage = 4;
  const { currentItem, currentPage, updatePage } = usePagination(
    products,
    itemsPerPage
  );
  const productsToDisplay = displayCart ? (
    <Cart />
  ) : currentItem.length ? (
    <div className="product-list">
      {currentItem.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
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
  ) : (
    <p>Fetching products.....</p>
  );

  useEffect(() => {
    // Fetch products from API or any data source
    fetchProducts("https://fakestoreapi.com/products").then(
      (data) => data && setProducts(data)
    );
  }, []);

  return <div style={{ width: "100% " }}>{productsToDisplay}</div>;
};

export default ProductListingPage;
