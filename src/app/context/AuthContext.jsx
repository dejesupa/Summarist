"use client";
import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [redirectPath, setRedirectPath] = useState(null);
  const [user, setUser] = useState({
    email: "",
    plan: "basic",
  });

  //  Load data from localStorage on first load
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const loggedIn = localStorage.getItem("isLoggedIn");

    if (storedUser && loggedIn === "true") {
      setUser(JSON.parse(storedUser));
      setIsLoggedIn(true);
    }
  }, []);

  //  Save to localStorage whenever user or login status changes
  useEffect(() => {
    localStorage.setItem("isLoggedIn", JSON.stringify(isLoggedIn));
    localStorage.setItem("user", JSON.stringify(user));
  }, [isLoggedIn, user]);

  // logout function
  const logout = () => {
    setIsLoggedIn(false);
    setUser({ email: "", plan: "basic" });
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("user");
  };

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
        setUser,
        logout, // 🆕 export logout globally
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
