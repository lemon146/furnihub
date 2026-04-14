import { ReactNode } from "react";

export interface AuthContextType {
  login: (data: Login) => void;
  logout: () => void;
  register: (formData: RegisterFormType) => void;
  user: string | undefined;
}
export interface AuthContextProviderProps {
  children: ReactNode;
}

export interface RegisterFormType {
  email: string;
  password: string;
  name: string;
}

export interface Login {
  email: string;
  password: string;
}

// loading

export interface LoadingContextType {
  loading: boolean;
  setLoading: (value: boolean) => void;
}
