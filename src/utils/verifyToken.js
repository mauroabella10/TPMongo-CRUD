import jwt from 'jsonwebtoken';

export function verifyToken(token) {
    try {
       const decoded = jwt.verify(token, "secret");

       return decoded;
    } catch (error) {
        return Error("Token invalid");
    }
};