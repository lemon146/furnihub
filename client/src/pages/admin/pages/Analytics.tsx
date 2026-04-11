import { motion } from "framer-motion";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { DollarSign, ShoppingCart, Users, TrendingUp } from "lucide-react";

/* ================= DATA ================= */
const revenueData = [
  { month: "Jan", revenue: 1200, orders: 32 },
  { month: "Feb", revenue: 1800, orders: 45 },
  { month: "Mar", revenue: 1400, orders: 38 },
  { month: "Apr", revenue: 2200, orders: 60 },
  { month: "May", revenue: 3000, orders: 82 },
];

const productData = [
  { name: "Table", sales: 120 },
  { name: "Chair", sales: 90 },
  { name: "Sofa", sales: 150 },
  { name: "Bed", sales: 70 },
];

const customerStats = [
  { label: "Active Users", value: 1200 },
  { label: "New Users", value: 320 },
  { label: "Blocked Users", value: 25 },
];

/* ================= COMPONENT ================= */
export default function AnalyticsPage() {
  return (
    <motion.div
      className="p-4 sm:p-6 space-y-6"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {/* ================= HEADER ================= */}
      <div>
        <h1 className="text-xl sm:text-2xl font-bold">Analytics Dashboard</h1>
        <p className="text-sm text-gray-500">
          Overview of your furniture store performance
        </p>
      </div>

      {/* ================= TOP CARDS ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl shadow flex items-center gap-3">
          <DollarSign className="text-green-500" />
          <div>
            <p className="text-xs text-gray-500">Revenue</p>
            <p className="font-bold">$12,500</p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl shadow flex items-center gap-3">
          <ShoppingCart className="text-blue-500" />
          <div>
            <p className="text-xs text-gray-500">Orders</p>
            <p className="font-bold">1,240</p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl shadow flex items-center gap-3">
          <Users className="text-purple-500" />
          <div>
            <p className="text-xs text-gray-500">Customers</p>
            <p className="font-bold">860</p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl shadow flex items-center gap-3">
          <TrendingUp className="text-orange-500" />
          <div>
            <p className="text-xs text-gray-500">Growth</p>
            <p className="font-bold">+18%</p>
          </div>
        </div>
      </div>

      {/* ================= REVENUE CHART ================= */}
      <div className="bg-white p-4 rounded-xl shadow">
        <h2 className="font-semibold mb-4">Revenue & Orders Trend</h2>

        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={revenueData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />

            <Line
              type="monotone"
              dataKey="revenue"
              stroke="#4f46e5"
              strokeWidth={3}
            />

            <Line
              type="monotone"
              dataKey="orders"
              stroke="#16a34a"
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* ================= PRODUCT PERFORMANCE ================= */}
      <div className="bg-white p-4 rounded-xl shadow">
        <h2 className="font-semibold mb-4">Top Selling Products</h2>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={productData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="sales" fill="#0ea5e9" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* ================= CUSTOMER STATS ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {customerStats.map((c, i) => (
          <div key={i} className="bg-white p-4 rounded-xl shadow text-center">
            <p className="text-sm text-gray-500">{c.label}</p>
            <p className="text-xl font-bold">{c.value}</p>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
