import {
  AuthContextProviderProps,
  AuthContextType,
  RegisterFormType,
} from "@/types/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [user, setUser] = useState<string | undefined>();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const login = (email: string, password: string) => {
    if (!email || !password) return;

    localStorage.setItem("user", JSON.stringify(email));
    setUser(email);
    setLoading(false);
    navigate("/");
  };
  const register = (formData: RegisterFormType) => {
    console.log(formData);
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(undefined);
    navigate("/login");
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

// custom hook

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("AuthContext must be in AuthContextProvider");
  }
  return context;
};
