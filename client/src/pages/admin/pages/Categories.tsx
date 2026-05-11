import { HtmlHTMLAttributes, ReactHTMLElement, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Edit, Trash2, Grid3X3, X, Image } from "lucide-react";
import { CategorySchema, CategoryType } from "@/schema/category.schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createCategory } from "@/api/category.api";
import toast from "react-hot-toast";

export function CategoriesPage() {
  const [open, setOpen] = useState(false);
  const [editData, setEditData] = useState<any>(null);

  const openCreate = () => {
    setEditData(null);
    setOpen(true);
  };

  const openEdit = (cat: any) => {
    setEditData(cat);
    setOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between bg-white p-4 rounded-2xl shadow"
      >
        <div className="flex items-center gap-2">
          <Grid3X3 />
          <h2 className="text-xl font-bold">Categories</h2>
        </div>

        <button
          onClick={openCreate}
          className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-xl hover:scale-105 transition"
        >
          <Plus size={18} /> Add Category
        </button>
      </motion.div>

      {/* GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((cat, i) => (
          <motion.div
            key={cat.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ scale: 1.03 }}
            className="bg-white rounded-2xl shadow overflow-hidden"
          >
            {/* IMAGE */}
            <div className="h-32 bg-gray-100 relative">
              <img src={cat.image} className="w-full h-full object-cover" />
              <span className="absolute top-2 right-2 bg-white px-2 py-1 text-xs rounded-lg shadow">
                {cat.products} products
              </span>
            </div>

            {/* CONTENT */}
            <div className="p-4 space-y-3">
              <h3 className="text-lg font-semibold">{cat.name}</h3>
              <p className="text-sm text-gray-500">{cat.description}</p>

              {/* ACTIONS */}
              <div className="flex justify-between pt-3 border-t">
                <button
                  onClick={() => openEdit(cat)}
                  className="flex items-center gap-1 text-green-600 hover:scale-105 transition"
                >
                  <Edit size={16} /> Edit
                </button>

                <button className="flex items-center gap-1 text-red-600 hover:scale-105 transition">
                  <Trash2 size={16} /> Delete
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* MODAL */}
      <AnimatePresence>
        {open && <CategoryModal close={() => setOpen(false)} data={editData} />}
      </AnimatePresence>
    </div>
  );
}

/* ---------------- MODAL ---------------- */

function CategoryModal({ close, data }: any) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<CategoryType>({
    resolver: zodResolver(CategorySchema),
  });
  const fileSelected = watch("image");
  const onSubmit = async (data: CategoryType) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    if (data.image && data.image[0]) {
      formData.append("image", data.image[0]);
    }
    try {
      const res = await createCategory(formData);
      toast.success(res.data);
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "An error occurred");
    }
  };

  return (
    <motion.div
      className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        className="bg-white w-full max-w-md p-6 rounded-2xl shadow space-y-4"
      >
        {/* HEADER */}
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold">
            {data ? "Edit Category" : "Create Category"}
          </h2>

          <button onClick={close}>
            <X />
          </button>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            {...register("title")}
            placeholder="Category Name"
            className="w-full px-4 py-2 border rounded-xl"
          />
          {errors.title && (
            <p className="text-sm text-red-500 mt-1">{errors.title.message}</p>
          )}

          <textarea
            {...register("description")}
            placeholder="Description"
            className="w-full px-4 py-2 border rounded-xl"
          />
          {errors.description && (
            <p className="text-sm text-red-500 mt-1">
              {errors.description.message}
            </p>
          )}

          {/* IMAGE */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Image size={16} /> Image URL
            </div>

            <input
              type="file"
              {...register("image")}
              placeholder="https://..."
              className="w-full px-4 py-2 border rounded-xl"
            />
            {errors.image?.message && (
              <p className="text-sm text-red-500 mt-1">
                {String(errors.image.message)}
              </p>
            )}
          </div>

          {/* PREVIEW */}
          {fileSelected?.[0] && (
            <img
              src={URL.createObjectURL(fileSelected[0])}
              className="h-32 w-full object-cover rounded-xl"
            />
          )}

          {/* ACTIONS */}
          <div className="flex justify-end gap-2 pt-3">
            <button onClick={close} className="px-4 py-2 rounded-xl border">
              Cancel
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 bg-black text-white rounded-xl hover:scale-105 transition"
            >
              {/* {data ? "Update" : "Create"} */}
              {isSubmitting ? "creacting in..." : "create"}
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}

/* ---------------- MOCK DATA ---------------- */

const categories = [
  {
    id: 1,
    name: "Sofas",
    description: "Comfortable modern sofas",
    products: 24,
    image: "https://images.unsplash.com/photo-1540574163026-643ea20ade25",
  },
  {
    id: 2,
    name: "Beds",
    description: "Luxury bedroom furniture",
    products: 18,
    image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85",
  },
  {
    id: 3,
    name: "Chairs",
    description: "Ergonomic stylish chairs",
    products: 30,
    image: "https://images.unsplash.com/photo-1582582494700-9a8b0c8f3a8c",
  },
];
