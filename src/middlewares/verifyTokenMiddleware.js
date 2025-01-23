import { verifyToken } from "../utils/verifyToken.js";

export const verifyTokenMiddleware = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader){
            return res.status(400).json({ message: "Token de acceso no proporcionado" });
        } 

        const decoded = verifyToken(authHeader)

        console.log({decoded});

        req.user = decoded;
        
        next();

    } catch (error) {
        return res.status(500).json({ message: "Token de acceso invalido" });
    }
};