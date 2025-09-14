import React from 'react'
import { useTasks } from '../context/TasksContext';
import { Link } from 'react-router-dom';

function TaskCard({task}) {
    const { deleteTask } = useTasks();

  return (
    <div className='bg-zinc-800 text-white p-4 rounded-md mb-2'>
          <header className='flex justify-between'>
            <h1 className='text-2xl font-bold'>{task.title}</h1>
            <div className='flex gap-x-2 items-center'>
                <button onClick={()=>{
                    deleteTask(task._id)
                }}>Delete</button>
                <Link to={`/task/${task._id}`}>Edit</Link>
            </div>
          </header>
          <p className='text-slade-300'>{task.description}</p>
          <p>{new Date(task.date).toLocaleDateString}</p>
          <hr />
        </div>
  )
}

export default TaskCard
