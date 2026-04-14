import {
  AuthContextProviderProps,
  AuthContextType,
  Login,
  RegisterFormType,
} from "@/types/auth";
import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { loginUser } from "@/api/auth";
import { useLoading } from "./LoadingContext";

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [user, setUser] = useState<string | undefined>();
  const { setLoading } = useLoading();
  const navigate = useNavigate();

  const login = async (data: Login) => {
    if (!data.email) {
      toast.error("email required");
      return;
    }
    if (!data.password) {
      toast.error("password required");
      return;
    }
    try {
      setLoading(true);
      const res = await loginUser(data);
      console.log(res);
      toast.success("login successfull");
      navigate("/");
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
    } finally {
      setLoading(false);
    }
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
    <AuthContext.Provider value={{ user, login, logout, register }}>
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
