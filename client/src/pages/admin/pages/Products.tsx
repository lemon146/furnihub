import { getProduct } from "@/api/product";
import CategorySkeleton from "@/components/admin/CategorySkeleton";
import { handleDelete } from "@/hooks/product.delete.hook";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Edit, Eye, Plus, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function ProductsPage() {
  const navigate = useNavigate();
  const { data, isPending, isError, error, refetch } = useQuery({
    queryKey: ["products"],
    queryFn: getProduct,
  });

  if (isPending) return <CategorySkeleton />;

  if (isError) {
    return (
      <div className="rounded-2xl border border-red-200 bg-white p-8 text-center">
        <p className="font-medium text-red-600">Failed to load Products</p>

        <p className="mt-2 text-sm text-gray-500">{error.message}</p>

        <button
          onClick={() => refetch()}
          className="mt-4 rounded-xl bg-[#B88E2F] px-5 py-2 text-sm font-medium text-white transition hover:bg-[#a47d25]"
        >
          Try Again
        </button>
      </div>
    );
  }
  if (!data?.products?.length) {
    return (
      <div className="h-[60vh] flex flex-col items-center justify-center text-center">
        <h2 className="text-3xl font-bold">No Products Found</h2>

        <p className="text-gray-500 mt-2">
          There are no products available right now.
        </p>

        <button
          onClick={() => navigate("/admin/products/create")}
          className="mt-6 px-5 py-3 bg-black text-white rounded-xl"
        >
          Add Product
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h2 className="text-3xl font-bold">Products</h2>
          <p className="text-gray-500 text-sm">
            Manage your furniture inventory
          </p>
        </div>

        <button
          onClick={() => navigate("/admin/products/create")}
          className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-xl hover:scale-105 transition"
        >
          <Plus size={18} /> Add Product
        </button>
      </motion.div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.products.map((product: any, index: number) => (
          <motion.div
            key={product._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.03 }}
            className="bg-white rounded-2xl shadow overflow-hidden"
          >
            {/* Image */}
            <div className="relative">
              <img
                src={product.images?.[0]?.url || "/placeholder.png"}
                alt={product.title}
                className="h-48 w-full object-cover"
              />

              {/* Badges */}
              <div className="absolute top-3 left-3 flex gap-2">
                <span className="bg-black text-white text-xs px-2 py-1 rounded-lg">
                  {product.category?.title || "Category"}
                </span>

                <span
                  className={`text-xs px-2 py-1 rounded-lg text-white ${
                    product.stock > 0 ? "bg-green-600" : "bg-red-600"
                  }`}
                >
                  {product.stock > 0 ? "In Stock" : "Out of Stock"}
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="p-4 space-y-3">
              <div className="flex justify-between items-start">
                <h3 className="font-semibold text-lg">{product.title}</h3>
                <span className="font-bold">${product.price}</span>
              </div>

              <p className="text-sm text-gray-500 line-clamp-2">
                {product.short_desc}
              </p>

              {/* Actions */}
              <div className="flex justify-between pt-2">
                <button
                  onClick={() =>
                    navigate(`/admin/products/${product._id}/view`)
                  }
                  className="flex items-center gap-1 text-sm text-blue-600 hover:underline"
                >
                  <Eye size={16} /> View
                </button>

                <div className="flex gap-3">
                  <button
                    onClick={() =>
                      navigate(`/admin/products/${product._id}/edit`)
                    }
                    className="text-green-600 hover:scale-110 transition"
                  >
                    <Edit size={18} />
                  </button>

                  <button
                    className="text-red-600 hover:scale-110 transition"
                    onClick={async () => {
                      const success: any = await handleDelete(product._id);

                      if (success) {
                        refetch();
                      }
                    }}
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
