import React from 'react'
import { Routes, Route } from 'react-router-dom'
//import Home from './pages/Home'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
//import Profile from './pages/Profile'
//import NotFound from './pages/NotFound'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<h1>HomePage</h1>} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      {/* <Route path="/profile" element={<Profile />} />
      <Route path="/tasks" element={<Home />} />
      <Route path="/tasks/:id" element={<Home />} />
      <Route path="/add-task" element={<Home />} />
      <Route path="*" element={<NotFound />} /> */}
    </Routes>
  )
}
