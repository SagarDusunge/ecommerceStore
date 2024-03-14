import React from "react";
import { render } from "@testing-library/react";
import CartItemCard from "./CartItemCard";
import "@testing-library/jest-dom/extend-expect";

describe("CartItemCard", () => {
  it("renders product title and price", () => {
    const product = {
      id: 1,
      title: "Test Product",
      price: 100,
      description: "A test product",
      category: "test category",
      image: "test-image.jpg",
      rating: { rate: 4.5, count: 10 },
    };

    const { getByText } = render(<CartItemCard product={product} />);
    expect(getByText("Test Product")).toBeInTheDocument();
    expect(getByText("₹100")).toBeInTheDocument();
  });

  it("does not render quantity label if cartCount is not provided or is 0", () => {
    const product = {
      id: 1,
      title: "Test Product",
      price: 100,
      description: "A test product",
      category: "test category",
      image: "test-image.jpg",
      rating: { rate: 4.5, count: 10 },
    };

    const { queryByText } = render(<CartItemCard product={product} />);
    expect(queryByText("Quantity:")).toBeNull();
  });

  it("renders without crashing", () => {
    const product = {
      id: 1,
      title: "Test Product",
      price: 100,
      description: "A test product",
      category: "test category",
      image: "test-image.jpg",
      rating: { rate: 4.5, count: 10 },
    };

    render(<CartItemCard product={product} />);
  });
});
