import {
  AuthContextProviderProps,
  AuthContextType,
  Login,
  RegisterFormType,
} from "@/types/auth";
import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { getCurrentUser, loginUser } from "@/api/auth";
import { useLoading } from "./LoadingContext";

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [user, setUser] = useState<any>(null);
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
      await loginUser(data);
      await fetchAndStoreUser();
      toast.success("login successfull");
      navigate("/");
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };
  const fetchAndStoreUser = async () => {
    try {
      const result = await getCurrentUser();
      const user = result.user;
      setUser(user);
      localStorage.setItem("user", JSON.stringify(user));
    } catch (error: any) {
      setUser(null);
      console.log(error?.response?.data || error.message);
      localStorage.removeItem("user");
    }
  };
  useEffect(() => {
    const initAuth = async () => {
      try {
        const storeUser = localStorage.getItem("user");
        if (storeUser) {
          setUser(JSON.parse(storeUser));
        }
        await fetchAndStoreUser();
      } catch (error: any) {
        setUser(null);
        localStorage.removeItem("user");
      } finally {
        setLoading(false);
      }
    };
    initAuth();
  }, []);

  const register = (formData: RegisterFormType) => {
    console.log(formData);
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(undefined);
    navigate("/login");
  };

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
