import { deleteCustomer, getAllUsers } from "@/api/customer.api";
import CustomersSkeleton from "@/components/admin/CustomersSkeleton";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { AnimatePresence, motion } from "framer-motion";
import { Eye, Search, ShoppingBag, Trash2, Users, X } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

/* ================= TYPES ================= */
type Customer = {
  _id: string;
  fullName: string;
  email: string;
  phone?: string;
  address?: string;
};

// No orders exist yet, so these are 0 for now
const ORDERS_COUNT = 0;
const TOTAL_SPENT = 0;

/* ================= HELPERS ================= */
const getErrorMessage = (err: unknown, fallback: string) => {
  if (isAxiosError(err)) {
    return err.response?.data?.message || err.message || fallback;
  }
  if (err instanceof Error) return err.message;
  return fallback;
};

const getInitials = (name: string) =>
  name
    .split(" ")
    .filter(Boolean)
    .map((n) => n[0])
    .join("")
    .toUpperCase();

/* ================= COMPONENT ================= */
export default function CustomersPage() {
  const [search, setSearch] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(
    null,
  );

  const queryClient = useQueryClient();

  const { data, isPending, isError, error, refetch } = useQuery({
    queryKey: ["customers"],
    queryFn: getAllUsers,
  });

  // Hooks must stay ABOVE the early returns
  const {
    mutate: removeCustomer,
    isPending: isDeleting,
    variables: deletingId,
  } = useMutation({
    mutationFn: deleteCustomer,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["customers"] });
      setSelectedCustomer(null);
    },
    onError: (err) => {
      toast.error(getErrorMessage(err, "Failed to delete customer"));
    },
  });

  const handleDelete = (customer: Customer) => {
    if (
      !window.confirm(`Delete ${customer.fullName}? This cannot be undone.`)
    ) {
      return;
    }
    removeCustomer(customer._id);
    toast.success("Customer deleted successfully");
  };

  if (isPending) return <CustomersSkeleton />;

  if (isError) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-center">
        <p className="text-red-600">
          {getErrorMessage(error, "Failed to load customers")}
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

  const customers: Customer[] = data?.user ?? [];

  const filtered = customers.filter((c) =>
    c.fullName.toLowerCase().includes(search.toLowerCase()),
  );

  const isDeletingThis = (id: string) => isDeleting && deletingId === id;

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

      {filtered.length === 0 && (
        <p className="text-center text-gray-500">No customers found.</p>
      )}

      {/* ================= DESKTOP TABLE ================= */}
      <div className="hidden md:block bg-white rounded-xl shadow overflow-x-auto">
        <table className="w-full min-w-[800px] text-sm">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Orders</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filtered.map((customer) => (
              <tr
                key={customer._id}
                className={`border-t hover:bg-gray-50 ${
                  isDeletingThis(customer._id) ? "opacity-50" : ""
                }`}
              >
                <td className="p-3 font-medium">{customer.fullName}</td>
                <td className="p-3 text-gray-600">{customer.email}</td>

                <td className="p-3">
                  <span className="flex items-center gap-1">
                    <ShoppingBag size={14} />
                    {ORDERS_COUNT}
                  </span>
                </td>

                <td className="p-3">
                  <div className="flex justify-center gap-2">
                    <button
                      onClick={() => setSelectedCustomer(customer)}
                      aria-label={`View ${customer.fullName}`}
                      className="p-1.5 bg-blue-100 text-blue-600 rounded"
                    >
                      <Eye size={16} />
                    </button>

                    <button
                      onClick={() => handleDelete(customer)}
                      disabled={isDeletingThis(customer._id)}
                      aria-label={`Delete ${customer.fullName}`}
                      className="p-1.5 bg-red-100 text-red-600 rounded disabled:cursor-not-allowed disabled:opacity-50"
                    >
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
            key={customer._id}
            className={`bg-white shadow rounded-xl p-4 space-y-3 ${
              isDeletingThis(customer._id) ? "opacity-50" : ""
            }`}
          >
            <p className="font-semibold">{customer.fullName}</p>
            <p className="text-sm text-gray-500">{customer.email}</p>

            <p className="text-sm flex items-center gap-1">
              <ShoppingBag size={14} /> {ORDERS_COUNT} orders
            </p>

            <div className="flex gap-2">
              <button
                onClick={() => setSelectedCustomer(customer)}
                className="flex-1 bg-blue-100 text-blue-600 py-2 rounded text-sm"
              >
                View
              </button>

              <button
                onClick={() => handleDelete(customer)}
                disabled={isDeletingThis(customer._id)}
                className="flex-1 bg-red-100 text-red-600 py-2 rounded text-sm disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isDeletingThis(customer._id) ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ================= DRAWER ================= */}
      <AnimatePresence>
        {selectedCustomer && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/40 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedCustomer(null)}
            />

            <motion.div
              className="fixed top-0 right-0 h-full w-full sm:w-[420px] bg-white z-50 shadow-xl flex flex-col"
              initial={{ x: 400 }}
              animate={{ x: 0 }}
              exit={{ x: 400 }}
            >
              <div className="p-4 border-b flex justify-between">
                <h2 className="font-semibold">Customer Profile</h2>
                <button
                  onClick={() => setSelectedCustomer(null)}
                  aria-label="Close"
                >
                  <X />
                </button>
              </div>

              <div className="p-4 flex items-center gap-3 border-b">
                <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center font-bold">
                  {getInitials(selectedCustomer.fullName)}
                </div>
                <div>
                  <p className="font-semibold">{selectedCustomer.fullName}</p>
                  <p className="text-sm text-gray-500">
                    {selectedCustomer.email}
                  </p>
                </div>
              </div>

              <div className="p-4 grid grid-cols-2 gap-3 border-b">
                <div className="bg-gray-50 p-3 rounded">
                  <p className="text-xs text-gray-500">Orders</p>
                  <p className="font-semibold">{ORDERS_COUNT}</p>
                </div>
                <div className="bg-gray-50 p-3 rounded">
                  <p className="text-xs text-gray-500">Spent</p>
                  <p className="font-semibold">${TOTAL_SPENT}</p>
                </div>
              </div>

              <div className="p-4 text-sm space-y-2 flex-1 overflow-y-auto">
                <p>
                  <b>Phone:</b> {selectedCustomer.phone ?? "—"}
                </p>
                <p>
                  <b>Address:</b> {selectedCustomer.address ?? "—"}
                </p>
              </div>

              <div className="p-4 border-t">
                <button
                  onClick={() => handleDelete(selectedCustomer)}
                  disabled={isDeletingThis(selectedCustomer._id)}
                  className="w-full py-2 rounded text-sm font-medium bg-red-100 text-red-600 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {isDeletingThis(selectedCustomer._id)
                    ? "Deleting..."
                    : "Delete Customer"}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
