import { renderHook, act } from "@testing-library/react-hooks";
import usePagination from "./usePagination";

describe("usePagination Hook", () => {
  const products = Array.from({ length: 100 }, (_, index) => ({
    id: index,
    title: `Product ${index}`,
    price: 100,
    description: `Description for product ${index}`,
    category: "Category",
    image: "image-url",
    rating: { rate: 5, count: 10 },
  }));

  it("should initialize with the first page of products", () => {
    const { result } = renderHook(() => usePagination(products, 10));
    expect(result.current.currentPage).toBe(1);
    expect(result.current.currentItem.length).toBe(10);
  });

  it("should update current items when page changes", () => {
    const { result } = renderHook(() => usePagination(products, 10));

    act(() => {
      result.current.updatePage(2);
    });

    expect(result.current.currentPage).toBe(2);
    expect(result.current.currentItem.length).toBe(10);
    expect(result.current.currentItem[0].id).toBe(10); // Assuming IDs start at 0
  });

  it("should handle boundary conditions gracefully", () => {
    const { result } = renderHook(() => usePagination(products, 10));

    act(() => {
      result.current.updatePage(0); // Trying to set to a non-existent page
    });

    expect(result.current.currentPage).toBe(1);

    act(() => {
      result.current.updatePage(11); // Beyond the total number of pages
    });

    expect(result.current.currentPage).toBeLessThanOrEqual(10);
    expect(result.current.currentItem.length).toBeLessThanOrEqual(10);
  });

  it("should handle empty products array gracefully", () => {
    const { result } = renderHook(() => usePagination([], 10));

    expect(result.current.currentPage).toBe(1);
    expect(result.current.currentItem.length).toBe(0);
  });

  it("should handle a large number of products", () => {
    const products = Array.from({ length: 1000 }, (_, index) => ({
      id: index,
      title: `Product ${index}`,
      price: 100,
      description: `Description for product ${index}`,
      category: "Category",
      image: "image-url",
      rating: { rate: 5, count: 10 },
    }));

    const { result } = renderHook(() => usePagination(products, 10));

    expect(result.current.currentPage).toBe(1);
    expect(result.current.currentItem.length).toBe(10);

    act(() => {
      result.current.updatePage(2);
    });

    expect(result.current.currentPage).toBe(2);
    expect(result.current.currentItem.length).toBe(10);
    expect(result.current.currentItem[0].id).toBe(10);
  });
});
