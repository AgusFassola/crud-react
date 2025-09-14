import { ca } from "zod/locales";
import Task from "../models/task.model.js";

export const getTasks = async (req, res) =>{
    try{
        const tasks = await Task.find({
            //devolver sólo las tareas que coincidan con el id del usuario
            user:req.user.id
        }).populate('user')//para devolver toda la info del user y no solo el id
        res.json(tasks);
    }catch(error){
        return res.status(500).json({message: error.message})
    }
};

export const createTask = async (req, res) =>{
    try{
        const {title, description, date } = req.body;

        const newTask = new Task({
            title,
            description,
            date,
            user: req.user.id // guardamos el id del usuario al q le corresponde la tarea, está ahi por el authRequired
        })
        const savedTask = await newTask.save()
        res.json(savedTask);
    }catch(error){
        return res.status(500).json({message: error.message})
    }
};

export const getTask = async (req, res) =>{
    try{
        const task = await Task.findById(req.params.id).populate('user')
        if(!task) return res.status(404).json({message:"task not found"})
        res.json(task)
    }catch(error){
        return res.status(404).json({message:"task not found"})
    }
};


export const deteleTask = async (req, res) =>{
    try{
        const task = await Task.findByIdAndDelete(req.params.id)
        if(!task) return res.status(404).json({message:"task not found"})
        return res.sendStatus(204);//devuelve q estuvo todo ok pero no muestra datos
    }catch(error){
        return res.status(404).json({message:"task not found"})
    }

};

export const updateTask = async (req, res) =>{
    try{
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, {new: true} )
        if(!task) return res.status(404).json({message:"task not found"})
        res.json(task)
    }catch(error){
        return res.status(404).json({message:"task not found"})
    }
};

