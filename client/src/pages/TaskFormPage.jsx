import { useForm } from 'react-hook-form'
import { useTasks } from '../context/TasksContext';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { get } from 'mongoose';

function TaskFormPage() {
  const { register, handleSubmit, setValue } = useForm();
  const { createTask, getTask, updateTask } = useTasks();
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    async function loadTask() {
      if (params.id) {
        const task = await getTask(params.id)
        setValue("title", task.title)
        setValue("description", task.description)
      }
    }
    loadTask();
  }, [params.id]);

  const onSubmit = handleSubmit((data) => {
    if (params.id) {
      updateTask(params.id, data)
    } else {
      createTask(data)
    }
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
