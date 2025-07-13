import mongoose from "mongoose";

//el llamado a la bd tiene que ser asincrono
export const connectDB = async () =>{
    //como pude fallar se lo coloca en un try catch
    try{
        console.log("llegué")
        const url = "mongodb+srv://agusfassola:antesydespues@cluster0.q0ebaqb.mongodb.net/crud?retryWrites=true&w=majority&appName=Cluster0";
        await mongoose.connect(url);

        console.log("db conected")
    }catch(error){
        console.log("error al conectar la bd: ", error);
    }
}; 