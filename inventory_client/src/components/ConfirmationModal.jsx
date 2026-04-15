import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../api/axios";
import { toast } from "react-toastify";

export const ConfirmationModal = () => {
  const [showModal, setShowModal] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const productId = location.state.id;
  const handleDelete = async () => {
    try {
      const response = await api.delete(`api/products/${productId}`);
      if (response.status === 200) {
        toast.success("Product deleted successfully", { theme: "colored" });
      }
    } catch (error) {
      toast.error(error.response.message, { theme: "colored" });
    } finally {
      setShowModal(false);
      navigate("/");
    }
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);
  return (
    showModal && (
      <div
        className="bg-black/50 inset-0 fixed flex flex-col items-center justify-center"
        onClick={() => {
          setShowModal(false);
          navigate(-1);
        }}
      >
        <div
          className="bg-white min-w-[100px] h-[20%] m-3 rounded-lg p-3 flex flex-col justify-between"
          onClick={(e) => e.stopPropagation()}
        >
          <p className="text-black font-bold text-xl">Delete Confirmation</p>
          <p className="text-black text-center ">
            Are you sure you want to delete the product?
          </p>
          <div className="flex items-end justify-end gap-4">
            <button
              className="bg-white rounded-lg px-4 py-1 text-black font-semibold"
              onClick={() => navigate(-1)}
            >
              No
            </button>
            <button
              className="bg-red-600 rounded-lg px-4 py-1 text-white font-semibold"
              onClick={handleDelete}
            >
              Yes
            </button>
          </div>
        </div>
      </div>
    )
  );
};
