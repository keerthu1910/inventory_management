import { useNavigate } from "react-router-dom";
export const Sidebar = () => {
  const menu = ["Dashboard", "Products", "Add Product"];
  const navigate = useNavigate();
  return (
    <div className="w-[20%] flex items-start justify-center bg-white border-r border-gray-300">
      <ul>
        {menu.map((item, index) => (
          <li
            className="my-4 w-full font-semibold p-2 hover:bg-red-600 hover:rounded-md hover:text-white cursor:pointer"
            key={index}
            onClick={() => {
              item === "Dashboard"
                ? navigate("/")
                : item === "Products"
                  ? navigate("products")
                  : navigate("newproduct");
            }}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};
