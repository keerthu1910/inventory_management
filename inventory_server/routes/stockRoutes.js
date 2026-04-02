import express from "express";
import StockController from "../controllers/stockController.js";

const router = express.Router();
const stockController = new StockController();

router.get("/stock", stockController.getStockDetails);

export default router;
