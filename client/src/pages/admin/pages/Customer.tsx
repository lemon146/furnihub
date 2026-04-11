import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Users, ShoppingBag, Eye, Ban, Trash2, X } from "lucide-react";

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

/* ================= DATA ================= */
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
  const [search, setSearch] = useState("");
  const [customers, setCustomers] = useState<Customer[]>(dummyCustomers);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(
    null,
  );
  const [tab, setTab] = useState<"overview" | "orders">("overview");

  const filtered = customers.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase()),
  );

  const getInitials = (name: string) =>
    name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();

  const toggleStatus = (id: string) => {
    setCustomers((prev) =>
      prev.map((c) =>
        c.id === id
          ? { ...c, status: c.status === "active" ? "blocked" : "active" }
          : c,
      ),
    );

    setSelectedCustomer((prev) =>
      prev && prev.id === id
        ? { ...prev, status: prev.status === "active" ? "blocked" : "active" }
        : prev,
    );
  };

  return (
    <motion.div className="p-4 sm:p-6 space-y-6">
      {/* ================= HEADER ================= */}
      <div className="flex flex-col sm:flex-row justify-between gap-3">
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

      {/* ================= DESKTOP TABLE ================= */}
      <div className="hidden md:block bg-white rounded-xl shadow overflow-x-auto">
        <table className="w-full min-w-[800px] text-sm">
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
            {filtered.map((customer) => (
              <tr key={customer.id} className="border-t hover:bg-gray-50">
                <td className="p-3 font-medium">{customer.name}</td>
                <td className="p-3 text-gray-600">{customer.email}</td>

                <td className="p-3 flex items-center gap-1">
                  <ShoppingBag size={14} />
                  {customer.orders}
                </td>

                <td className="p-3">
                  <span
                    className={`px-2 py-1 rounded text-xs ${
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
                      className="p-1.5 bg-blue-100 text-blue-600 rounded"
                    >
                      <Eye size={16} />
                    </button>

                    <button
                      onClick={() => toggleStatus(customer.id)}
                      className="p-1.5 bg-yellow-100 text-yellow-600 rounded"
                    >
                      <Ban size={16} />
                    </button>

                    <button className="p-1.5 bg-red-100 text-red-600 rounded">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ================= MOBILE CARDS ================= */}
      <div className="grid gap-4 md:hidden">
        {filtered.map((customer) => (
          <div
            key={customer.id}
            className="bg-white shadow rounded-xl p-4 space-y-3"
          >
            <div className="flex justify-between">
              <p className="font-semibold">{customer.name}</p>
              <span
                className={`text-xs px-2 py-1 rounded ${
                  customer.status === "active"
                    ? "bg-green-100 text-green-600"
                    : "bg-red-100 text-red-600"
                }`}
              >
                {customer.status}
              </span>
            </div>

            <p className="text-sm text-gray-500">{customer.email}</p>

            <p className="text-sm flex items-center gap-1">
              <ShoppingBag size={14} /> {customer.orders} orders
            </p>

            <div className="flex gap-2">
              <button
                onClick={() => setSelectedCustomer(customer)}
                className="flex-1 bg-blue-100 text-blue-600 py-2 rounded text-sm"
              >
                View
              </button>

              <button
                onClick={() => toggleStatus(customer.id)}
                className="flex-1 bg-yellow-100 text-yellow-600 py-2 rounded text-sm"
              >
                Toggle
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ================= DRAWER ================= */}
      <AnimatePresence>
        {selectedCustomer && (
          <>
            {/* BACKDROP */}
            <motion.div
              className="fixed inset-0 bg-black/40 z-40"
              onClick={() => setSelectedCustomer(null)}
            />

            {/* PANEL (FULL MOBILE + SIDE DESKTOP) */}
            <motion.div
              className="fixed top-0 right-0 h-full w-full sm:w-[420px] bg-white z-50 shadow-xl flex flex-col"
              initial={{ x: 400 }}
              animate={{ x: 0 }}
              exit={{ x: 400 }}
            >
              {/* HEADER */}
              <div className="p-4 border-b flex justify-between">
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
                <div className="bg-gray-50 p-3 rounded">
                  <p className="text-xs text-gray-500">Orders</p>
                  <p className="font-semibold">{selectedCustomer.orders}</p>
                </div>

                <div className="bg-gray-50 p-3 rounded">
                  <p className="text-xs text-gray-500">Spent</p>
                  <p className="font-semibold">
                    ${selectedCustomer.totalSpent}
                  </p>
                </div>
              </div>

              {/* ACTION */}
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

              {/* CONTENT */}
              <div className="p-4 text-sm space-y-2 overflow-y-auto">
                <p>
                  <b>Phone:</b> {selectedCustomer.phone}
                </p>
                <p>
                  <b>Address:</b> {selectedCustomer.address}
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
