import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import dayjs from "dayjs";

import { ProductContext } from "../context/Productcontext";

export const Products = () => {
  const { products, fetchProducts, pageIncrement, pageDecrement } =
    useContext(ProductContext);
  const [searchedProducts, setSearchedProducts] = useState([]);
  const [searchvalue, setSearchValue] = useState("");
  const [lowstock, setLowStock] = useState(false);
  const [category, setCategory] = useState("all");
  const navigate = useNavigate();

  const searchProduct = async () => {
    const result = await api.get("api/products/search", {
      params: {
        searchvalue: searchvalue,
        category: category,
        lowstock: lowstock,
      },
    });
    setSearchedProducts(result.data.data);
  };

  const clearFilter = () => {
    setCategory("all");
    setLowStock(false);
    setSearchedProducts([]);
  };

  useEffect(() => {
    fetchProducts();
  }, []);
  return (
    <div className="flex flex-col">
      <div className="flex items-center gap-2 mx-5 my-5">
        <div className="border rounded-lg flex justify-between w-[50%]">
          <input
            type="text"
            className="p-3"
            placeholder="Search for a product"
            value={searchvalue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <button
            className="p-3 rounded-lg bg-red-600 text-white"
            onClick={searchProduct}
          >
            Search
          </button>
        </div>
        <div className="p-3 border rounded-lg flex items-center">
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="all">All</option>
            <option value="home_kitchen">Home & Kitchen</option>
            <option value="clothing">Clothing</option>
            <option value="office">Office</option>
            <option value="groceries">Groceries</option>
            <option value="electronics">Electronics</option>
          </select>
        </div>
        <div className="p-3 border rounded-lg flex gap-2 items-center ">
          <label htmlFor="lowstock">Low Stock</label>
          <input
            type="checkbox"
            value={lowstock}
            onChange={() => setLowStock(!lowstock)}
          />
        </div>
        <button
          className="p-3 bg-red-600 text-white font-semibold rounded-md"
          onClick={clearFilter}
        >
          Clear filters
        </button>
      </div>
      <div className="mx-5 my-5">
        <table className="border-separate border-spacing-2">
          <thead>
            <tr className="bg-red-600">
              <td className="p-3 text-white font-semibold">S No</td>
              <td className="p-3 text-white font-semibold">Product Name</td>
              <td className="p-3 text-white font-semibold">Product Category</td>
              <td className="p-3 text-white font-semibold">Product Quantity</td>
              <td className="p-3 text-white font-semibold">Product Price</td>
              <td className="p-3 text-white font-semibold">Date of Stock</td>
              <td className="p-3 text-white font-semibold">Date of update</td>
              <td className="p-3 text-white font-semibold">Actions</td>
            </tr>
          </thead>
          <tbody>
            {(searchedProducts.length > 0 ? searchedProducts : products).map(
              (item, index) => (
                <tr
                  key={item._id}
                  className="[&>*:nth-child(odd)]:bg-gray-200 [&>*:nth-child(even)]:bg-gray-300"
                >
                  <td className="p-3">{index + 1}</td>
                  <td className="p-3">{item.name}</td>
                  <td className="p-3">{item.category}</td>
                  <td className="p-3">{item.quantity}</td>
                  <td className="p-3">{item.price}</td>
                  <td className="p-3">
                    {dayjs(item.createdAt).format("MM-DD-YYYY")}
                  </td>
                  <td className="p-3">
                    {dayjs(item.updatedAt).format("MM-DD-YYYY")}
                  </td>
                  <td className="p-3">
                    <div className="flex justify-between items-center">
                      <button
                        className="bg-white rounded-md p-1"
                        onClick={() => {
                          navigate("../updateproduct", { state: item });
                        }}
                      >
                        {"\u270E"}
                      </button>
                      <button
                        className="bg-white rounded-md p-1"
                        onClick={() =>
                          navigate("/deleteproduct", {
                            state: { id: item._id },
                          })
                        }
                      >
                        {"\u{1F5D1}"}
                      </button>
                    </div>
                  </td>
                </tr>
              ),
            )}
          </tbody>
        </table>
        <div className="flex justify-between tems-center">
          <button
            className="p-3 rounded-md bg-red-600 text-white"
            onClick={pageDecrement}
          >
            Prev
          </button>
          <button
            className="p-3 rounded-md bg-red-600 text-white"
            onClick={pageIncrement}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};
