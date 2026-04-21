import { AuthContextProviderProps, AuthContextType, User } from "@/types/auth";
import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import {
  getCurrentUser,
  loginUser,
  logOut,
  refreshToken,
  register,
} from "@/api/auth";
import { useLoading } from "./LoadingContext";
import { LoginInput, RegisterInput } from "@/schema/auth";

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [initializing, setInitializing] = useState(true);
  const { setLoading } = useLoading();
  const navigate = useNavigate();

  const login = async (data: LoginInput) => {
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

  const userRegister = async (formData: RegisterInput) => {
    try {
      setLoading(true);
      await register(formData);
      toast.success("user register successful \n Please Login to Continue");
      navigate("/login");
    } catch (err: any) {
      toast.error(err.response.data.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const initAuth = async () => {
      try {
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

  const logout = async () => {
    await logOut();
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  return (
    <AuthContext.Provider
      value={{ user, login, logout, userRegister, initializing }}
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
