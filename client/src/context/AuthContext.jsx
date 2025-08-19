import { createContext, useContext, useState, useEffect } from 'react';
import { registerRequest, loginRequest } from '../api/auth';
import { set } from 'mongoose';

export const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

const normalizeErrors = (err) => {
  const data = err?.response?.data;
  console.log("data:", data)

  if (Array.isArray(data)) {
    return data.flatMap((d) => {
      if (typeof d === "string") {
        try {
          // Intentar parsear el string como JSON
          const parsed = JSON.parse(d);
          if (Array.isArray(parsed)) {
            return parsed.map((p) => p.message || JSON.stringify(p));
          }
        } catch {
          // Si no se puede parsear, devolver el string tal cual
          return d;
        }
      }
      // Si ya es objeto, sacar message
      return d.message || JSON.stringify(d);
    });
  }
  if (typeof data === "string") {
    return [data];
  }
  return ["Error desconocido"];
};


export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errors, setErrors] = useState([]);

  //Registrar un usuario
  const signUp = async (userData) => {
    try {
      const response = await registerRequest(userData);
      setUser(response.data.user);
      setIsAuthenticated(true);
      setErrors([]);
      console.log('User registered successfully:', response.data);
    } catch (error) {
      console.error('Error during registration:', error);
      setErrors(normalizeErrors(error)); 
    }
  };

  const signIn = async (userData) => {
    try {
      const response = await loginRequest(userData);
      /* setUser(response.data.user);
      setIsAuthenticated(true); */
      console.log('User logged in successfully:', response.data);
    } catch (error) {
      console.error('Error during login:', error);
      setErrors(normalizeErrors(error));
    }
  };

  useEffect(() => {
    if (errors.length > 0) {
      const timer = setTimeout(() => {
        setErrors([]);
      }, 3000); // Limpiar errores después de 5 segundos
      return () => clearTimeout(timer); // Limpiar el timer si el componente se desmonta
    }
  },[errors]);

  return (
    <AuthContext.Provider value={{ signUp, signIn, user, isAuthenticated, errors }}>
      {children}
    </AuthContext.Provider>
  );
}