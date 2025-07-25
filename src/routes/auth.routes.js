import { Router } from "express";
import {login, register, logout, profile} from "../controllers/auth.controller.js"
import User from "../models/user.model.js";
import { authRequired } from "../middlewares/validateToken.js";

//creamos un enrutador
//guardamos el objeto Router en una const
//nos permite hacer peticiones

const router = Router()

router.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    return res.json(users);
  } catch (error) {
    return res.status(500).json({ error: 'Error al obtener usuarios' });
  }
});

router.post('/register', register)
router.post('/login', login)
router.post('/logout', logout)
router.get('/profile', authRequired, profile)//para que pase por authRequired antes de ir a profile



export default router;