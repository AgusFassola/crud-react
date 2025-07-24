import Task from "../models/task.model.js";

export const getTasks = async (req, res) =>{
    const tasks = await Task.find({
        //devolver sólo las tareas que coincidan con el id del usuario
        user:req.user.id
    }).populate('user')//para devolver toda la info del user y no solo el id
    res.json(tasks);
};

export const createTask = async (req, res) =>{
    const {title, description, date } = req.body;

    const newTask = new Task({
        title,
        description,
        date,
        user: req.user.id // guardamos el id del usuario al q le corresponde la tarea, está ahi por el authRequired
    })
    const savedTask = await newTask.save()
    res.json(savedTask);
};

export const getTask = async (req, res) =>{
    const task = await Task.findById(req.params.id).populate('user')
    if(!task) return res.status(404).json({message:"task not found"})
    res.json(task)
};


export const deteleTask = async (req, res) =>{
    const task = await Task.findByIdAndDelete(req.params.id)
    if(!task) return res.status(404).json({message:"task not found"})
    return res.sendStatus(204);//devuelve q estuvo todo ok pero no muestra datos
};

export const updateTask = async (req, res) =>{
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {new: true} )
    if(!task) return res.status(404).json({message:"task not found"})
    res.json(task)
};

