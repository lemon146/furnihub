import { dashboardStats } from "@/api/dashboard.api";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import {
  DollarSign,
  Eye,
  Package,
  Plus,
  ShoppingCart,
  Truck,
  Users,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import StatCardSkeleton from "./pages/StatCardSkeleton";

export function Dashboard() {
  const navigate = useNavigate();
  const { data, isPending, isError, error, refetch } = useQuery({
    queryKey: ["stats"],
    queryFn: dashboardStats,
  });
  if (isPending) {
    return (
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <StatCardSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-center">
        <p className="text-red-600">
          {error.message || "Failed to load dashboard stats"}
        </p>

        <button
          onClick={() => refetch()}
          className="mt-3 rounded-lg bg-[#B88E2F] px-4 py-2 text-white transition hover:bg-[#a47d25]"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
      >
        <div>
          <h2 className="text-3xl font-bold text-gray-800">
            Furniture Dashboard
          </h2>
          <p className="text-gray-500 text-sm">
            Manage your store, products, and orders in one place
          </p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => navigate("/admin/products/create")}
            className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-xl hover:scale-105 transition"
          >
            <Plus size={18} /> Add Product
          </button>

          <button className="flex items-center gap-2 border px-4 py-2 rounded-xl hover:bg-gray-100 transition hover:scale-105">
            <Eye size={18} /> View Store
          </button>
        </div>
      </motion.div>

      {/* Stats */}
      <motion.div
        initial="hidden"
        animate="show"
        variants={container}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
      >
        <StatCard
          title="Total Products"
          value={data.stats.totalProducts}
          icon={<Package className="text-blue-600" />}
          bg="bg-blue-50"
        />
        <StatCard
          title="Orders"
          value="58"
          icon={<ShoppingCart className="text-green-600" />}
          bg="bg-green-50"
        />
        <StatCard
          title="Total Customers"
          value={data.stats.totalCustomers}
          icon={<Users className="text-purple-600" />}
          bg="bg-purple-50"
        />
        <StatCard
          title="Revenue"
          value="$12,430"
          icon={<DollarSign className="text-yellow-600" />}
          bg="bg-yellow-50"
        />
      </motion.div>

      {/* Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Orders */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="lg:col-span-2 bg-white rounded-2xl shadow p-5"
        >
          <h3 className="text-lg font-semibold mb-4">Recent Orders</h3>

          <table className="w-full text-sm">
            <thead>
              <tr className="text-gray-500 border-b">
                <th className="py-2">Order</th>
                <th>Customer</th>
                <th>Product</th>
                <th>Status</th>
                <th>Price</th>
              </tr>
            </thead>

            <tbody>
              {orders.map((o, i) => (
                <motion.tr
                  key={o.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="border-b last:border-0"
                >
                  <td className="py-3">{o.id}</td>
                  <td>{o.customer}</td>
                  <td>{o.product}</td>
                  <td className={getStatusColor(o.status)}>{o.status}</td>
                  <td>{o.price}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </motion.div>

        {/* Right Side */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          {/* Top Products */}
          <div className="bg-white rounded-2xl shadow p-5">
            <h3 className="text-lg font-semibold mb-4">Top Products</h3>

            <ul className="space-y-3">
              {products.map((p, i) => (
                <motion.li
                  key={p.name}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex justify-between"
                >
                  <span>{p.name}</span>
                  <span className="font-medium text-green-600">
                    {p.sales} sales
                  </span>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-2xl shadow p-5">
            <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>

            <div className="space-y-3">
              {actions.map((a, i) => (
                <motion.button
                  key={a.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center gap-2 w-full px-4 py-2 rounded-xl bg-gray-100 hover:bg-gray-200"
                >
                  {a.icon}
                  {a.label}
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

/* ---------------- DATA ---------------- */

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const orders = [
  {
    id: "#1001",
    customer: "Ali Khan",
    product: "Wooden Chair",
    status: "Delivered",
    price: "$120",
  },
  {
    id: "#1002",
    customer: "Ahmed Raza",
    product: "Modern Sofa",
    status: "Pending",
    price: "$560",
  },
  {
    id: "#1003",
    customer: "Fatima Noor",
    product: "Dining Table",
    status: "Shipped",
    price: "$320",
  },
];

const products = [
  { name: "Luxury Sofa", sales: 32 },
  { name: "Office Chair", sales: 25 },
  { name: "Wooden Bed", sales: 18 },
];

const actions = [
  { label: "Add New Product", icon: <Plus size={16} /> },
  { label: "Manage Orders", icon: <Truck size={16} /> },
  { label: "View Customers", icon: <Users size={16} /> },
];

/* ---------------- HELPERS ---------------- */

function getStatusColor(status: string) {
  if (status === "Delivered") return "text-green-600";
  if (status === "Pending") return "text-yellow-600";
  return "text-blue-600";
}

/* ---------------- COMPONENT ---------------- */

function StatCard({ title, value, icon, bg }: any) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`p-5 rounded-2xl shadow ${bg} flex items-center gap-4`}
    >
      <div className="p-3 bg-white rounded-xl shadow-sm">{icon}</div>
      <div>
        <p className="text-gray-600 text-sm">{title}</p>
        <h3 className="text-xl font-bold">{value}</h3>
      </div>
    </motion.div>
  );
}
