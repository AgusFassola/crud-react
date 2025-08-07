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

    const signUp = async (userData) => {
        try {
        const response = await registerRequest(userData);
            setUser(response.data.user);
            setIsAuthenticated(true);
            console.log('User registered successfully:', response.data.user);
        } catch (error) {
            console.error('Error during sign up:', error);
            throw error;
        }
    };

  return (
    <AuthContext.Provider value={{user, signUp, isAuthenticated}}>
      {children}
    </AuthContext.Provider>
  );
}