import { useLocation } from "react-router-dom";
import React, { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import usePreviousPathname from "./usePreviousPathname";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const previousPathname = usePreviousPathname();
  console.log(previousPathname, "88::");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  const logOut = () => {
    setIsAuthenticated(false);
  };
  const login = (username, password) => {
    console.log(username, "trigger", password);
    if (username == "mayur@example.com" && password == "password123") {
      console.log("1111");
      setIsAuthenticated(true);
      navigate(previousPathname);
    }
  };
  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
