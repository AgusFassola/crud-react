import React from 'react'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import HomePage from './pages/HomePage'
import ProfilePage from './pages/ProfilePage'
import TasksPage from './pages/TasksPage'
import TaskFormPage from './pages/TaskFormPage'

import ProtectedRoute from './ProtectedRoute'
import { TaskProvider } from './context/TasksContext'
import { AuthProvider } from './context/AuthContext'
import Navbar from './components/Navbar'

export default function App() {
  return (
    <AuthProvider>
      <TaskProvider>
        <BrowserRouter>
          <main className='container mx-auto p-10'>
            <Navbar />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Routes element={<ProtectedRoute />}>
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/tasks" element={<TasksPage />} />
                <Route path="/tasks/:id" element={<TaskFormPage />} />
                <Route path="/add-task" element={<TaskFormPage />} />
              </Routes>
              <Route path="*" element={<h1>Not Found, pruebe otra dirección</h1>} />
            </Routes>
          </main>
        </BrowserRouter>
      </TaskProvider>
    </AuthProvider>
  )
}
