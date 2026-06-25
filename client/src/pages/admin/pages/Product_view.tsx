import { getOneProductById } from "@/api/product";
import { handleDelete } from "@/hooks/product.delete.hook";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Box,
  Edit,
  Loader2,
  Package,
  Palette,
  Ruler,
  Star,
  Trash2,
  Weight,
} from "lucide-react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export function ProductViewPage() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const [selectedImage, setSelectedImage] = useState(0);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["product", id],
    queryFn: () => getOneProductById(id!),
    enabled: !!id,
  });

  const product = data?.data?.product;

  const discount =
    product?.originalPrice > product?.price
      ? Math.round(
          ((product.originalPrice - product.price) / product.originalPrice) *
            100,
        )
      : 0;

  if (isLoading) {
    return (
      <div className="h-[70vh] flex items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-gray-500" />
      </div>
    );
  }

  if (isError || !product) {
    return (
      <div className="h-[70vh] flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-red-500">
            Failed to load product
          </h2>
          <button
            onClick={() => navigate(-1)}
            className="mt-4 px-4 py-2 bg-black text-white rounded-xl"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* TOP BAR */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-wrap items-center justify-between gap-4"
      >
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 hover:text-black transition"
        >
          <ArrowLeft size={18} />
          Back
        </button>

        <div className="flex gap-3">
          <button
            onClick={() => navigate(`/admin/products/${product._id}/edit`)}
            className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-xl hover:scale-105 transition"
          >
            <Edit size={16} />
            Edit
          </button>

          <button
            onClick={async () => {
              const success: any = await handleDelete(product._id);

              if (success) {
                navigate(-1);
              }
            }}
            className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-xl hover:scale-105 transition"
          >
            <Trash2 size={16} />
            Delete
          </button>
        </div>
      </motion.div>

      {/* MAIN SECTION */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* IMAGES */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-3xl shadow-md p-5"
        >
          <img
            src={
              product.images?.[selectedImage]?.url ||
              "https://placehold.co/800x600"
            }
            alt={product.title}
            className="w-full h-[450px] object-cover rounded-2xl"
          />

          <div className="flex gap-3 mt-4 overflow-x-auto">
            {product.images?.map((img: any, index: number) => (
              <img
                key={img.publicId}
                src={img.url}
                alt=""
                onClick={() => setSelectedImage(index)}
                className={`w-20 h-20 object-cover rounded-xl cursor-pointer border-2 transition ${
                  selectedImage === index ? "border-black" : "border-gray-200"
                }`}
              />
            ))}
          </div>
        </motion.div>

        {/* DETAILS */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-5"
        >
          {/* TITLE */}
          <div>
            <h1 className="text-4xl font-bold">{product.title}</h1>

            <p className="text-gray-500 mt-2">{product.short_desc}</p>
          </div>

          {/* PRICE */}
          <div className="flex items-center gap-4 flex-wrap">
            <span className="text-3xl font-bold text-green-600">
              ${product.price}
            </span>

            {product.originalPrice > product.price && (
              <>
                <span className="text-xl text-gray-400 line-through">
                  ${product.originalPrice}
                </span>

                <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm font-medium">
                  {discount}% OFF
                </span>
              </>
            )}
          </div>

          {/* RATING */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <Star size={18} className="fill-yellow-400 text-yellow-400" />
              <span className="font-medium">{product.averageRating || 0}</span>
            </div>

            <span className="text-gray-500">
              ({product.numReviews || 0} reviews)
            </span>
          </div>

          {/* STOCK */}
          <div className="flex items-center gap-3">
            <span
              className={`px-4 py-1 rounded-full text-sm font-medium text-white ${
                product.stock > 0 ? "bg-green-600" : "bg-red-600"
              }`}
            >
              {product.stock > 0 ? "In Stock" : "Out of Stock"}
            </span>

            <span className="text-gray-500">{product.stock} available</span>
          </div>

          {/* DESCRIPTION */}
          <div className="bg-white rounded-2xl shadow-md p-5">
            <h3 className="font-semibold text-lg mb-3">Description</h3>

            <p className="text-gray-600 leading-7">{product.description}</p>
          </div>
        </motion.div>
      </div>

      {/* SPECIFICATIONS */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-white rounded-3xl shadow-md p-6"
      >
        <h2 className="text-2xl font-bold mb-6">Product Specifications</h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="border rounded-2xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Box size={18} />
              <h4 className="font-medium">Material</h4>
            </div>

            <p className="text-gray-600">
              {product.additionalInfo?.material || "N/A"}
            </p>
          </div>

          <div className="border rounded-2xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Palette size={18} />
              <h4 className="font-medium">Color</h4>
            </div>

            <p className="text-gray-600">
              {product.additionalInfo?.color || "N/A"}
            </p>
          </div>

          <div className="border rounded-2xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Weight size={18} />
              <h4 className="font-medium">Weight</h4>
            </div>

            <p className="text-gray-600">
              {product.additionalInfo?.weight || 0} kg
            </p>
          </div>

          <div className="border rounded-2xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Ruler size={18} />
              <h4 className="font-medium">Dimensions</h4>
            </div>

            <p className="text-gray-600">
              {product.additionalInfo?.dimension || "N/A"}
            </p>
          </div>
        </div>
      </motion.div>

      {/* EXTRA INFO */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="grid md:grid-cols-3 gap-5"
      >
        <div className="bg-white rounded-2xl shadow-md p-5">
          <Package size={24} />
          <h4 className="font-semibold mt-3">Inventory</h4>
          <p className="text-gray-600 mt-1">{product.stock} units remaining</p>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-5">
          <Star size={24} />
          <h4 className="font-semibold mt-3">Customer Rating</h4>
          <p className="text-gray-600 mt-1">{product.averageRating || 0} / 5</p>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-5">
          <Box size={24} />
          <h4 className="font-semibold mt-3">Reviews</h4>
          <p className="text-gray-600 mt-1">
            {product.numReviews || 0} total reviews
          </p>
        </div>
      </motion.div>
    </div>
  );
}
