import { createContext, useContext, useState } from 'react';
import { createTaskRequest, getTasksRequest,
     deleteTaskRequest, getTaskRequest, updateTaskRequest } from '../api/tasks';

const TaskContext = createContext();

export const useTasks = () => {
  const context = useContext(TaskContext);
    if (!context) {
        throw new Error('useTasks must be used within a TaskProvider');
    }
    return context;
}

export function TaskProvider({ children }) {
    const [tasks, setTasks] = useState([]);

    const createTask = async (task) => {
        const response = await createTaskRequest(task);
        console.log(response);
    }

    const deleteTask = async (id) => {
        try {
            const response = await deleteTaskRequest(id); 
            if (response.status === 204) {
                setTasks(tasks.filter(task => task._id !== id));
            }
        } catch (error) {
            console.log("Error deleting task:", error);
        }
    }

const getTask = async (id) => {
        try {
            const response = await getTaskRequest(id);      
            return response.data;
        } catch (error) {
            console.log("Error fetching task:", error);
        }
    }

    const getTasks = async () => {
        try {
            const response = await getTasksRequest();
            return response.data;
        } catch (error) {
            console.log("Error fetching tasks:", error);
        }
    }

    const updateTask = async (id, task) => {
        try {
            const response = await updateTaskRequest(id, task);
            return response.data;
        } catch (error) {
            console.log("Error updating task:", error);
        }
    }

  return (
    <TaskContext.Provider value={{ updateTask ,tasks, createTask, getTasks, deleteTask, getTask }}>
      {children}
    </TaskContext.Provider>
  );
}
