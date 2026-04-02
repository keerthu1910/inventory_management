import { Navbar } from "../components/Navbar";
import { DashboardLayout } from "../layouts/Dashboardlayout";

export const Landingpage = () => {
  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <DashboardLayout />
    </div>
  );
};
