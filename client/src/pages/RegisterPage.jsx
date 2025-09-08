import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

export default function RegisterPage() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { signUp, isAuthenticated, errors: RegisterErrors } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/tasks');
    }
  }, [isAuthenticated, navigate]);

  const onSubmit = handleSubmit(async (data) => {
    try {
      await signUp(data);
      console.log('Registration successful', data);
      // Optionally redirect or show a success message
    } catch (error) {
      console.error('Registration failed:', error);
      // Optionally show an error message to the user
    }
  });

    useEffect(() => {
    if (isAuthenticated) {
      navigate('/tasks'); // Redirige a la página de perfil después del inicio de sesión
    }
  }, [isAuthenticated]);

  return (
    <div className='max-w-md mx-auto mt-10 p-6 bg-zinc-800 rounded shadow'>
      <h1 className='text-2xl ml-3.5 font-bold mb-5'>Register</h1>
      {
        Array.isArray(RegisterErrors) && RegisterErrors.map((error, index) => (
          <p key={index} className='text-red-500'>{error}</p>
        ))
      }
      <form onSubmit={onSubmit} >
        <div>
          <input
            placeholder='Username'
            id="username"
            type="text"
            //usando react-hook-form para manejar el formulario
            {...register("username", { required: "Username is required" })}
            className='border border-gray-400 rounded p-2 m-4'
          />
          {errors.username && (
            <p className='text-red-500'>{errors.username.message}</p>
          )}
        </div>
        <div>
          <input
            placeholder='Email'
            id="email"
            type="email"
            {...register("email", { required: "Email is required" })}
            className='border border-gray-400 rounded p-2 m-4'
          />
          {errors.email && (
            <p className='text-red-500'>{errors.email.message}</p>
          )}
        </div>
        <div>
          <input
          placeholder='Password'
            id="password"
            type="password"
            {...register("password", { required: "Password is required" })}
            className='border border-gray-400 rounded p-2 m-4'
          />

          {errors.password && (
            <p className='text-red-500'>{errors.password.message}</p>
          )}
        </div>
        <button className='bg-blue-500 text-white rounded ml-3.5 p-2 hover:bg-blue-600'
          type="submit">Register</button>
      </form>
      <p className='mt-4 ml-3.5'>
        Already have an account? <Link to="/login" className='text-blue-500 hover:underline'>Login</Link>
      </p>
    </div>
  )
}
