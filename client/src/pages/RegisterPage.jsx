import React from 'react'
import { useForm } from 'react-hook-form';
import { registerRequest } from '../api/auth';

export default function RegisterPage() {
    const { register, handleSubmit } = useForm();

    const onSubmit = handleSubmit(async (data) => {
        console.log(data);
        try {
            const res = await registerRequest(data);
            console.log(res.data);
        } catch (error) {
            console.error("Error during registration:", error);
        }
    });

  return (
    <div className='max-w-md mx-auto mt-10 p-6 bg-zinc-800 rounded shadow'>
      <form onSubmit={onSubmit} >
        <div>
          <label className='' htmlFor="username">Username</label>
            <input 
                id="username"
                type="text"
                {...register("username", { required: "Username is required" })}
                className='border border-gray-400 rounded p-2 m-4'
            />
        </div>
        <div>
          <label htmlFor="email">Email</label>  
            <input
                id="email"
                type="email"
                {...register("email", { required: "Email is required"})}
                className='border border-gray-400 rounded p-2 m-4'
            />
        </div>
        <div>
          <label htmlFor="password">Password</label>
            <input
                id="password"
                type="password"
                {...register("password", { required: "Password is required" })}
                className='border border-gray-400 rounded p-2 m-4'
            />
        </div>
        <button className='bg-blue-500 text-white rounded p-2 hover:bg-blue-600'
        type="submit">Register</button>
      </form>
    </div>
  )
}
