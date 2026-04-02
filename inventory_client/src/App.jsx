import { Routes, Route } from "react-router-dom";
import { Dashboard } from "./components/Dashboard";
import { Products } from "./components/Products";
import { DashboardLayout } from "./layouts/Dashboardlayout";
import { Productmodal } from "./components/Productmodal";
import { ConfirmationModal } from "./components/ConfirmationModal";

function App() {
  return (
    <Routes>
      <Route path="/" element={<DashboardLayout />}>
        <Route index element={<Dashboard />}></Route>
        <Route path="products" element={<Products />}></Route>
        <Route path="newproduct" element={<Productmodal />}></Route>
        <Route path="updateproduct" element={<Productmodal />}></Route>
        <Route path="deleteproduct" element={<ConfirmationModal />}></Route>
      </Route>
    </Routes>
  );
}

export default App;
