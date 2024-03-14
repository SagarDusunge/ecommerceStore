import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { Provider } from "react-redux";
import configureStore, { MockStoreEnhanced } from "redux-mock-store";
import ProductCard from "./ProductCard";
import "@testing-library/jest-dom/extend-expect";
import { Product } from "./ProductListing";
const mockStore = configureStore([]);

describe("ProductCard", () => {
  let store: MockStoreEnhanced<unknown>;
  let product: Product;

  beforeEach(() => {
    store = mockStore({});
    product = {
      id: 1,
      title: "Test Product",
      price: 100,
      description: "Test Description",
      category: "Test Category",
      image: "test-image.jpg",
      rating: { rate: 4.5, count: 10 },
    };
  });

  test("renders product information correctly", () => {
    const { getByText, getByAltText } = render(
      <Provider store={store}>
        <ProductCard product={product} />
      </Provider>
    );

    expect(getByText("Test Product")).toBeInTheDocument();
    expect(getByText("₹100")).toBeInTheDocument();
    expect(getByAltText("productImg")).toHaveAttribute("src", "test-image.jpg");
  });

  test('dispatches action on "Add to Cart" button click', () => {
    const { getByText } = render(
      <Provider store={store}>
        <ProductCard product={product} />
      </Provider>
    );

    fireEvent.click(getByText("Add to Cart"));
    const actions = store.getActions();
    expect(actions[0].type).toEqual("ADD_ITEM");
    expect(actions[0].payload).toEqual({
      id: 1,
      title: "Test Product",
      price: 100,
      image: "test-image.jpg",
    });
  });
});
