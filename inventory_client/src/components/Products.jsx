import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";

import { ProductContext } from "../context/Productcontext";

export const Products = () => {
  const { products, fetchProducts } = useContext(ProductContext);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);
  return (
    <>
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
            {products.map((item, index) => (
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
                        navigate("/deleteproduct", { state: { id: item._id } })
                      }
                    >
                      {"\u{1F5D1}"}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
