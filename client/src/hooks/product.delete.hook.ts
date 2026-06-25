import { deleteProduct } from "@/api/product";
import toast from "react-hot-toast";

export const handleDelete = async (id: string) => {
  if (!confirm("Delete this product?")) return false;

  try {
    await deleteProduct(id);

    toast.success("Product deleted");

    return true;
  } catch (error: any) {
    toast.error(error?.response?.data?.message || "Delete failed");

    return false;
  }
};
