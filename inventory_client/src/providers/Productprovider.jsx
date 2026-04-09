import { useEffect, useState } from "react";
import api from "../api/axios";
import { ProductContext } from "../context/Productcontext";

export const Productprovider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [limit, setLimit] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);
  const pageIncrement = () => {
    const totalPages = Math.ceil(totalProducts / limit);
    if (page >= totalPages) {
      setPage(page);
    } else {
      setPage((page) => page + 1);
    }
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
      const response = await api.get("/products", {
        params: { page: page },
      });
      setProducts(response.data.data);
      setLimit(response.data.limit);
      setTotalProducts(response.data.total);
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
        page,
        limit,
        fetchProducts,
        pageIncrement,
        pageDecrement,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
