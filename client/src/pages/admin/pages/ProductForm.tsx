import { useState } from "react";
import { Package, DollarSign, Info, Layers } from "lucide-react";

export function ProductForm({ initialData, onSubmit }: any) {
  const [form, setForm] = useState(
    initialData || {
      title: "",
      description: "",
      short_desc: "",
      price: "",
      originalPrice: "",
      stock: "",
      category: "",
      additionalInfo: {
        material: "",
        color: "",
        weight: "",
        dimension: "",
      },
    },
  );

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    onSubmit(form);
  };

  const inputClass =
    "w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-black focus:ring-2 focus:ring-black/10 outline-none transition bg-white";

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 bg-white p-6 rounded-2xl shadow"
    >
      {/* HEADER */}
      <div className="flex items-center gap-3 border-b pb-4">
        <Package className="text-gray-700" />
        <h2 className="text-xl font-semibold">Product Information</h2>
      </div>

      {/* BASIC INFO */}
      <div className="space-y-4">
        <h3 className="flex items-center gap-2 font-medium text-gray-700">
          <Info size={16} /> Basic Details
        </h3>

        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Product Title"
          className={inputClass}
        />

        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Full Description"
          className={`${inputClass} min-h-[120px]`}
        />

        <input
          name="short_desc"
          value={form.short_desc}
          onChange={handleChange}
          placeholder="Short Description"
          className={inputClass}
        />
      </div>

      {/* PRICING */}
      <div className="space-y-4">
        <h3 className="flex items-center gap-2 font-medium text-gray-700">
          <DollarSign size={16} /> Pricing & Stock
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <input
            name="price"
            type="number"
            value={form.price}
            onChange={handleChange}
            placeholder="Price"
            className={inputClass}
          />

          <input
            name="originalPrice"
            type="number"
            value={form.originalPrice}
            onChange={handleChange}
            placeholder="Original Price"
            className={inputClass}
          />

          <input
            name="stock"
            type="number"
            value={form.stock}
            onChange={handleChange}
            placeholder="Stock"
            className={inputClass}
          />
        </div>
      </div>

      {/* CATEGORY */}
      <div className="space-y-4">
        <h3 className="flex items-center gap-2 font-medium text-gray-700">
          <Layers size={16} /> Category
        </h3>

        <input
          name="category"
          value={form.category}
          onChange={handleChange}
          placeholder="Category ID"
          className={inputClass}
        />
      </div>

      {/* ADDITIONAL INFO */}
      <div className="space-y-4">
        <h3 className="flex items-center gap-2 font-medium text-gray-700">
          <Package size={16} /> Additional Information
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            value={form.additionalInfo.material}
            onChange={(e) =>
              setForm({
                ...form,
                additionalInfo: {
                  ...form.additionalInfo,
                  material: e.target.value,
                },
              })
            }
            placeholder="Material"
            className={inputClass}
          />

          <input
            value={form.additionalInfo.color}
            onChange={(e) =>
              setForm({
                ...form,
                additionalInfo: {
                  ...form.additionalInfo,
                  color: e.target.value,
                },
              })
            }
            placeholder="Color"
            className={inputClass}
          />

          <input
            value={form.additionalInfo.weight}
            onChange={(e) =>
              setForm({
                ...form,
                additionalInfo: {
                  ...form.additionalInfo,
                  weight: e.target.value,
                },
              })
            }
            placeholder="Weight"
            className={inputClass}
          />

          <input
            value={form.additionalInfo.dimension}
            onChange={(e) =>
              setForm({
                ...form,
                additionalInfo: {
                  ...form.additionalInfo,
                  dimension: e.target.value,
                },
              })
            }
            placeholder="Dimensions"
            className={inputClass}
          />
        </div>
      </div>

      {/* SUBMIT */}
      <div className="pt-4 border-t flex justify-end">
        <button
          type="submit"
          className="bg-black text-white px-6 py-3 rounded-xl hover:scale-105 transition shadow"
        >
          Save Product
        </button>
      </div>
    </form>
  );
}
