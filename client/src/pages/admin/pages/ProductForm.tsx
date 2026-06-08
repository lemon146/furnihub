import { getCategory } from "@/api/category.api";
import { createProduct, getProduct } from "@/api/product";
import { useLoading } from "@/context/LoadingContext";
import { ProductFormType, ProductSchema } from "@/schema/product.schema.";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import {
  DollarSign,
  Image as ImageIcon,
  Info,
  Layers,
  Package,
  X,
} from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

export function ProductForm() {
  const [images, setImages] = useState<{ file: File; preview: string }[]>([]);
  //use loadin
  const { setLoading } = useLoading();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(ProductSchema),
    defaultValues: {
      image: [],
    },
  });
  // get categories
  const { data: categories, isLoading: categoriesLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategory,
  });
  // get product
  const {
    data: products = [],
    isLoading: productsLoading,
    refetch,
  } = useQuery({
    queryKey: ["products"],
    queryFn: getProduct,
  });

  if (productsLoading) return <p>Loading...</p>;

  if (products.length === 0) {
    return <p>No products found 😐</p>;
  }
  const onSubmit = async (data: ProductFormType) => {
    try {
      setLoading(true);

      const formData = new FormData();

      Object.entries(data).forEach(([key, value]) => {
        if (key !== "image") {
          formData.append(key, value as any);
        }
      });

      // append files
      data.image.forEach((file) => {
        formData.append("image", file);
      });

      const res = (await createProduct(formData as any)) as any;

      toast.success(res?.message || "Product created");
      reset();
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };
  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const newFiles = Array.from(e.target.files);

    setImages((prevImages) => {
      const filteredNewFiles = newFiles.filter(
        (newFile) =>
          !prevImages.some(
            (prevFile) =>
              prevFile.file.name === newFile.name &&
              prevFile.file.size === newFile.size,
          ),
      );

      const formattedFiles = filteredNewFiles.map((file) => ({
        file,
        preview: URL.createObjectURL(file),
      }));

      const updatedImages = [...prevImages, ...formattedFiles];

      setValue(
        "image",
        updatedImages.map((img) => img.file),
        {
          shouldValidate: true,
        },
      );

      return updatedImages;
    });

    e.target.value = "";
  };

  const removeImage = (index: number) => {
    setImages((prev) => {
      if (prev[index]?.preview) {
        URL.revokeObjectURL(prev[index].preview);
      }

      const updated = prev.filter((_, i) => i !== index);

      setValue(
        "image",
        updated.map((img) => img.file),
      );

      return updated;
    });
  };

  const inputClass =
    "w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-black focus:ring-2 focus:ring-black/10 outline-none transition bg-white";

  return (
    <form
      className="space-y-8 bg-white p-8 rounded-2xl shadow-md"
      onSubmit={handleSubmit(onSubmit)}
    >
      {/* HEADER */}
      <div className="flex items-center gap-3 border-b pb-4">
        <Package className="text-gray-700" />
        <h2 className="text-xl font-semibold">Add Product</h2>
      </div>

      {/* BASIC INFO */}
      <div className="space-y-4">
        <h3 className="flex items-center gap-2 font-medium text-gray-700">
          <Info size={16} /> Basic Details
        </h3>

        <div>
          <input
            {...register("title")}
            placeholder="Product Title"
            className={inputClass}
          />

          {errors.title && (
            <p className="text-sm text-red-500 mt-1">{errors.title.message}</p>
          )}
        </div>

        <div>
          <textarea
            {...register("description")}
            placeholder="Full Description"
            className={`${inputClass} min-h-35`}
          />

          {errors.description && (
            <p className="text-sm text-red-500 mt-1">
              {errors.description.message}
            </p>
          )}
        </div>

        <div>
          <input
            {...register("short_desc")}
            placeholder="Short Description"
            className={inputClass}
          />

          {errors.short_desc && (
            <p className="text-sm text-red-500 mt-1">
              {errors.short_desc.message}
            </p>
          )}
        </div>
      </div>

      {/* PRICING */}
      <div className="space-y-4">
        <h3 className="flex items-center gap-2 font-medium text-gray-700">
          <DollarSign size={16} /> Pricing & Stock
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <input
              type="number"
              placeholder="Price"
              className={inputClass}
              {...register("price")}
            />

            {errors.price && (
              <p className="text-sm text-red-500 mt-1">
                {errors.price.message}
              </p>
            )}
          </div>

          <div>
            <input
              type="number"
              placeholder="Original Price"
              className={inputClass}
              {...register("originalPrice")}
            />

            {errors.originalPrice && (
              <p className="text-sm text-red-500 mt-1">
                {errors.originalPrice.message}
              </p>
            )}
          </div>

          <div>
            <input
              type="number"
              placeholder="Stock"
              className={inputClass}
              {...register("stock")}
            />

            {errors.stock && (
              <p className="text-sm text-red-500 mt-1">
                {errors.stock.message}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* CATEGORY */}
      <div className="space-y-2">
        <h3 className="flex items-center gap-2 font-medium text-gray-700">
          <Layers size={16} /> Category
        </h3>

        <div>
          <select className={inputClass} {...register("category")}>
            <option value="">Select Category</option>

            {categories?.categories?.map((category: any) => (
              <option key={category._id} value={category._id}>
                {category.title}
              </option>
            ))}
          </select>

          {errors.category && (
            <p className="text-sm text-red-500 mt-1">
              {errors.category.message}
            </p>
          )}
        </div>
      </div>

      {/* ADDITIONAL */}
      <div className="space-y-4">
        <h3 className="flex items-center gap-2 font-medium text-gray-700">
          <Package size={16} /> Additional Information
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <input
              placeholder="Material"
              className={inputClass}
              {...register("material")}
            />

            {errors.material && (
              <p className="text-sm text-red-500 mt-1">
                {errors.material.message}
              </p>
            )}
          </div>

          <div>
            <input
              placeholder="Color"
              className={inputClass}
              {...register("color")}
            />

            {errors.color && (
              <p className="text-sm text-red-500 mt-1">
                {errors.color.message}
              </p>
            )}
          </div>

          <div>
            <label className="text-sm text-gray-600">Weight (grams)</label>
            <input
              type="number"
              placeholder="Weight"
              className={inputClass}
              {...register("weight")}
            />

            {errors.weight && (
              <p className="text-sm text-red-500 mt-1">
                {errors.weight.message}
              </p>
            )}
          </div>

          <div>
            <input
              placeholder="Dimensions"
              className={inputClass}
              {...register("dimension")}
            />

            {errors.dimension && (
              <p className="text-sm text-red-500 mt-1">
                {errors.dimension.message}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* IMAGE UPLOAD */}
      <div className="space-y-4">
        <h3 className="flex items-center gap-2 font-medium text-gray-700">
          <ImageIcon size={16} /> Product Images
        </h3>

        <label className="flex flex-col items-center justify-center w-full border-2 border-dashed rounded-xl p-6 cursor-pointer hover:bg-gray-50 transition">
          <span className="text-sm text-gray-500">
            Click to upload or drag images
          </span>

          <span className="text-xs text-gray-400">
            PNG, JPG, multiple allowed
          </span>

          <input type="file" multiple accept="image/*" onChange={handleImage} />
        </label>

        {errors.image && (
          <p className="text-sm text-red-500 mt-1">{errors.image.message}</p>
        )}

        {/* PREVIEW */}
        <div className="flex flex-wrap gap-3">
          {images.map((item, index) => (
            <div
              key={index}
              className="relative w-20 h-20 rounded-lg border border-gray-200 bg-gray-50 overflow-hidden shadow-sm"
            >
              <img
                src={item.preview}
                alt="preview"
                className="w-full h-full object-cover"
              />

              <button
                type="button"
                onClick={() => removeImage(index)}
                className="absolute top-0  right-0 bg-white text-red-500 border border-red-200 rounded-full w-5 h-5 flex items-center justify-center shadow-sm hover:bg-red-50 transition"
              >
                <X size={12} />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="pt-4 border-t flex justify-end">
        <button
          type="submit"
          className="px-6 py-2.5 bg-black text-white rounded-xl font-medium hover:bg-gray-800 transition"
        >
          Create Product
        </button>
      </div>
    </form>
  );
}
