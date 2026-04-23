import axios from "axios";
import api from "./axios";
import { ProductType } from "@/schema/product.Schema";

export const getProduct = async () => {
  const res = await api.get("product/");
  return res.data;
};

export const createProduct=async(data:ProductType)=>{
console.log(data)
}