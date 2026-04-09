import { useNavigate } from "react-router-dom";
export const Sidebar = ({ showMenu, toggleMenu }) => {
  const menu = ["Dashboard", "Products", "Add Product"];
  const navigate = useNavigate();
  return showMenu ? (
    <div className="fixed inset-0 bg-black/50 w-full">
      <div className="w-[40%] h-screen items-start justify-center bg-white border-r border-gray-300">
        <button className="font-bold text-xl" onClick={toggleMenu}>
          {"\u2630"}
        </button>
        <ul className="w-full mx-2">
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
                toggleMenu();
              }}
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  ) : (
    <div className="w-[20%] hidden md:block lg:block items-start justify-center bg-white border-r border-gray-300">
      <ul className="w-full mx-2">
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
              toggleMenu();
            }}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};
