import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Users,
  Mail,
  ShoppingBag,
  Eye,
  Ban,
  Trash2,
  X,
} from "lucide-react";

/* ================= TYPES ================= */
type Order = {
  id: string;
  amount: number;
};

type Customer = {
  id: string;
  name: string;
  email: string;
  orders: number;
  totalSpent: number;
  status: "active" | "blocked";
  phone: string;
  address: string;
  recentOrders: Order[];
};

/* ================= DUMMY DATA ================= */
const dummyCustomers: Customer[] = [
  {
    id: "1",
    name: "Ali Khan",
    email: "ali@example.com",
    orders: 5,
    totalSpent: 320,
    status: "active",
    phone: "+92 300 1234567",
    address: "Karachi, Pakistan",
    recentOrders: [
      { id: "#101", amount: 120 },
      { id: "#102", amount: 200 },
    ],
  },
  {
    id: "2",
    name: "Sara Ahmed",
    email: "sara@example.com",
    orders: 2,
    totalSpent: 90,
    status: "blocked",
    phone: "+92 321 9876543",
    address: "Lahore, Pakistan",
    recentOrders: [{ id: "#103", amount: 90 }],
  },
];

/* ================= COMPONENT ================= */
export default function CustomersPage() {
  const [search, setSearch] = useState<string>("");
  const [customers, setCustomers] = useState<Customer[]>(dummyCustomers);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(
    null,
  );
  const [tab, setTab] = useState<"overview" | "orders">("overview");

  /* ================= FILTER ================= */
  const filtered = customers.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase()),
  );

  /* ================= HELPERS ================= */
  const getInitials = (name: string) =>
    name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();

  /* ================= TOGGLE STATUS ================= */
  const toggleStatus = (id: string) => {
    setCustomers((prev) =>
      prev.map((c) =>
        c.id === id
          ? {
              ...c,
              status: c.status === "active" ? "blocked" : "active",
            }
          : c,
      ),
    );

    setSelectedCustomer((prev) =>
      prev && prev.id === id
        ? {
            ...prev,
            status: prev.status === "active" ? "blocked" : "active",
          }
        : prev,
    );
  };

  /* ================= UI ================= */
  return (
    <motion.div
      className="p-4 sm:p-6 space-y-6"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <h1 className="text-xl sm:text-2xl font-bold flex items-center gap-2">
          <Users size={22} /> Customers
        </h1>

        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
          <input
            className="pl-9 pr-3 py-2 w-full border rounded-lg text-sm"
            placeholder="Search customers..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* TABLE */}
      <div className="hidden md:block bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Orders</th>
              <th className="p-3">Status</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filtered.map((customer, i) => (
              <motion.tr
                key={customer.id}
                className="border-t hover:bg-gray-50"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <td className="p-3 font-medium">{customer.name}</td>

                <td className="p-3 text-gray-600">{customer.email}</td>

                <td className="p-3">
                  <div className="flex items-center gap-1">
                    <ShoppingBag size={14} />
                    {customer.orders}
                  </div>
                </td>

                <td className="p-3">
                  <span
                    className={`px-2 py-1 rounded text-xs font-medium ${
                      customer.status === "active"
                        ? "bg-green-100 text-green-600"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {customer.status}
                  </span>
                </td>

                <td className="p-3">
                  <div className="flex justify-center gap-2">
                    <button
                      onClick={() => {
                        setSelectedCustomer(customer);
                        setTab("overview");
                      }}
                      className="p-1.5 rounded bg-blue-100 text-blue-600"
                    >
                      <Eye size={16} />
                    </button>

                    <button
                      onClick={() => toggleStatus(customer.id)}
                      className={`p-1.5 rounded ${
                        customer.status === "active"
                          ? "bg-red-100 text-red-600"
                          : "bg-green-100 text-green-600"
                      }`}
                    >
                      <Ban size={16} />
                    </button>

                    <button className="p-1.5 rounded bg-red-100 text-red-600">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ================= DRAWER ================= */}
      <AnimatePresence>
        {selectedCustomer && (
          <>
            {/* BACKDROP */}
            <motion.div
              className="fixed inset-0 bg-black/40 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedCustomer(null)}
            />

            {/* PANEL */}
            <motion.div
              className="fixed top-0 right-0 h-full w-full sm:w-[420px] bg-white z-50 shadow-xl flex flex-col"
              initial={{ x: 500 }}
              animate={{ x: 0 }}
              exit={{ x: 500 }}
              transition={{ type: "tween" }}
            >
              {/* HEADER */}
              <div className="p-4 border-b flex justify-between items-center">
                <h2 className="font-semibold">Customer Profile</h2>
                <button onClick={() => setSelectedCustomer(null)}>
                  <X />
                </button>
              </div>

              {/* PROFILE */}
              <div className="p-4 flex items-center gap-3 border-b">
                <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center font-bold">
                  {getInitials(selectedCustomer.name)}
                </div>

                <div>
                  <p className="font-semibold">{selectedCustomer.name}</p>
                  <p className="text-sm text-gray-500">
                    {selectedCustomer.email}
                  </p>
                </div>
              </div>

              {/* STATS */}
              <div className="p-4 grid grid-cols-2 gap-3 border-b">
                <div className="p-3 bg-gray-50 rounded">
                  <p className="text-xs text-gray-500">Orders</p>
                  <p className="font-semibold">{selectedCustomer.orders}</p>
                </div>

                <div className="p-3 bg-gray-50 rounded">
                  <p className="text-xs text-gray-500">Spent</p>
                  <p className="font-semibold">
                    ${selectedCustomer.totalSpent}
                  </p>
                </div>
              </div>

              {/* STATUS TOGGLE */}
              <div className="p-4">
                <button
                  onClick={() => toggleStatus(selectedCustomer.id)}
                  className={`w-full py-2 rounded text-sm font-medium ${
                    selectedCustomer.status === "active"
                      ? "bg-red-100 text-red-600"
                      : "bg-green-100 text-green-600"
                  }`}
                >
                  {selectedCustomer.status === "active"
                    ? "Block Customer"
                    : "Activate Customer"}
                </button>
              </div>

              {/* TABS */}
              <div className="flex border-b">
                <button
                  onClick={() => setTab("overview")}
                  className={`flex-1 p-3 text-sm ${
                    tab === "overview"
                      ? "border-b-2 border-black font-medium"
                      : "text-gray-500"
                  }`}
                >
                  Overview
                </button>

                <button
                  onClick={() => setTab("orders")}
                  className={`flex-1 p-3 text-sm ${
                    tab === "orders"
                      ? "border-b-2 border-black font-medium"
                      : "text-gray-500"
                  }`}
                >
                  Orders
                </button>
              </div>

              {/* CONTENT */}
              <div className="p-4 flex-1 overflow-y-auto">
                {tab === "overview" && (
                  <div className="space-y-2 text-sm">
                    <p>
                      <b>Phone:</b> {selectedCustomer.phone}
                    </p>
                    <p>
                      <b>Address:</b> {selectedCustomer.address}
                    </p>
                  </div>
                )}

                {tab === "orders" && (
                  <div className="space-y-3">
                    {selectedCustomer.recentOrders.map((o) => (
                      <div
                        key={o.id}
                        className="p-3 border rounded flex justify-between"
                      >
                        <span>{o.id}</span>
                        <span>${o.amount}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
