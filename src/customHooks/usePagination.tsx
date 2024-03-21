import { useState, useMemo } from "react";
import { Product } from "../Component/ProductListing";

type PaginationReturnType = {
  currentItem: Product[];
  currentPage: number;
  updatePage: (currentPage: number) => void;
};

const usePagination = (
  products: Product[],
  itemsPerPage: number
): PaginationReturnType => {
  const [currentPage, setCurrentPage] = useState<number>(1);

  const { currentItem } = useMemo(() => {
    if (!products.length) return { currentItem: [] };
    const lastIndex =
      currentPage <= 0
        ? 1
        : Math.min(currentPage * itemsPerPage, products.length);
    const startingIndex = Math.max(
      0,
      currentPage * itemsPerPage - itemsPerPage
    );

    const currentItem = products.slice(startingIndex, lastIndex);
    return { currentItem };
  }, [currentPage, products, itemsPerPage]);

  const updatePage = (updatedPageNo: number) => {
    if (updatedPageNo <= 0) {
      return setCurrentPage(1);
    }
    if (updatedPageNo > Math.ceil(products?.length / itemsPerPage)) {
      return setCurrentPage(Math.ceil(products?.length / itemsPerPage));
    }
    setCurrentPage(updatedPageNo);
  };
  return { currentItem, currentPage, updatePage };
};

export default usePagination;
