import React from 'react'
import { useForm } from 'react-hook-form';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

export default function LoginPage() {

  const { register, handleSubmit, formState:{errors} } = useForm();
  const {  signIn,  errors:signinErrors } = useAuth();
  const navigate = useNavigate();
  const onSubmit = handleSubmit(async (data) => {
    try {
      await signIn(data); 
      console.log('Registration successful');
      // Optionally redirect or show a success message
    } catch (error) {
      console.error('Registration failed:', error);
      // Optionally show an error message to the user
    }
  });
  return (
    <div className='max-w-md mx-auto mt-10 p-6 bg-zinc-800 rounded shadow items-center justify-center'>
      { signinErrors.map((error, index) => (
          <div key={index} className='text-red-500 mb-2 text-center'>
            {error}
          </div>
        ))
      }

      <form onSubmit={onSubmit} >
        <h1 className='text-2xl font-bold mb-4 ml-3.5'>Login</h1>

        <div>
            <input
                placeholder='email'
                id="email"
                type="email"
                {...register("email", { required: "Email is required"})}
                className='border border-gray-400 rounded p-2 m-4'
            />
            {errors.email && (
                <p className='text-red-500'>{errors.email.message}</p>
            )}
        </div>
        <div>
            <input
                placeholder='password'
                id="password"
                type="password"
                {...register("password", { required: "Password is required" })}
                className='border border-gray-400 rounded p-2 m-4'
            />
            {errors.password && (
                <p className='text-red-500'>{errors.password.message}</p>
            )}
        </div>
        <button className=' ml-3.5 bg-blue-500 text-white rounded p-2 hover:bg-blue-600'
        type="submit">Login</button>
      </form>
      <p className='mt-4 ml-3.5'>
        Don't have an account? <Link to="/register" className='text-blue-500 hover:underline'>Register</Link>
      </p>
    </div>
  )
}
