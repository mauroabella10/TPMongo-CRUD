import { Router } from "express";
import { getCategory, createCategory, deleteCategory } from "../controllers/categoryController.js";
import { verifyTokenMiddleware } from "../middlewares/verifyTokenMiddleware.js";

const categoryRoute = Router();

categoryRoute.get("/get",verifyTokenMiddleware , getCategory);
categoryRoute.post("/create",verifyTokenMiddleware , createCategory);
categoryRoute.delete("/delete/:id",verifyTokenMiddleware , deleteCategory);

export default categoryRoute;
