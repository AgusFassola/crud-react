import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import { is } from 'zod/locales';

function ProtectedRoute() {

  const { loading, isAuthenticated } = useAuth();
  console.log(loading, isAuthenticated)

  if (loading) return <div>Loading...</div>; // O un spinner de carga
    if ( !loading && !isAuthenticated) {
        return <Navigate to="/login" replace />
    }

  return (
    <div>
      <Outlet />
    </div>
  )
}

export default ProtectedRoute
