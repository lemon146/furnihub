import { getProduct, updateProduct } from "@/api/product";
import { useLoading } from "@/context/LoadingContext";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { ProductForm } from "./ProductForm";

export function EditProductPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { setLoading } = useLoading();

  // ── Fetch the single product by id ────────────────────────────────────────
  const { data: productsData, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: getProduct,
  });

  const product = (productsData?.products as any[])?.find(
    (p: any) => p._id === id,
  );

  // ── Update handler passed into ProductForm ────────────────────────────────
  const handleUpdate = async (formData: FormData) => {
    try {
      setLoading(true);
      const res = (await updateProduct(id!, formData)) as any;
      toast.success(res?.message || "Product updated");
      navigate(-1);
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  if (isLoading) return <p className="p-4">Loading...</p>;
  if (!product) return <p className="p-4">Product not found.</p>;

  const initialData = {
    title: product.title,
    description: product.description,
    short_desc: product.short_desc,
    price: product.price,
    originalPrice: product.originalPrice,
    stock: product.stock,
    category: product.category?.$oid ?? product.category, // ← fix
    additionalInfo: product.additionalInfo, // ← already nested correctly
    images: product.images?.map((img: any) => img.url) ?? [], // ← fix
  };

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="flex items-center justify-between bg-white p-4 rounded-2xl shadow"
      >
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 hover:text-black transition hover:scale-105"
        >
          <ArrowLeft size={18} />
          <span className="text-sm font-medium">Back</span>
        </button>

        <h2 className="text-xl font-bold text-gray-800">Edit Product</h2>

        <div className="w-10" />
      </motion.div>

      {/* FORM */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <ProductForm initialData={initialData} onSubmit={handleUpdate} />
      </motion.div>
    </div>
  );
}
