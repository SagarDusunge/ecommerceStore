import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ProductListing from "./ProductListing.tsx";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import fetchMock from "jest-fetch-mock";
import "@testing-library/jest-dom/extend-expect";

fetchMock.enableMocks();

const mockStore = configureStore();
const store = mockStore({
  displayCart: false,
  cartItems: [],
});

describe("ProductListing", () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it("test_ProductListingPage_fetch_and_display_products", async () => {
    fetchMock.mockResponseOnce(
      JSON.stringify([
        {
          id: 1,
          title: "Product 1",
          price: 100,
          description: "Description 1",
          category: "Category 1",
          image: "ImageURL1",
          rating: { rate: 4.5, count: 120 },
        },
        {
          id: 2,
          title: "Product 2",
          price: 200,
          description: "Description 2",
          category: "Category 2",
          image: "ImageURL2",
          rating: { rate: 4.2, count: 90 },
        },
      ])
    );

    render(
      <Provider store={store}>
        <ProductListing />
      </Provider>
    );
    await waitFor(() => {
      expect(screen.getByText("Product 1")).toBeInTheDocument();
      expect(screen.getByText("Product 2")).toBeInTheDocument();
    });
  });

  it("test_ProductListing_pagination", async () => {
    const products = new Array(10).fill(null).map((_, index) => ({
      id: index,
      title: `Product ${index}`,
      price: (index + 1) * 100,
      description: `Description ${index + 1}`,
      category: `Category ${index + 1}`,
      image: `ImageURL${index + 1}`,
      rating: { rate: 4.5, count: 120 },
    }));

    fetchMock.mockResponseOnce(JSON.stringify(products));

    render(
      <Provider store={store}>
        <ProductListing />
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByText("Product 1")).toBeInTheDocument();
      expect(screen.queryByText("Product 5")).not.toBeInTheDocument();
    });

    userEvent.click(screen.getByText("2"));

    await waitFor(() => {
      expect(screen.getByText("Product 7")).toBeInTheDocument();
      expect(screen.queryByText("Product 1")).not.toBeInTheDocument();
    });
  });
});
