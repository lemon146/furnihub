import {
  AuthContextProviderProps,
  AuthContextType,
  Login,
  RegisterFormType,
  User,
} from "@/types/auth";
import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { getCurrentUser, loginUser, logOut, refreshToken } from "@/api/auth";
import { useLoading } from "./LoadingContext";

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [initializing, setInitializing] = useState(true);
  const { setLoading } = useLoading();
  const navigate = useNavigate();

  const login = async (data: Login) => {
    if (!data.email || !data.password) return;

    try {
      setLoading(true);

      await loginUser(data);

      const res = await getCurrentUser();
      const userData = res.user;

      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));

      toast.success("login successful");
      navigate(userData?.role === "ADMIN" ? "/admin" : "/");
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    const initAuth = async () => {
      try {
        // always verify with server, not localStorage
        const res = await getCurrentUser();
        setUser(res.user);
        localStorage.setItem("user", JSON.stringify(res.user));
      } catch {
        // access token expired, try refresh
        try {
          await refreshToken();
          const res = await getCurrentUser();
          setUser(res.user);
          localStorage.setItem("user", JSON.stringify(res.user));
        } catch {
          // both failed, clear everything
          setUser(null);
          localStorage.removeItem("user");
          // logout()
        }
      } finally {
        setInitializing(false);
      }
    };

    initAuth();
  }, []);

  const register = (formData: RegisterFormType) => {
    console.log(formData);
  };

  const logout = async () => {
    await logOut();
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  return (
    <AuthContext.Provider
      value={{ user, login, logout, register, initializing }}
    >
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
