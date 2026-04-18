import { ReactNode } from "react";

export interface AuthContextType {
  login: (data: Login) => void;
  logout: () => void;
  register: (formData: RegisterFormType) => void;
  user: User | null;
  initializing: any;
}
export interface AuthContextProviderProps {
  children: ReactNode;
}

export type User = {
  _id: string;
  fullName: string;
  email: string;
  role: string;
};

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
