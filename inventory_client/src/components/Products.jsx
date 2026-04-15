import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import dayjs from "dayjs";

import { ProductContext } from "../context/Productcontext";

export const Products = () => {
  const { products, fetchProducts, pageIncrement, pageDecrement, page, limit } =
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
      <div className="flex flex-col lg:flex-row gap-2 w-full px-5 py-2">
        <div className="border rounded-lg flex items-center justify-between w-full lg:w-[50%] ">
          <input
            type="text"
            className="p-2 lg:p-3 w-full focus:outline-none"
            placeholder="Search for a product"
            value={searchvalue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <button
            className="p-2 lg:p-3 rounded-lg bg-red-600 text-white"
            onClick={searchProduct}
          >
            Search
          </button>
        </div>
        <div className="flex flex-wrap gap-1 w-full">
          <div className="p-1 lg:p-3 border rounded-lg flex flex-1 items-center">
            <select
              className="w-full min-w-[150px] max-w-sm text-base focus:outline-none"
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
          <div className="p-1 border min-w-[140px] rounded-lg flex justify-between flex-1 gap-2 items-center">
            <label htmlFor="lowstock">Low Stock</label>
            <input
              type="checkbox"
              value={lowstock}
              onChange={() => setLowStock(!lowstock)}
            />
          </div>
          <button
            className="p-1 bg-red-600 min-w-[140px] text-white font-semibold rounded-md flex-1"
            onClick={clearFilter}
          >
            Clear filters
          </button>
        </div>
      </div>
      <p className="text-green-800 font-bold py-2 px-5 inline-block">
        * RED higlight indicates that the item is currently in low stock!
      </p>
      <div>
        <div className="w-full flex flex-col items-center justify-center overflow-x-auto">
          <table className="border-separate border-spacing-2">
            <thead>
              <tr className="bg-red-600">
                <td className="p-3 text-white font-semibold">S No</td>
                <td className="p-3 text-white font-semibold">Product Name</td>
                <td className="p-3 text-white font-semibold  hidden md:table-cell lg:table-cell">
                  Product Category
                </td>
                <td className="p-3 text-white font-semibold  hidden md:table-cell lg:table-cell">
                  Product Quantity
                </td>
                <td className="p-3 text-white font-semibold  md:table-cell lg:table-cell">
                  Product Price
                </td>
                <td className="p-3 text-white font-semibold hidden lg:table-cell">
                  Date of Stock
                </td>
                <td className="p-3 text-white font-semibold  hidden lg:table-cell">
                  Date of update
                </td>
                <td className="p-3 text-white font-semibold">Actions</td>
              </tr>
            </thead>
            <tbody>
              {(searchedProducts.length > 0 ? searchedProducts : products).map(
                (item, index) => (
                  <tr
                    key={item._id}
                    className={`
  ${
    item.quantity <= 10
      ? "[&>*:nth-child(odd)]:bg-red-400 [&>*:nth-child(even)]:bg-red-400"
      : "[&>*:nth-child(odd)]:bg-gray-200 [&>*:nth-child(even)]:bg-gray-300"
  }
`}
                  >
                    <td className="p-1 md:p-3 lg:p-3">
                      {(page - 1) * limit + index + 1}
                    </td>
                    <td className="p-1 md:p-3 lg:p-3">{item.name}</td>
                    <td className="p-1 md:p-3 lg:p-3 hidden md:table-cell lg:table-cell">
                      {item.category}
                    </td>
                    <td className="p-1 md:p-3 lg:p-3 hidden md:table-cell lg:table-cell">
                      {item.quantity}
                    </td>
                    <td className="p-1 md:p-3 lg:p-3 md:table-cell lg:table-cell">
                      {item.price}
                    </td>
                    <td className="p-1 md:p-3 lg:p-3  hidden lg:table-cell">
                      {dayjs(item.createdAt).format("MM-DD-YYYY")}
                    </td>
                    <td className="p-1 md:p-3 lg:p-3 hidden lg:table-cell">
                      {dayjs(item.updatedAt).format("MM-DD-YYYY")}
                    </td>
                    <td className="p-1 md:p-3 lg:p-3">
                      <div className="flex gap-1 items-center justify-center">
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
        </div>
        <div className="flex justify-evenly items-center w-full">
          <button
            className="px-3 p-1 rounded-md bg-red-600 text-white"
            onClick={pageDecrement}
          >
            Prev
          </button>
          <button
            className="px-3 py-1 rounded-md bg-red-600 text-white"
            onClick={pageIncrement}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};
