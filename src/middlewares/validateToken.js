import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../config.js";

export const authRequired = (req,res,next)=>{
    const {token} = req.cookies;

    if(!token) return res.status(401).json({message:"no token"})

    jwt.verify(token, TOKEN_SECRET, (err, user) =>{
        if(err) return res.status(403).json({message:"invalid token"});

        req.user = user;//guardo todo el usuario guardado en el inicio de sesion en el request para ser usado despues

        next();
    })
};