import express from 'express'
import morgan from "morgan";

import authRoutes from "./routes/auth.routes.js";

const app = express()
app.use(morgan('dev'));//para que muestre un mensaje en la consola

app.use(express.json())//para que pueda convertir los request body en formato json o objeto javascript 
app.use("/api",authRoutes);

export default app;
//con el default no hace falta poner llaves{} al importarlo