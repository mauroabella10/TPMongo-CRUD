import express from 'express';
import { create, deleteUser, get, login, update } from '../controllers/userController.js';
import { verifyTokenMiddleware } from "../middlewares/verifyTokenMiddleware.js";

//crear enrutador
const userRoute = express.Router();

//Endopoints
userRoute.post("/create", create);
userRoute.get("/get", verifyTokenMiddleware, get);
userRoute.delete("/delete/:id", verifyTokenMiddleware, deleteUser);
userRoute.put("/update/:id", verifyTokenMiddleware, update);
userRoute.post("/login", login);

export default userRoute;