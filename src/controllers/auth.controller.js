import User from "../models/user.model.js"
import bcrypt from "bcryptjs";

export const register = async (req, res) =>{
    const { email, password, username } = req.body;
    try{
        //creando el objeto usuario
        const newUser = new User({
            username,
            email,
            password
        })
    
        const userSaved = await newUser.save();
        res.json(userSaved)
        res.send("registrando")

    }catch(error){
        console.log(error)
    }
    
};

export const login = (req, res) =>{
    res.send("login")
};