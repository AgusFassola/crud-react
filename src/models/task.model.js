import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    title:{
        type: String,
        require:true,
        trim: true,//quitar los espacios vacíos
    },
    description :{
        type: String,
        require:true,
        trim: true,//quitar los espacios vacíos

    },
    date:{
        type: Date,
        default:Date.now,
    },
    //agregar datos de otro objeto
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User', //a cual objeto hacemos referencia
        require: true
    }
},{
    timestamps:true,
})
export default mongoose.model('Task', taskSchema)