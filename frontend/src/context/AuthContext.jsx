import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);

  useEffect(() => {
    // Check local storage for token on mount
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');
    if (token && username) {
      setAdmin({ token, username }); 
    }
  }, []);

  const login = (token, username) => {
    localStorage.setItem('token', token);
    localStorage.setItem('username', username);
    setAdmin({ token, username });
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    setAdmin(null);
  };

  return (
    <AuthContext.Provider value={{ admin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
