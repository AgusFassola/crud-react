import User from "../models/user.model.js"
import bcrypt from "bcryptjs";
import { createAccessToken } from "../libs/jwt.js";

export const register = async (req, res) =>{
    const { email, password, username } = req.body;
    try{
        const userFound = await User.findOne({ email });
        if(userFound) return res.status(400).json({message:["User already exists"]});

        //encriptar contraseña
        const passwordHash = await bcrypt.hash(password, 10) 

        //creando el objeto usuario
        const newUser = new User({
            username,
            email,
            password: passwordHash,
        });
    
        const userSaved = await newUser.save();
        const token = await createAccessToken({id: userSaved._id})
            
        res.cookie('token', token)//guarda el token en la cookie
        return res.json({
            //eligiendo que datos mostrar
            id: userSaved._id,
            username: userSaved.username,
            email: userSaved.email,
            createdAt: userSaved.createdAt,
            updatedAt: userSaved.updatedAt,
        })

    }catch(error){
        res.status(500).json({ message:error.message })
    }
    
};

export const login = async (req, res) =>{
    const { email, password } = req.body;
    try{

        //buscar el usuario para ver si existe
        const userFound = await User.findOne({email});
        if(!userFound) return res.status(400).json({message:"User not found"});

        //comparar contraseña
        const isMatch = await bcrypt.compare(password, userFound.password)

        if(!isMatch) return res.status(400).json({message:"incorrect password"});
        
        const token = await createAccessToken({id: userFound._id });
            
        res.cookie('token', token)//guarda el token en la cookie
        return res.json({
            //eligiendo que datos mostrar
            id: userFound._id,
            username: userFound.username,
            email: userFound.email,
            createdAt: userFound.createdAt,
            updatedAt: userFound.updatedAt,
        })

    }catch(error){
        res.status(500).json({ message:error.message })
    }
};

export const logout = async (req, res) =>{
    res.cookie('token',"",{
        expires: new Date(0),
    });
    return res.sendStatus(200);
};

export const profile = async (req,res) => {
    const userFound = await User.findById(req.user.id);//verifico el id del usuario guardado en el req

    if(!userFound) return res.status(400).json({message:"user not found"})

     return res.json({
            //eligiendo que datos mostrar
            id: userFound._id,
            username: userFound.username,
            email: userFound.email,
            createdAt: userFound.createdAt,
            updatedAt: userFound.updatedAt,
        })
    res.send('profile')
}