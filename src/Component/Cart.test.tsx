import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import Cart from "./Cart";
import "@testing-library/jest-dom/extend-expect";

const mockStore = configureStore([]);
const store = mockStore({
  cartItems: [
    { id: 1, title: "Product 1", price: 100, image: "url1" },
    { id: 1, title: "Product 1", price: 100, image: "url1" },
    { id: 2, title: "Product 2", price: 200, image: "url2" },
  ],
});

describe("Cart Component", () => {
  it("renders cart items correctly", async () => {
    render(
      <Provider store={store}>
        <Cart />
      </Provider>
    );

    // Check if the cart items are rendered

    expect(screen.getByText("Product 1")).toBeInTheDocument();
    expect(screen.getByText("Product 2")).toBeInTheDocument();
    expect(screen.getByText("Quantity: 1")).toBeInTheDocument();
    expect(screen.getByText("Quantity: 2")).toBeInTheDocument();
  });

  it('clears cart items when "Clear Cart" button is clicked', () => {
    render(
      <Provider store={store}>
        <Cart />
      </Provider>
    );

    // Simulate clicking the "Clear Cart" button
    fireEvent.click(screen.getByText("Clear Cart"));

    const actions = store.getActions();
    expect(actions[0]).toEqual({ type: "CLEAR_CART" });
  });

  it("does not clear cart when there are no items", () => {
    const emptyStore = mockStore({
      cartItems: [],
    });

    render(
      <Provider store={emptyStore}>
        <Cart />
      </Provider>
    );

    fireEvent.click(screen.getByText("Clear Cart"));

    const actions = emptyStore.getActions();
    expect(actions).toHaveLength(0);
  });
});
