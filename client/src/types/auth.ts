import { ReactNode } from "react";
import { LoginInput, RegisterInput } from "@/schema/auth.schema.";

export interface AuthContextType {
  login: (data: LoginInput) => void;
  logout: () => void;
  userRegister: (formData: RegisterInput) => void;
  user: User | null;
  initializing: boolean;
}

export interface AuthContextProviderProps {
  children: ReactNode;
}

export type User = {
  _id: string;
  fullName: string;
  email: string;
  role: "ADMIN" | "USER";
  refreshTokens: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export interface LoadingContextType {
  loading: boolean;
  setLoading: (value: boolean) => void;
}
