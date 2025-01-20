import mongoose from "mongoose"
import { MONGODB_URI } from "./config.js"

//crear la conexion a base de datos
export const connectDB = async () => {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log("Database Connected");
    } catch (error) {
        console.error("Error connecting to database", error);
        //si falla tenemos que salir si o si
        process.exit(1);
    }
}