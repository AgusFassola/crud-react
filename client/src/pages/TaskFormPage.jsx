import { useForm } from 'react-hook-form'
import { useTasks } from '../context/TasksContext';
import { useNavigate } from 'react-router-dom';

function TaskFormPage() {
  const { register, handleSubmit } = useForm();
  const { createTask } = useTasks();
  const navigate = useNavigate();

  const onSubmit = handleSubmit((data) => {
    createTask(data)
    navigate('/tasks')
  });

  return (
    <div className='max-w-md mx-auto bg-amber-500 p-4'>
      <form onSubmit={onSubmit}>
        <input 
        type="text" placeholder='Title' {...register("title")} 
        className='w-full bg-zinc-800 text-white p-2 rounded-md mb-2'
        autoFocus/>
        <textarea rows="3" placeholder='Description'
          className='w-full bg-zinc-800 text-white p-2 rounded-md mb-2'
          {...register("description")}
        ></textarea>

        <button className='bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-md'
        >Save</button>
      </form>
    </div>
  )
}

export default TaskFormPage
