import { useContext, useEffect, useState } from "react";
import { ProductContext } from "../context/Productcontext";
import axios from "axios";
import { Stockgraph } from "./Stockgraph";

export const Dashboard = () => {
  const { products, loading, error } = useContext(ProductContext);
  const [totalStock, setTotalStock] = useState(0);
  const [lowStock, setLowStock] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);
  const [latestProducts, setLatestProducts] = useState([]);

  const fetchLatestProducts = async () => {
    const response = await axios.get("http://localhost:3000/api/products", {
      params: { sort: "createdAt", order: "desc", limit: 5 },
    });
    setLatestProducts(response.data.data);
  };

  const calculateStock = async () => {
    const stockDetails = await axios.get("http://localhost:3000/api/stock");
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
    <>
      <div className="flex flex-col mx-5 m-5">
        <p className="font-bold text-2xl">Products Overview</p>
        <div className="flex gap-5 items-center justify-center">
          <div className="my-5 bg-white w-44 h-28">
            <div className=" flex gap-2 items-center p-3">
              <span className="inline-block bg-green-800 w-3 h-3 rounded-full"></span>
              <p className="text-gray-500 font-medium">Product Types</p>
            </div>
            <p className="font-bold text-2xl p-3">{totalProducts}</p>
          </div>
          <div className="flex items-center justify-center h-15 w-px bg-gray-300"></div>
          <div className="my-5 bg-white w-44 h-28">
            <div className=" flex gap-2 items-center p-3">
              <span className="inline-block bg-red-800 w-3 h-3 rounded-full"></span>
              <p className="text-gray-500 font-medium">Low Stock</p>
            </div>
            <p className="font-bold text-2xl p-3">{lowStock}</p>
          </div>
          <div className="flex items-center justify-center h-15 w-px bg-gray-300"></div>

          <div className="my-5 bg-white w-44 h-28">
            <div className=" flex gap-2 items-center p-3">
              <span className="inline-block bg-green-800 w-3 h-3 rounded-full"></span>
              <p className="text-gray-500 font-medium">Total Quantity</p>
            </div>
            <p className="font-bold text-2xl p-3">{totalStock}</p>
          </div>
        </div>
        <Stockgraph />
      </div>
      <div className="w-[30%] bg-gray-200 rounded-lg mx-5 my-5">
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
    </>
  );
};
