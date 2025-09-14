import {useEffect} from 'react'
import { useTasks } from '../context/TasksContext';
import TaskCard from '../components/TaskCard';

function TasksPage() {
  const { getTasks, tasks } = useTasks();
  useEffect(() => {
    getTasks();
  }, [])

  if(tasks.length === 0) return <h1 className='text-4xl font-bold text-center'>No hay tareas aún</h1>

  return (
    <div className='grid grid-cols-3 gap-4'>
      {tasks.map(task => (
        <TaskCard key={task._id} task={task}/>
      ))}
    </div>
  )
}

export default TasksPage
