import axios from "axios";
import api from "./axios";
import { LoginInput, RegisterInput } from "@/schema/auth.schema.";

export const loginUser = async (data: LoginInput) => {
  const res = await api.post("/users/login", data);
  return res.data;
};
export const register = async (data: RegisterInput) => {
  const res = await api.post("/users/register", data);
  return res.data;
};
export const logOut = async () => {
  const res = await api.post("/users/logout");
  return res.data;
};

export const getCurrentUser = async () => {
  const res = await api.get("/users/current/user");
  return res.data;
};
export const refreshToken = async () => {
  const res = await api.post("/users/refresh/token");
  return res.data;
};
