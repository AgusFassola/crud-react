import express from 'express'
import morgan from "morgan";

const app = express()
app.use(morgan('dev'));//para que muestre un mensaje en la consola

export default app;
//con el default no hace falta poner llaves{} al importarlo