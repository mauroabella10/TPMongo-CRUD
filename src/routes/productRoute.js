import express from 'express';
import { createProduct, findProductById, findProductByName, getProducts, productDelete, updateProduct } from '../controllers/productController.js';
import { verifyTokenMiddleware } from "../middlewares/verifyTokenMiddleware.js";

const productRoute = express.Router();

productRoute.post("/create",verifyTokenMiddleware , createProduct);
productRoute.get("/get",verifyTokenMiddleware , getProducts);
productRoute.get("/get-id/:id",verifyTokenMiddleware , findProductById);
productRoute.post("/get-name",verifyTokenMiddleware , findProductByName);
productRoute.put("/update/:id",verifyTokenMiddleware , updateProduct);
productRoute.delete("/delete/:id",verifyTokenMiddleware , productDelete);

export default productRoute;
