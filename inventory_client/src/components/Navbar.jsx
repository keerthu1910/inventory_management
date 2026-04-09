export const Navbar = ({ showMenu, toggleMenu }) => {
  return (
    <div className="p-4 bg-red-600 w-screen flex gap-2">
      <button
        className="block lg:hidden md:hidden text-white font-bold text-xl"
        onClick={toggleMenu}
      >
        {"\u2630"}
      </button>

      <p className="font-bold text-2xl text-white text-left">Inventory</p>
    </div>
  );
};
