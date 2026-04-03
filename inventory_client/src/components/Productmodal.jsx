import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../api/axios";

export const Productmodal = () => {
  const [showModal, setShowModal] = useState(true);
  const [updateId, setUpdateId] = useState("");
  const [updateData, setUpdateData] = useState(false);
  const [newproduct, setNewProduct] = useState({
    name: "",
    category: "",
    price: 0,
    quantity: 0,
  });
  const navigate = useNavigate();
  const product_data = useLocation();

  const handleUpdate = async () => {
    if (
      newproduct.name === "" ||
      newproduct.category === "" ||
      newproduct.price === 0 ||
      newproduct.quantity === 0
    ) {
      toast.error("Please fill in all details", { theme: "colored" });
    } else {
      try {
        const response = await api.put(`api/products/${updateId}`, {
          data: newproduct,
        });
        if (response.status === 200) {
          toast.success("Product updated successfully", { theme: "colored" });
        }
      } catch (error) {
        toast.error(error.response.data.message, { theme: "colored" });
      } finally {
        setShowModal(false);
        navigate("/");
      }
    }
  };

  const handleProduct = async () => {
    if (
      newproduct.name === "" ||
      newproduct.category === "" ||
      newproduct.price === 0 ||
      newproduct.quantity === 0
    ) {
      toast.error("Please fill in all details", { theme: "colored" });
    } else {
      try {
        const response = await api.post("api/products", {
          data: newproduct,
        });
        if (response.status === 200) {
          toast.success("Product entered successfully", { theme: "colored" });
        }
      } catch (error) {
        toast.error(error.response.data.message, { theme: "colored" });
      } finally {
        setShowModal(false);
        navigate("/");
      }
    }
  };

  useEffect(() => {
    if (product_data.state !== null) {
      setUpdateData(true);
      setNewProduct({
        name: product_data.state.name,
        category: product_data.state.category,
        price: product_data.state.price,
        quantity: product_data.state.quantity,
      });
      setUpdateId(product_data.state._id);

      document.body.style.overflow = "hidden";

      return () => {
        document.body.style.overflow = "auto";
      };
    }
  }, []);

  return (
    showModal && (
      <div
        className="bg-black/50 fixed inset-0 flex flex-col items-center justify-center"
        onClick={() => {
          setShowModal(false);
          navigate("/");
        }}
      >
        <div
          className="w-[50%] bg-white rounded-lg p-4"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-3 grid grid-cols-2 gap-2 bg-gray-300 rounded-sm items-center my-1">
            <label htmlFor="productname">Product name</label>
            <input
              className="bg-white p-2 rounded-sm"
              id="productname"
              type="text"
              value={newproduct.name}
              onChange={(e) =>
                setNewProduct({ ...newproduct, name: e.target.value })
              }
            />
          </div>
          <div className="p-3 grid grid-cols-2 gap-2 bg-gray-300 rounded-sm items-center my-1">
            <label htmlFor="product_category">Category</label>
            <select
              className="bg-white p-2 rounded-sm"
              id="product_category"
              value={newproduct.category}
              onChange={(e) =>
                setNewProduct({ ...newproduct, category: e.target.value })
              }
            >
              <option value="home_kitchen">Home & Kitchen</option>
              <option value="clothing">Clothing</option>
              <option value="office">Office</option>
              <option value="groceries">Groceries</option>
              <option value="electronics">Electronics</option>
            </select>
          </div>
          <div className="p-3 grid grid-cols-2 gap-2 bg-gray-300 rounded-sm items-center my-1">
            <label htmlFor="productprice">Product price</label>
            <input
              className="bg-white p-2 rounded-sm"
              id="productprice"
              type="number"
              value={newproduct.price}
              onChange={(e) =>
                setNewProduct({ ...newproduct, price: e.target.value })
              }
            />
          </div>

          <div className="p-3 grid grid-cols-2 gap-2 bg-gray-300 rounded-sm items-center my-1">
            <label htmlFor="productquantity">Product quantity</label>
            <input
              className="bg-white p-2 rounded-sm"
              id="productquantity"
              type="number"
              value={newproduct.quantity}
              onChange={(e) =>
                setNewProduct({ ...newproduct, quantity: e.target.value })
              }
            />
          </div>
          <div className="flex items-center justify-center">
            <button
              className="p-4 bg-red-600 rounded-md text-white mt-2"
              onClick={() => {
                updateData ? handleUpdate() : handleProduct();
              }}
            >
              {updateData ? "Update Product" : "Add Product"}
            </button>
          </div>
        </div>
      </div>
    )
  );
};
