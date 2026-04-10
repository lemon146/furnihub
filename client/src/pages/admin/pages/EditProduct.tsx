import { ArrowLeft } from "lucide-react";
import { ProductForm } from "./ProductForm";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";

export function EditProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const product = mockProduct;

  const handleUpdate = async (data: any) => {
    console.log("UPDATE:", id, data);
    // API CALL: PUT /products/:id
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
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 hover:text-black transition hover:scale-105"
        >
          <ArrowLeft size={18} />
          <span className="text-sm font-medium">Back</span>
        </button>

        {/* Title */}
        <h2 className="text-xl font-bold text-gray-800">Edit Product</h2>

        {/* Right placeholder */}
        <div className="w-10" />
      </motion.div>

      {/* FORM */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <ProductForm initialData={product} onSubmit={handleUpdate} />
      </motion.div>
    </div>
  );
}

/* ---------------- MOCK DATA ---------------- */

const mockProduct = {
  title: "Accent Chair",
  description: "Stylish accent chair for living room.",
  short_desc: "Accent chair",
  price: 10000,
  originalPrice: 12000,
  stock: 12,
  category: "69c47de930d82d5675a5ba2f",
  additionalInfo: {
    material: "Fabric & Wood",
    color: "Beige",
    weight: "15kg",
    dimension: "70 x 70 x 90",
  },
  images: [],
};
