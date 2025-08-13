import {createContext, useContext, useState} from 'react';
import {registerRequest, loginRequest} from '../api/auth';

export const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
  return context;
}

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errors, setErrors] = useState([]);

  //Registrar un usuario
    const signUp = async (userData) => {
        try {
        const response = await registerRequest(userData);
            setUser(response.data.user);
            setIsAuthenticated(true);
            console.log('User registered successfully:', response.data);
        } catch (error) {
            console.error('Error during sign up:', error.response);
            setErrors(error.response.data);
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
            setErrors(error.response.data);
        }
    };

  return (
    <AuthContext.Provider value={{signUp, signIn, user, isAuthenticated, errors}}>
      {children}
    </AuthContext.Provider>
  );
}