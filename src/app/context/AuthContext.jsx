"use client";
import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [redirectPath, setRedirectPath] = useState(null);
  
  // 🆕 Add user info
  const [user, setUser] = useState({
    email: "",
    plan: "basic", // can be 'basic', 'premium', or 'premium-plus'
  });

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        isSubscribed,
        setIsSubscribed,
        redirectPath,
        setRedirectPath,
        user,
        setUser, // 🆕 make setter available globally
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
