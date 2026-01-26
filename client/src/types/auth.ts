import { ReactNode } from "react";

export interface AuthContextType {
  login: (email: string, password: string) => void;
  logout: () => void;
  register: (formData: RegisterFormType) => void;
  loading: boolean;
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
