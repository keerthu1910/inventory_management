import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import productRoutes from "./routes/productRoutes.js";
import stockRoutes from "./routes/stockRoutes.js";

import mongoDB from "./config/db.js";
dotenv.config();
const app = express();
const port = process.env.PORT || 3001;
app.use(cors());
app.use(express.json());
mongoDB();
app.use("/api", productRoutes);
app.use("/api", stockRoutes);

app.listen(port, "0.0.0.0", (req, res) => {
  console.log(`server running in port ${port} `);
});
