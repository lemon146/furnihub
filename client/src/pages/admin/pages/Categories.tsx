import {
  createCategory,
  deleteCategory,
  getCategory,
  updateCategory,
} from "@/api/category.api";
import CategorySkeleton from "@/components/admin/CategorySkeleton";
import { CategorySchema, CategoryType } from "@/schema/category.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { AnimatePresence, motion } from "framer-motion";
import { Edit, Grid3X3, Image, Plus, Trash2, X } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

export function CategoriesPage() {
  const [open, setOpen] = useState(false);
  const [editData, setEditData] = useState<any>(null);

  const { data, isPending, isError, error, refetch } = useQuery({
    queryKey: ["category"],
    queryFn: getCategory,
  });

  if (isPending) return <CategorySkeleton />;

  if (isError) {
    return (
      <div className="rounded-2xl border border-red-200 bg-white p-8 text-center">
        <p className="font-medium text-red-600">Failed to load categories</p>

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

  if (data.categories.length === 0) {
    return <p className="text-gray-500">No categories found 😐</p>;
  }

  const openCreate = () => {
    setEditData(null);
    setOpen(true);
  };

  const openEdit = (cat: any) => {
    setEditData(cat);
    setOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this category?")) return;
    try {
      await deleteCategory(id);
      toast.success("Category deleted");
      refetch();
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Delete failed");
    }
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
        {data.categories.map((cat: any) => (
          <motion.div
            key={cat._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.03 }}
            className="bg-white rounded-2xl shadow overflow-hidden"
          >
            {/* IMAGE */}
            <div className="h-32 bg-gray-100 relative">
              <img src={cat.image.url} className="w-full h-full object-cover" />
            </div>

            {/* CONTENT */}
            <div className="p-4 space-y-3">
              <h3 className="text-lg font-semibold">{cat.title}</h3>
              <p className="text-sm text-gray-500">{cat.description}</p>

              {/* ACTIONS */}
              <div className="flex justify-between pt-3 border-t">
                <button
                  onClick={() => openEdit(cat)}
                  className="flex items-center gap-1 text-green-600 hover:scale-105 transition"
                >
                  <Edit size={16} /> Edit
                </button>

                <button
                  onClick={() => handleDelete(cat._id)}
                  className="flex items-center gap-1 text-red-600 hover:scale-105 transition"
                >
                  <Trash2 size={16} /> Delete
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* MODAL */}
      <AnimatePresence>
        {open && (
          <CategoryModal
            close={() => setOpen(false)}
            data={editData}
            refetch={refetch}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

/* ---------------- MODAL ---------------- */

function CategoryModal({ close, data, refetch }: any) {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CategoryType>({
    resolver: zodResolver(CategorySchema),
    defaultValues: data
      ? { title: data.title, description: data.description }
      : {},
  });

  const fileSelected = watch("image");

  const onSubmit = async (formValues: CategoryType) => {
    const formData = new FormData();
    formData.append("title", formValues.title);
    formData.append("description", formValues.description);
    if (formValues.image && formValues.image[0]) {
      formData.append("image", formValues.image[0]);
    }

    try {
      if (data) {
        const res = await updateCategory(data._id, formData);
        toast.success(res.data?.message || "Category updated");
      } else {
        const res = await createCategory(formData);
        toast.success(res.data?.message || "Category created");
      }

      reset();
      refetch(); // re-sync the list
      close(); // close modal
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Something went wrong");
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
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          <div>
            <input
              {...register("title")}
              placeholder="Category Name"
              className="w-full px-4 py-2 border rounded-xl"
            />
            {errors.title && (
              <p className="text-sm text-red-500 mt-1">
                {errors.title.message}
              </p>
            )}
          </div>

          <div>
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
          </div>

          {/* IMAGE */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Image size={16} /> Upload Image
            </div>
            <input
              type="file"
              accept="image/*"
              {...register("image")}
              className="w-full px-4 py-2 border rounded-xl"
            />
            {errors.image?.message && (
              <p className="text-sm text-red-500 mt-1">
                {String(errors.image.message)}
              </p>
            )}
          </div>

          {/* PREVIEW — new file selected */}
          {fileSelected?.[0] && (
            <img
              src={URL.createObjectURL(fileSelected[0])}
              className="h-32 w-full object-cover rounded-xl"
            />
          )}

          {data?.image?.url && !fileSelected?.[0] && (
            <img
              src={data.image.url}
              className="h-32 w-full object-cover rounded-xl opacity-70"
            />
          )}

          {/* ACTIONS */}
          <div className="flex justify-end gap-2 pt-3">
            <button
              type="button"
              onClick={close}
              className="px-4 py-2 rounded-xl border"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 bg-black text-white rounded-xl hover:scale-105 transition disabled:opacity-50"
            >
              {isSubmitting
                ? data
                  ? "Updating..."
                  : "Creating..."
                : data
                  ? "Update"
                  : "Create"}
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}
