import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        require:true,
        trim: true,//quitar los espacios vacíos
    },
    email :{
        type: String,
        require:true,
        trim: true,//quitar los espacios vacíos
        unique: true//para que no se repita
    },
    password:{
        type: String,
        require:true,
    }

},{
    timestamps:true,
})
export default mongoose.model('User', userSchema)