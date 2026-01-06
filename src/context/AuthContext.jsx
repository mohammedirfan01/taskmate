// src/context/AuthContext.jsx
import { useContext, createContext, useState, useEffect } from "react";
import { api } from "../api/client";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // user profile
  const [loading, setLoading] = useState(true); // initial load

  useEffect(() => {
    const token = localStorage.getItem("taskmate_token");
    if (!token) {
      setLoading(false);
      return;
    }

    // Fetch current user from backend
    api
      .get("/auth/me")
      .then((data) => {
        setUser(data.user);
      })
      .catch(() => {
        localStorage.removeItem("taskmate_token");
        setUser(null);
      })
      .finally(() => setLoading(false));
  }, []);

  const login = async (email, password) => {
    const data = await api.post("/auth/login", { email, password });

    // Expect backend to return { token, user }
    localStorage.setItem("taskmate_token", data.token);
    setUser(data.user);
    return data.user;
  };

  const signup = async (payload) => {
    console.log("SIGNUP CALLED WITH:", payload);

    const data = await api.post("/auth/signup", payload);

    console.log("SIGNUP RESPONSE:", data);

    localStorage.setItem("taskmate_token", data.token);
    setUser(data.user);
    return data.user;
  };

  const logout = () => {
    localStorage.removeItem("taskmate_token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
