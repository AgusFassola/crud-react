import React from 'react'
import { Routes, Route } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'


export default function App() {
  return (
    <Routes>
      <Route path="/" element={<h1>HomePage</h1>} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/profile" element={<h1>Profile</h1>} />
      <Route path="/tasks" element={<h1>Tasks</h1>} />
      <Route path="/tasks/:id" element={<h1>Task</h1>} />
      <Route path="/add-task" element={<h1>New task</h1>} />
      <Route path="*" element={<h1>Not Found, pruebe otra dirección</h1>} />
    </Routes>
  )
}
