import { Outlet } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { Sidebar } from "../components/Sidebar";
import { ToastContainer } from "react-toastify";

export const DashboardLayout = () => {
  return (
    <div className="flex flex-col h-screen">
      <ToastContainer />
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <Outlet />
      </div>
    </div>
  );
};
