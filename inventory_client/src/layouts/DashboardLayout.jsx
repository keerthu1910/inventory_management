import { Outlet } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { Sidebar } from "../components/Sidebar";
import { ToastContainer } from "react-toastify";
import { useState } from "react";

export const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleMenu = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  return (
    <div className="flex flex-col h-screen w-screen">
      <ToastContainer />
      <Navbar showMenu={isSidebarOpen} toggleMenu={toggleMenu} />
      <div className="flex flex-1 w-full">
        <Sidebar showMenu={isSidebarOpen} toggleMenu={toggleMenu} />
        <div className="flex-1">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
