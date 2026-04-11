import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, Eye, X, Truck, CheckCircle, Clock } from "lucide-react";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
  CartesianGrid,
} from "recharts";

/* ================= TYPES ================= */
type OrderStatus = "pending" | "paid" | "shipped" | "delivered";

type Order = {
  id: string;
  customer: string;
  email: string;
  amount: number;
  status: OrderStatus;
  items: number;
  address: string;
  date: string;

  product: {
    name: string;
    image: string;
  };
};

/* ================= DATA ================= */
const dummyOrders: Order[] = [
  {
    id: "#1001",
    customer: "Ali Khan",
    email: "ali@example.com",
    amount: 120,
    status: "paid",
    items: 3,
    address: "Karachi",
    date: "2026-04-10",
    product: {
      name: "Luxury Wooden Table",
      image: "https://images.unsplash.com/photo-1582582494700-0f8f2d0b9c19",
    },
  },
  {
    id: "#1002",
    customer: "Sara Ahmed",
    email: "sara@example.com",
    amount: 80,
    status: "pending",
    items: 1,
    address: "Lahore",
    date: "2026-04-09",
    product: {
      name: "Modern Sofa Set",
      image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85",
    },
  },
  {
    id: "#1003",
    customer: "John Doe",
    email: "john@example.com",
    amount: 240,
    status: "shipped",
    items: 5,
    address: "New York",
    date: "2026-04-08",
    product: {
      name: "Minimal Chair Set",
      image: "https://images.unsplash.com/photo-1519710164239-da123dc03ef4",
    },
  },
];

/* ================= ANALYTICS ================= */
const analyticsData = [
  { day: "Mon", revenue: 120, orders: 3 },
  { day: "Tue", revenue: 90, orders: 2 },
  { day: "Wed", revenue: 200, orders: 5 },
  { day: "Thu", revenue: 160, orders: 4 },
  { day: "Fri", revenue: 300, orders: 7 },
];

/* ================= STATUS FLOW ================= */
const statusFlow: OrderStatus[] = ["pending", "paid", "shipped", "delivered"];

/* ================= COMPONENT ================= */
export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>(dummyOrders);
  const [search, setSearch] = useState("");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const filtered = orders.filter((o) =>
    o.customer.toLowerCase().includes(search.toLowerCase()),
  );

  /* ================= UPDATE STATUS ================= */
  const updateStatus = (id: string, status: OrderStatus) => {
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status } : o)));

    if (selectedOrder?.id === id) {
      setSelectedOrder({ ...selectedOrder, status });
    }
  };

  const statusStyle = (status: OrderStatus) => {
    switch (status) {
      case "paid":
        return "bg-green-100 text-green-600";
      case "pending":
        return "bg-yellow-100 text-yellow-600";
      case "shipped":
        return "bg-blue-100 text-blue-600";
      case "delivered":
        return "bg-purple-100 text-purple-600";
    }
  };

  const statusIcon = (status: OrderStatus) => {
    switch (status) {
      case "paid":
        return <CheckCircle size={14} />;
      case "pending":
        return <Clock size={14} />;
      case "shipped":
        return <Truck size={14} />;
      case "delivered":
        return <CheckCircle size={14} />;
    }
  };

  return (
    <motion.div className="p-4 sm:p-6 space-y-6">
      {/* ================= HEADER ================= */}
      <div className="flex flex-col sm:flex-row justify-between gap-3">
        <h1 className="text-xl font-bold flex items-center gap-2">
          <ShoppingCart /> Orders Dashboard
        </h1>

        <input
          className="border rounded-lg px-3 py-2 w-full sm:w-72"
          placeholder="Search orders..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* ================= ANALYTICS ================= */}
      <div className="bg-white p-3 sm:p-4 rounded-xl shadow w-full">
        <h2 className="font-semibold mb-3">Revenue & Orders</h2>

        <ResponsiveContainer width="100%" height={280}>
          <LineChart data={analyticsData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Legend />

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

      {/* ================= TABLE (DESKTOP) ================= */}
      <div className="hidden md:block bg-white rounded-xl shadow overflow-x-auto">
        <table className="w-full min-w-[900px] text-sm">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="p-3">Order</th>
              <th className="p-3">Customer</th>
              <th className="p-3">Product</th>
              <th className="p-3">Amount</th>
              <th className="p-3">Status</th>
              <th className="p-3">Update</th>
              <th className="p-3 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {filtered.map((order) => (
              <tr key={order.id} className="border-t hover:bg-gray-50">
                <td className="p-3 font-medium">{order.id}</td>

                <td className="p-3">
                  <p className="font-medium">{order.customer}</p>
                  <p className="text-xs text-gray-500">{order.email}</p>
                </td>

                {/* PRODUCT */}
                <td className="p-3">
                  <div className="flex items-center gap-2 min-w-[180px]">
                    <img
                      src={order.product.image}
                      className="w-10 h-10 rounded object-cover"
                    />
                    <span className="text-xs font-medium line-clamp-2">
                      {order.product.name}
                    </span>
                  </div>
                </td>

                <td className="p-3">${order.amount}</td>

                <td className="p-3">
                  <span
                    className={`px-2 py-1 rounded text-xs flex gap-1 w-fit ${statusStyle(order.status)}`}
                  >
                    {statusIcon(order.status)}
                    {order.status}
                  </span>
                </td>

                <td className="p-3">
                  <select
                    value={order.status}
                    onChange={(e) =>
                      updateStatus(order.id, e.target.value as OrderStatus)
                    }
                    className="border rounded px-2 py-1 text-xs"
                  >
                    {statusFlow.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </td>

                <td className="p-3 text-center">
                  <button
                    onClick={() => setSelectedOrder(order)}
                    className="bg-blue-100 text-blue-600 p-1 rounded"
                  >
                    <Eye size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ================= MOBILE CARDS ================= */}
      <div className="grid gap-4 md:hidden">
        {filtered.map((order) => (
          <div
            key={order.id}
            className="bg-white rounded-xl shadow p-4 space-y-3"
          >
            <div className="flex justify-between">
              <p className="font-semibold">{order.id}</p>
              <span className="text-xs px-2 py-1 bg-gray-100 rounded">
                {order.status}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <img src={order.product.image} className="w-10 h-10 rounded" />
              <p className="text-sm font-medium">{order.product.name}</p>
            </div>

            <p className="text-sm text-gray-500">{order.customer}</p>
            <p className="font-semibold">${order.amount}</p>

            <select
              value={order.status}
              onChange={(e) =>
                updateStatus(order.id, e.target.value as OrderStatus)
              }
              className="w-full border rounded px-2 py-1 text-sm"
            >
              {statusFlow.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>

            <button
              onClick={() => setSelectedOrder(order)}
              className="w-full bg-blue-100 text-blue-600 py-2 rounded"
            >
              View Details
            </button>
          </div>
        ))}
      </div>

      {/* ================= DRAWER ================= */}
      <AnimatePresence>
        {selectedOrder && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/40 z-40"
              onClick={() => setSelectedOrder(null)}
            />

            <motion.div
              className="fixed right-0 top-0 h-full w-full sm:w-[420px] bg-white z-50 shadow-xl p-4 overflow-y-auto"
              initial={{ x: 400 }}
              animate={{ x: 0 }}
              exit={{ x: 400 }}
            >
              <div className="flex justify-between mb-4">
                <h2 className="font-semibold">Order Details</h2>
                <button onClick={() => setSelectedOrder(null)}>
                  <X />
                </button>
              </div>

              <div className="flex items-center gap-3 mb-4">
                <img
                  src={selectedOrder.product.image}
                  className="w-14 h-14 rounded object-cover"
                />
                <div>
                  <p className="font-semibold">{selectedOrder.product.name}</p>
                  <p className="text-xs text-gray-500">
                    {selectedOrder.customer}
                  </p>
                </div>
              </div>

              <select
                value={selectedOrder.status}
                onChange={(e) =>
                  updateStatus(selectedOrder.id, e.target.value as OrderStatus)
                }
                className="border rounded px-2 py-1 mb-4"
              >
                {statusFlow.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>

              {/* TIMELINE */}
              <div className="space-y-2">
                <h3 className="font-semibold">Shipment Progress</h3>

                {statusFlow.map((step) => {
                  const active =
                    statusFlow.indexOf(selectedOrder.status) >=
                    statusFlow.indexOf(step);

                  return (
                    <div key={step} className="flex items-center gap-2">
                      <div
                        className={`w-3 h-3 rounded-full ${
                          active ? "bg-green-500" : "bg-gray-300"
                        }`}
                      />
                      <span className="text-sm capitalize">{step}</span>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
