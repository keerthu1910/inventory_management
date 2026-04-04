import { useEffect, useState } from "react";
import api from "../api/axios";
import { ProductContext } from "../context/Productcontext";

export const Productprovider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const pageIncrement = () => {
    setPage((page) => page + 1);
  };
  const pageDecrement = () => {
    if (page === 1) {
      setPage(1);
    } else {
      setPage((page) => page - 1);
    }
  };
  const fetchProducts = async () => {
    try {
      const response = await api.get("api/products", {
        params: { page: page },
      });
      setProducts(response.data.data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (products.length === 0 && page > 1) {
      setPage((prev) => prev - 1);
    }
    fetchProducts();
  }, [page]);

  return (
    <ProductContext.Provider
      value={{
        products,
        loading,
        error,
        fetchProducts,
        pageIncrement,
        pageDecrement,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
