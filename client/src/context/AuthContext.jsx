import React, { createContext, useState } from 'react';

export const AuthContext = createContext({ token: '', login: () => {}, logout: () => {} });

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem('apiToken') || '');

  const login = (newToken) => {
    setToken(newToken);
    localStorage.setItem('apiToken', newToken);
  };

  const logout = () => {
    setToken('');
    localStorage.removeItem('apiToken');
  };

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
