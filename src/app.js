import express from 'express'
import morgan from "morgan";
import cookieParser from 'cookie-parser';

import usersRoutes from './routes/users.routes.js';

import authRoutes from "./routes/auth.routes.js";
import tasksRoutes from "./routes/tasks.routes.js";

const app = express()

app.use(morgan('dev'));//para que muestre un mensaje en la consola
app.use(express.json())//para que pueda convertir los request body en formato json o objeto javascript 
app.use(cookieParser())//para convertir una cookie en json, es como el express
app.use("/api",authRoutes);

app.use('/api', usersRoutes);
app.use('/api', tasksRoutes);

export default app;
//con el default no hace falta poner llaves{} al importarlo