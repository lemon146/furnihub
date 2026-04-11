import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Mail, User, X, Send, Eye, Trash2 } from "lucide-react";

/* ================= TYPES ================= */
type Message = {
  id: string;
  name: string;
  email: string;
  message: string;
  time: string;
  read: boolean;
};

/* ================= DATA ================= */
const dummyMessages: Message[] = [
  {
    id: "1",
    name: "Ali Khan",
    email: "ali@example.com",
    message: "I want to know about delivery time for sofa set.",
    time: "2 min ago",
    read: false,
  },
  {
    id: "2",
    name: "Sara Ahmed",
    email: "sara@example.com",
    message: "Do you have discount on wooden tables?",
    time: "1 hour ago",
    read: true,
  },
  {
    id: "3",
    name: "John Doe",
    email: "john@example.com",
    message: "My order is delayed, please check.",
    time: "Yesterday",
    read: false,
  },
];

/* ================= COMPONENT ================= */
export default function MessagesPage() {
  const [messages, setMessages] = useState<Message[]>(dummyMessages);
  const [selected, setSelected] = useState<Message | null>(null);
  const [search, setSearch] = useState("");
  const [openReply, setOpenReply] = useState(false);

  const filtered = messages.filter((m) =>
    m.name.toLowerCase().includes(search.toLowerCase()),
  );

  const openMessage = (msg: Message) => {
    setSelected(msg);
    setOpenReply(false);

    setMessages((prev) =>
      prev.map((m) => (m.id === msg.id ? { ...m, read: true } : m)),
    );
  };

  const deleteMessage = (id: string) => {
    setMessages((prev) => prev.filter((m) => m.id !== id));
  };

  return (
    <motion.div className="p-4 sm:p-6 space-y-6">
      {/* ================= HEADER ================= */}
      <div className="flex flex-col sm:flex-row justify-between gap-3">
        <h1 className="text-xl sm:text-2xl font-bold flex items-center gap-2">
          <Mail size={22} /> Messages
        </h1>

        <input
          className="border rounded-lg px-3 py-2 w-full sm:w-72 text-sm"
          placeholder="Search messages..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* ================= DESKTOP LIST ================= */}
      <div className="hidden md:block bg-white rounded-xl shadow overflow-hidden">
        {filtered.map((msg) => (
          <div
            key={msg.id}
            onClick={() => openMessage(msg)}
            className={`group relative p-4 border-b cursor-pointer hover:bg-gray-50 flex justify-between transition ${
              !msg.read ? "bg-blue-50" : ""
            }`}
          >
            {/* LEFT CONTENT */}
            <div>
              <p className="font-medium flex items-center gap-2">
                <User size={14} /> {msg.name}
              </p>

              <p className="text-xs text-gray-500">{msg.email}</p>

              <p className="text-sm text-gray-600 line-clamp-1 mt-1">
                {msg.message}
              </p>
            </div>

            {/* TIME */}
            <span className="text-xs text-gray-400">{msg.time}</span>

            {/* ================= HOVER ACTIONS ================= */}
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition">
              {/* VIEW */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  openMessage(msg);
                }}
                className="p-1.5 rounded bg-blue-100 text-blue-600 hover:scale-110 transition"
              >
                <Eye size={14} />
              </button>

              {/* REPLY */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  openMessage(msg);
                  setOpenReply(true);
                }}
                className="p-1.5 rounded bg-green-100 text-green-600 hover:scale-110 transition"
              >
                💬
              </button>

              {/* DELETE */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  deleteMessage(msg.id);
                }}
                className="p-1.5 rounded bg-red-100 text-red-600 hover:scale-110 transition"
              >
                <Trash2 size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ================= MOBILE CARDS ================= */}
      <div className="grid gap-4 md:hidden">
        {filtered.map((msg) => (
          <div
            key={msg.id}
            onClick={() => openMessage(msg)}
            className={`bg-white p-4 rounded-xl shadow space-y-2 ${
              !msg.read ? "border-l-4 border-blue-500" : ""
            }`}
          >
            <p className="font-semibold">{msg.name}</p>
            <p className="text-sm text-gray-500 line-clamp-2">{msg.message}</p>

            <div className="flex justify-between items-center">
              <p className="text-xs text-gray-400">{msg.time}</p>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  deleteMessage(msg.id);
                }}
                className="text-xs text-red-500"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ================= DRAWER ================= */}
      <AnimatePresence>
        {selected && (
          <>
            {/* BACKDROP */}
            <motion.div
              className="fixed inset-0 bg-black/40 z-40"
              onClick={() => setSelected(null)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            {/* PANEL */}
            <motion.div
              className="fixed top-0 right-0 h-full w-full sm:w-[420px] bg-white z-50 shadow-xl flex flex-col"
              initial={{ x: 400 }}
              animate={{ x: 0 }}
              exit={{ x: 400 }}
            >
              {/* HEADER */}
              <div className="p-4 border-b flex justify-between">
                <h2 className="font-semibold">Message</h2>
                <button onClick={() => setSelected(null)}>
                  <X />
                </button>
              </div>

              {/* CONTENT */}
              <div className="p-4 space-y-3 text-sm">
                <div>
                  <p className="font-semibold">{selected.name}</p>
                  <p className="text-gray-500">{selected.email}</p>
                </div>

                <div className="bg-gray-50 p-3 rounded-xl">
                  {selected.message}
                </div>

                <p className="text-xs text-gray-400">{selected.time}</p>
              </div>

              {/* ================= REPLY BOX ================= */}
              <div className="mt-auto p-4 border-t space-y-3">
                <button
                  onClick={() => setOpenReply((p) => !p)}
                  className="text-sm text-blue-600 hover:underline"
                >
                  Reply to message
                </button>

                <AnimatePresence>
                  {openReply && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden space-y-2"
                    >
                      <textarea
                        placeholder="Write your reply..."
                        className="w-full border border-gray-200 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-black/10"
                        rows={4}
                      />

                      <div className="flex items-center justify-between">
                        <button className="text-xs text-gray-500 hover:text-gray-700">
                          Save draft
                        </button>

                        <button className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-xl hover:scale-[1.02] transition">
                          <Send size={16} />
                          Send Reply
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
