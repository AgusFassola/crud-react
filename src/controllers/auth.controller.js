import User from "../models/user.model.js"
import bcrypt from "bcryptjs";

export const register = async (req, res) =>{
    const { email, password, username } = req.body;
    try{

        //encriptar contraseña
        const passwordHash = await bcrypt.hash(password, 10) 

        //creando el objeto usuario
        const newUser = new User({
            username,
            email,
            password: passwordHash,
        });
    
        const userSaved = await newUser.save();
        res.json({
            //eligiendo que datos mostrar
            id: userSaved._id,
            username: userSaved.username,
            email: userSaved.email,
            createdAt: userSaved.createdAt,
            updatedAt: userSaved.updatedAt,
        })
        res.send("registrando")

    }catch(error){
        console.log(error)
    }
    
};

export const login = (req, res) =>{
    res.send("login")
};