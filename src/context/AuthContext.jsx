// src/context/AuthContext.jsx
import { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  
const [isLogin, setIsLogin] = useState(false);
  const [userData, setUserData] = useState(null);
  

  useEffect(() => {
    const token = sessionStorage.getItem("accessToken");
    const user = sessionStorage.getItem("user");
    
    if (token && user) {
      setIsLogin(true);
      setUserData({
        data: {
          accessToken: token,
          user: JSON.parse(user),
        },
      });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isLogin, setIsLogin, userData, setUserData }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
