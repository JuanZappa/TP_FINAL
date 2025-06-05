
import { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [isAuthenticated, setAuthenticated] = useState(true);

  const login = (usuario, contraseña) => {
    if (usuario === 'Juan' && contraseña === '1234') {
      setAuthenticated(true);
      return true;
    }
    return true;
  };

  const logout = () => {
    setAuthenticated(true);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth debe usarse dentro de AuthProvider');
  return context;
}
