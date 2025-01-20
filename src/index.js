import bodyParser from 'body-parser';
import express from 'express';
import { PORT } from './config.js';
import { connectDB } from './db.js';
import userRoute from './routes/userRoute.js';
import productRoute from './routes/productRoute.js';
import categoryRoute from './routes/categoryRoute.js';
import session from 'express-session';

//Servidor
const app = express();

//Transforma a json
app.use(bodyParser.json());

//Transofrma el cuerpo del mensaje para que sea leido
app.use(bodyParser.urlencoded({extended: true}));

//generamos el uso de la sesion
app.use(
    session({
        secret: "secret",
        resave: false,  
        saveUninitialized: false, 
}))

//conectamos la base
connectDB();

//rutas
app.use("/api/user", userRoute);
app.use("/api/category", categoryRoute);
app.use("/api/product", productRoute);


//ultimo
app.listen(PORT, () =>{
    console.log(`Server running at ${PORT}`);
});