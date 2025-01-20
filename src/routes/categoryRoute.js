import { Router } from "express";
import { getCategory, createCategory, deleteCategory } from "../controllers/categoryController.js";

const categoryRoute = Router();

categoryRoute.get("/get", getCategory);
categoryRoute.post("/create", createCategory);
categoryRoute.delete("/delete/:id", deleteCategory);

export default categoryRoute;
