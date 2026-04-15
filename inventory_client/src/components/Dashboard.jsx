import { useContext, useEffect, useState } from "react";
import { ProductContext } from "../context/Productcontext";
import api from "../api/axios";
import { Stockgraph } from "./Stockgraph";

export const Dashboard = () => {
  const { products, loading, error } = useContext(ProductContext);
  const [totalStock, setTotalStock] = useState(0);
  const [lowStock, setLowStock] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);
  const [latestProducts, setLatestProducts] = useState([]);

  const fetchLatestProducts = async () => {
    const response = await api.get("api/products", {
      params: { sort: "createdAt", order: "desc", limit: 5 },
    });
    setLatestProducts(response.data.data);
  };

  const calculateStock = async () => {
    const stockDetails = await api.get("api/stock");
    setLowStock(stockDetails.data.data.lowstock);
    setTotalProducts(stockDetails.data.data.totalCategories);
    setTotalStock(stockDetails.data.data.totalProducts);
  };

  useEffect(() => {
    calculateStock();
    fetchLatestProducts();
  }, [products]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Unable to fetch Data</div>;

  return (
    <div className="flex flex-col md:flex-col lg:flex-row gap-5 p-6">
      <div className="flex-1 max-w-[900px]">
        <p className="font-bold text-2xl">Products Overview</p>
        <div className=" grid grid-cols-1 md:flex md:items-center gap-1 mt-2">
          <div className="flex flex-row md:flex-col md:items-start items-center justify-between min-w-[300px] bg-gray-200 rounded-lg lg:bg-white lg:min-w-[150px] md:bg-white md:min-w-[150px]">
            <div className=" flex gap-2 items-center p-3">
              <span className="inline-block bg-green-800 w-3 h-3 rounded-full"></span>
              <p className="text-gray-500 font-medium">Product Types</p>
            </div>
            <p className="font-bold text-2xl p-3">{totalProducts}</p>
          </div>
          <div className="hidden md:flex lg:flex items-center justify-center h-15 w-px bg-gray-300"></div>
          <div className="flex flex-row md:flex-col md:items-start items-center justify-between min-w-[300px] bg-gray-200 rounded-lg md:bg-white lg:bg-white lg:min-w-[150px] md:min-w-[150px]">
            <div className=" flex gap-2 items-center p-3">
              <span className="inline-block bg-red-800 w-3 h-3 rounded-full"></span>
              <p className="text-gray-500 font-medium">Low Stock</p>
            </div>
            <p className="font-bold text-2xl p-3">{lowStock}</p>
          </div>
          <div className="hidden md:flex lg:flex items-center justify-center h-15 w-px bg-gray-300"></div>

          <div className="flex flex-row md:flex-col md:items-start items-center justify-between min-w-[300px] bg-gray-200 rounded-lg md:bg-white lg:bg-white lg:min-w-[150px] md:min-w-[150px]">
            <div className=" flex gap-2 items-center p-3">
              <span className="inline-block bg-green-800 w-3 h-3 rounded-full"></span>
              <p className="text-gray-500 font-medium">Total Quantity</p>
            </div>
            <p className="font-bold text-2xl p-3">{totalStock}</p>
          </div>
        </div>
        <div className="w-full max-w-[900px]">
          <Stockgraph />
        </div>
      </div>
      <div className="min-w-[300px] bg-gray-200 rounded-lg my-5">
        <p className="font-bold text-2xl mx-5 my-5 text-center">
          Newly Added Stock Items
        </p>
        {latestProducts.map((item) => (
          <div
            className="flex bg-white mx-3 my-3 rounded-md p-3 items-center justify-between hover:scale-105"
            key={item._id}
          >
            <p className="font-semibold">{item.name}</p>
            <p className="font-medium">Stock:{item.quantity}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
