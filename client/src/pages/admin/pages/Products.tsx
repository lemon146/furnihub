import { motion } from "framer-motion";
import { Plus, Edit, Trash2, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function ProductsPage() {
  const navigate = useNavigate();

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
        {products.map((product, i) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ scale: 1.03 }}
            className="bg-white rounded-2xl shadow overflow-hidden"
          >
            {/* Image */}
            <div className="relative">
              <img src={product.image} className="h-48 w-full object-cover" />

              {/* Badges */}
              <div className="absolute top-3 left-3 flex gap-2">
                <span className="bg-black text-white text-xs px-2 py-1 rounded-lg">
                  {product.category}
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
                <h3 className="font-semibold text-lg">{product.name}</h3>
                <span className="font-bold">${product.price}</span>
              </div>

              <p className="text-sm text-gray-500 line-clamp-2">
                {product.description}
              </p>

              {/* Actions */}
              <div className="flex justify-between pt-2">
                <button
                  onClick={() => navigate("/admin/productsviews")}
                  className="flex items-center gap-1 text-sm text-blue-600 hover:underline"
                >
                  <Eye size={16} /> View
                </button>

                <div className="flex gap-3">
                  <button
                    onClick={() =>
                      navigate(`/admin/products/${product.id}/edit`)
                    }
                    className="text-green-600 hover:scale-110 transition"
                  >
                    <Edit size={18} />
                  </button>
                  <button className="text-red-600 hover:scale-110 transition">
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

/* ---------------- MOCK DATA ---------------- */

const products = [
  {
    id: 1,
    name: "Luxury Sofa",
    price: 450,
    category: "Sofa",
    stock: 12,
    image: "https://images.unsplash.com/photo-1540574163026-643ea20ade25",
    description:
      "Premium luxury sofa with modern design and comfortable seating.",
  },
  {
    id: 2,
    name: "Wooden Dining Table",
    price: 320,
    category: "Table",
    stock: 5,
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
    description: "Solid wood dining table perfect for family gatherings.",
  },
  {
    id: 3,
    name: "Office Chair",
    price: 180,
    category: "Chair",
    stock: 0,
    image: "https://images.unsplash.com/photo-1580480055273-228ff5388ef8",
    description: "Ergonomic office chair for long working hours comfort.",
  },
];
