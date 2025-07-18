import { createContext, useContext, useState, useEffect } from "react";
import axios from "../api/axios";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [loading, setLoading] = useState(true); // <--- ADD THIS LOADING STATE

  const isAuthenticated = !!user && !!token;

  useEffect(() => {
    console.log("AuthProvider useEffect - Token state changed:", token);
    // Set loading to true at the start of the effect
    setLoading(true); // <--- Set loading true when token state changes

    if (token) {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        try {
          setUser(JSON.parse(storedUser));
          console.log(
            "AuthProvider useEffect - User set from localStorage:",
            JSON.parse(storedUser)
          );
        } catch (error) {
          console.error("Failed to parse user from localStorage:", error);
          localStorage.removeItem("user");
          localStorage.removeItem("token");
          setToken(null);
          setUser(null);
        }
      } else {
        // If token exists but user data doesn't, it might be an invalid state.
        // Consider logging out or re-fetching user data. For now, we'll just assume user should be null.
        setUser(null);
      }
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      console.log("AuthProvider useEffect - Axios Authorization header SET.");
    } else {
      delete axios.defaults.headers.common["Authorization"];
      console.log(
        "AuthProvider useEffect - Axios Authorization header CLEARED."
      );
      setUser(null); // Ensure user is null if no token
    }
    setLoading(false); // <--- Set loading false once auth state is determined
    console.log("AuthProvider useEffect - Loading set to false.");
  }, [token]);

  const login = (userData, authToken) => {
    console.log(
      "AuthProvider: login() received userData:",
      userData,
      "authToken:",
      authToken
    );
    // When logging in, we are no longer loading authentication state
    setLoading(false); // <--- Set loading false immediately on login
    setUser(userData);
    setToken(authToken);
    localStorage.setItem("token", authToken);
    localStorage.setItem("user", JSON.stringify(userData));
    axios.defaults.headers.common["Authorization"] = `Bearer ${authToken}`;
    console.log("AuthProvider: Token and user set in state and localStorage.");
  };

  const logout = () => {
    console.log("AuthProvider: logout() - User and token cleared.");
    setLoading(false); // <--- Set loading false immediately on logout
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    delete axios.defaults.headers.common["Authorization"];
  };

  // Include loading in the context value
  const value = { user, token, isAuthenticated, loading, login, logout }; // <--- ADD loading here

  console.log("AuthProvider: Providing context value:", value);
  console.log("AuthProvider: Current user in state:", user);
  console.log("AuthProvider: Current token in state:", token);
  console.log("AuthProvider: isAuthenticated:", isAuthenticated);
  console.log("AuthProvider: Current loading state:", loading); // <--- NEW LOG

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
