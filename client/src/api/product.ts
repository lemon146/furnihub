import axios from "axios";
import api from "./axios";

export const getProduct = async () => {
  const res = await api.get("/product/");
  return res.data;
};
