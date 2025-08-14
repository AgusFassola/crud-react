import { createContext, useContext, useState } from 'react';
import { registerRequest, loginRequest } from '../api/auth';

export const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

const normalizeErrors = (err) => {
  if (err?.response?.data?.errors && Array.isArray(err.response.data.errors)) {
    return err.response.data.errors;
  }
  if (Array.isArray(err?.response?.data)) {
    return err.response.data;
  }
  if (typeof err?.response?.data === "string") {
    return [err.response.data];
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
      const data = error.response?.data;
      if (Array.isArray(data)) {
        setErrors(data);
      } else if (typeof data === 'string') {
        setErrors([data]);
      } else {
        setErrors(['An unexpected error occurred']);
      }
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


  return (
    <AuthContext.Provider value={{ signUp, signIn, user, isAuthenticated, errors }}>
      {children}
    </AuthContext.Provider>
  );
}