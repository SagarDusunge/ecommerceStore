const fetchProducts = async (url: string) => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching products:", error);
    return null;
  }
};

export default fetchProducts;
