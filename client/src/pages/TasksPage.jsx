import {useEffect} from 'react'
import { useTasks } from '../context/TasksContext';

function TasksPage() {
  const { getTasks, tasks } = useTasks();
  useEffect(() => {
    getTasks();
  }, [])

  if(tasks.length === 0) return <h1 className='text-4xl font-bold text-center'>No hay tareas aún</h1>

  return (
    <div>
      {tasks.map(task => (
        <div key={task._id}>
          <h1>{task.title}</h1>
          <p>{task.description}</p>
          <hr />
        </div>
      ))}
    </div>
  )
}

export default TasksPage
