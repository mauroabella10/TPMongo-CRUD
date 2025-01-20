import express from 'express';
import { createProduct, findProductById, findProductByName, getProducts, productDelete, updateProduct } from '../controllers/productController.js';

const productRoute = express.Router();

productRoute.post("/create", createProduct);
productRoute.get("/get", getProducts);
productRoute.get("/get-id/:id", findProductById);
productRoute.post("/get-name", findProductByName);
productRoute.put("/update/:id", updateProduct);
productRoute.delete("/delete/:id", productDelete);

export default productRoute;
