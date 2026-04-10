import { motion } from "framer-motion";
import { Edit, Trash2, ArrowLeft, ShoppingBag } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function ProductViewPage() {
  const navigate = useNavigate();
  const product = mockProduct;

  return (
    <div className="space-y-6">
      {/* Top Bar */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 hover:text-black transition"
        >
          <ArrowLeft size={18} /> Back
        </button>

        <div className="flex gap-3">
          <button className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-xl hover:scale-105 transition">
            <Edit size={16} /> Edit
          </button>

          <button className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-xl hover:scale-105 transition">
            <Trash2 size={16} /> Delete
          </button>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Image Section */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-2xl shadow overflow-hidden"
        >
          <img src={product.image} className="w-full h-[420px] object-cover" />
        </motion.div>

        {/* Details Section */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-5"
        >
          {/* Title + Price */}
          <div>
            <h2 className="text-3xl font-bold">{product.name}</h2>
            <p className="text-gray-500">{product.category}</p>
            <h3 className="text-2xl font-semibold mt-2">${product.price}</h3>
          </div>

          {/* Stock */}
          <div className="flex items-center gap-3">
            <span
              className={`px-3 py-1 rounded-xl text-white text-sm ${
                product.stock > 0 ? "bg-green-600" : "bg-red-600"
              }`}
            >
              {product.stock > 0 ? "In Stock" : "Out of Stock"}
            </span>

            <span className="text-sm text-gray-500">
              {product.stock} items available
            </span>
          </div>

          {/* Description */}
          <div className="bg-white p-5 rounded-2xl shadow">
            <h4 className="font-semibold mb-2">Description</h4>
            <p className="text-gray-600 text-sm leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Features */}
          <div className="bg-white p-5 rounded-2xl shadow">
            <h4 className="font-semibold mb-3">Features</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>✔ Premium furniture build quality</li>
              <li>✔ Modern design suitable for all homes</li>
              <li>✔ Durable and long-lasting materials</li>
              <li>✔ Free delivery available</li>
            </ul>
          </div>

          {/* CTA */}
          <button className="w-full flex items-center justify-center gap-2 bg-black text-white py-3 rounded-xl hover:scale-105 transition">
            <ShoppingBag size={18} /> Add to Featured
          </button>
        </motion.div>
      </div>
    </div>
  );
}

/* ---------------- MOCK DATA ---------------- */

const mockProduct = {
  id: 1,
  name: "Luxury Modern Sofa",
  price: 450,
  category: "Sofa",
  stock: 12,
  image: "https://images.unsplash.com/photo-1540574163026-643ea20ade25",
  description:
    "This luxury modern sofa is designed for ultimate comfort and elegance. Perfect for living rooms with a premium aesthetic.",
};
