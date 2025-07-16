import { Router } from "express";
import {login, register} from "../controllers/auth.controller.js"
//creamos un enrutador
//guardamos el objeto Router en una const
//nos permite hacer peticiones

const router = Router()

router.post('/register', register)
router.post('/login', login)

export default router;