import { verifyToken } from "../utils/verifyToken.js";

export const verifyTokenMiddleware = (req, res, next) => {
    try {
        const authHeader = req.session.token;

        if (!authHeader || !authHeader.startWith("Bearer ")){
            return res.status(400).json({ message: "Token de acceso no proporcionado" });
        } 

        const token = authHeader.split(" ")[1];

        const decoded = verifyToken(token)

        console.log({decoded});

        req.user = decoded;
        
        next();
    } catch (error) {
        return res.status(400).json({ message: "Token de acceso invalido" });
    }
};