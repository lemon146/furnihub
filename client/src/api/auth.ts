import axios from "axios";
import api from "./axios";
import { Login } from "@/types/auth";

export const loginUser = async (data: Login) => {
  const res = await api.post("/users/login", data);
  return res.data;
};
export const register = async () => {
  const res = await api.post("/users/register");
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
