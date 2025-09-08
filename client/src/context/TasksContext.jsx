import { createContext, useContext, useState } from 'react';
import { createTaskRequest, getTasksRequest } from '../api/tasks';

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

    const getTasks = async () => {
        try {
            const response = await getTasksRequest();
            setTasks(response.data);
        } catch (error) {
            console.log("Error fetching tasks:", error);
        }
    }

  return (
    <TaskContext.Provider value={{ tasks, createTask, getTasks }}>
      {children}
    </TaskContext.Provider>
  );
}
