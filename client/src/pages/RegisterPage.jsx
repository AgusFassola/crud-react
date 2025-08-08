import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function RegisterPage() {
    const { register, handleSubmit, formState:{errors} } = useForm();
    const { signUp, isAuthenticated, errors:RegisterErrors } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/tasks');
        }
    }, [isAuthenticated, navigate]);

    const onSubmit = handleSubmit(async (data) => {
        try {
            await signUp(data);
            console.log('Registration successful');
            // Optionally redirect or show a success message
        } catch (error) {
            console.error('Registration failed:', error);
            // Optionally show an error message to the user
        }
    });

  return (
    <div className='max-w-md mx-auto mt-10 p-6 bg-zinc-800 rounded shadow'>
      {
        RegisterErrors.map((error, index) => (
          <div key={index} className='text-red-500 mb-2'>
            {error}
          </div>
        ))
      }
      <form onSubmit={onSubmit} >
        <div>
          <label className='' htmlFor="username">Username</label>
            <input 
                id="username"
                type="text"
                {...register("username", { required: "Username is required" })}
                className='border border-gray-400 rounded p-2 m-4'
            />
            {errors.username && (
                <span className='text-red-500'>{errors.username.message}</span>
            )}
        </div>
        <div>
          <label htmlFor="email">Email</label>  
            <input
                id="email"
                type="email"
                {...register("email", { required: "Email is required"})}
                className='border border-gray-400 rounded p-2 m-4'
            />
            {errors.email && (
                <span className='text-red-500'>{errors.email.message}</span>
            )}
        </div>
        <div>
          <label htmlFor="password">Password</label>
            <input
                id="password"
                type="password"
                {...register("password", { required: "Password is required" })}
                className='border border-gray-400 rounded p-2 m-4'
            />
            {errors.password && (
                <span className='text-red-500'>{errors.password.message}</span>
            )}
        </div>
        <button className='bg-blue-500 text-white rounded p-2 hover:bg-blue-600'
        type="submit">Register</button>
      </form>
    </div>
  )
}
