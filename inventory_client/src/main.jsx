import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { Productprovider } from "./providers/Productprovider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Productprovider>
        <App />
      </Productprovider>
    </BrowserRouter>
  </StrictMode>,
);
