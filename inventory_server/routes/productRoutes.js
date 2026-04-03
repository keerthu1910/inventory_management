import express from "express";
const router = express.Router();

import ProductController from "../controllers/productController.js";
const productController = new ProductController();

router.post("/products", productController.createProduct);
router.get("/products", productController.getAllProducts);
router.get("/products/search", productController.searchProduct);
router.put("/products/:id", productController.updateProduct);
router.delete("/products/:id", productController.deleteProduct);

export default router;
