import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext';

function Navbar() {
    const { isAuthenticated, logout, user } = useAuth();
  return (
    <nav className='flex justify-between items-center p-4 bg-zinc-800 text-white'>
        <Link to={
            isAuthenticated ? "/tasks" : "/"
        }>
             <h1 className='text-2xl font-bold'>Task Manager</h1>
        </Link>
        <ul className='flex gap-x-4'>
            {isAuthenticated ? (
                <>
                    <li>
                        Welcome {user?.username}
                    </li>
                    <li>
                        <Link className='bg-indigo-500 text-zinc-800 px-3 py-1 rounded-sm'
                         to="/add-task">Create Task</Link>
                    </li>
                    <li>
                        <Link className='bg-indigo-500 text-zinc-800 px-3 py-1 rounded-sm'
                         to="/" onClick={()=>logout()}>Logout</Link>
                    </li>
                </>
            ) : (
                <>
                    <li>
                        <Link className='bg-indigo-500 text-zinc-800 px-3 py-1 rounded-sm'
                         to="/login">Login</Link>
                    </li>
                    <li>
                        <Link className='bg-indigo-500 text-zinc-800 px-3 py-1 rounded-sm'
                         to="/register">Register</Link> 
                    </li>
            </>
            )}
        </ul>
    </nav>
  )
}

export default Navbar
