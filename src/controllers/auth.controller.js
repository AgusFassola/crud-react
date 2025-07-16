import User from "../models/user.model.js"

export const register = (req, res) =>{
    const { email, password, username } = req.body;
    
    //creando el objeto usuario
    const newUser = new User({
        username,
        email,
        password
    })
    
    res.send("registrando")
};

export const login = (req, res) =>{
    res.send("login")
};