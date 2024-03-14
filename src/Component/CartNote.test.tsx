import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore, { MockStoreEnhanced } from "redux-mock-store";
import CartNote from "./CartNote";
import "@testing-library/jest-dom/extend-expect";

const mockStore = configureStore([]);

describe("CartNote Component", () => {
  let store: MockStoreEnhanced<unknown>;

  beforeEach(() => {
    store = mockStore({
      cartItems: [],
    });
  });

  test("renders without crashing", () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <CartNote />
      </Provider>
    );

    expect(getByTestId("cart_note")).toBeInTheDocument();
  });

  test("dispatches TOGGLE_CART action on click", () => {
    const { container } = render(
      <Provider store={store}>
        <CartNote />
      </Provider>
    );

    const cartIcon = container.querySelector(".cart_icon");
    if (cartIcon) {
      fireEvent.click(cartIcon);
    }
    expect((store as MockStoreEnhanced<unknown>).getActions()).toContainEqual({
      type: "TOGGLE_CART",
      payload: true,
    });
  });

  test("does not dispatch any action when targetElement is not cart icon or cart count", () => {
    const { container } = render(
      <Provider store={store}>
        <CartNote />
      </Provider>
    );

    fireEvent.click(container);
    expect((store as MockStoreEnhanced<unknown>).getActions()).toEqual([]);
  });

  test("displays correct count based on cart items", () => {
    const mockCartItems = [
      { id: 1, name: "Item 1" },
      { id: 2, name: "Item 2" },
      { id: 3, name: "Item 3" },
    ];
    store = mockStore({
      cartItems: mockCartItems,
    });

    const { getByTestId } = render(
      <Provider store={store}>
        <CartNote />
      </Provider>
    );

    const counterSpan = getByTestId("counter_span");
    expect(counterSpan.textContent).toBe(String(mockCartItems.length));
  });
});
