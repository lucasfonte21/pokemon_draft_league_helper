import { createContext, useState, useEffect } from 'react';
import API from '../api/axios_config';

// 1. Create the actual context bubble
export const AuthContext = createContext();

// 2. Create the Provider (the wrapper that goes around your app)
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // When the app first loads, check if they are already logged in via localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // The global Register function
  const register = async (userData) => {
    const response = await API.post('/auth/register', userData);
    if (response.data) {
      localStorage.setItem('user', JSON.stringify(response.data));
      setUser(response.data);
    }
    return response.data;
  };

  // The global Login function
  const login = async (userData) => {
    const response = await API.post('/auth/login', userData);
    if (response.data) {
      localStorage.setItem('user', JSON.stringify(response.data));
      setUser(response.data);
    }
    return response.data;
  };

  // The global Logout function
  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  // 3. Make the user data and functions available to the rest of the app
  return (
    <AuthContext.Provider value={{ user, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};