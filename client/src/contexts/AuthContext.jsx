import { useState, useEffect, useMemo } from "react";
import { AuthContext } from "./auth-context";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authToken, setAuthToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    const storedUser = localStorage.getItem("user");

    if (storedToken && storedUser) {
      try {
        setUser(JSON.parse(storedUser));
        setAuthToken(storedToken);
      } catch {
        localStorage.removeItem("authToken");
        localStorage.removeItem("user");
      }
    }

    setLoading(false);
  }, []);

  useEffect(() => {
    if (authToken) {
      localStorage.setItem("authToken", authToken);
    } else {
      localStorage.removeItem("authToken");
    }
  }, [authToken]);

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  const login = (userData, token) => {
    setUser(userData);
    setAuthToken(token);
  };

  const logout = () => {
    setUser(null);
    setAuthToken(null);
    localStorage.clear();
  };

  const value = useMemo(
    () => ({
      user,
      authToken,
      isAuthenticated: !!authToken,
      loading,
      login,
      logout,
    }),
    [user, authToken, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
