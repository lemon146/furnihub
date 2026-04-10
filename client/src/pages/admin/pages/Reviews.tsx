import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, MessageSquare, Check, X, Trash2, Send } from "lucide-react";

import {
  PieChart,
  Pie,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

export function ReviewsPage() {
  const [filter, setFilter] = useState("all");

  const filteredReviews =
    filter === "all" ? reviews : reviews.filter((r) => r.status === filter);

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-2 bg-white p-4 rounded-2xl shadow-sm border border-gray-100"
      >
        <MessageSquare className="text-gray-700" />
        <h2 className="text-xl font-bold text-gray-800">Reviews Management</h2>
      </motion.div>

      {/* ANALYTICS */}
      <div className="grid lg:grid-cols-3 gap-6 items-stretch">
        {/* LEFT: SMALL KPI */}
        <AnalyticsCard />

        {/* CENTER: SMALL DONUT */}
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex flex-col items-center justify-center h-72">
          <h3 className="font-semibold text-gray-800 mb-2">Rating</h3>
          <div className="w-full h-full">
            <RatingChart />
          </div>
        </div>

        {/* RIGHT: BIG TREND CHART */}
        <div className="lg:col-span-1 bg-white p-5 rounded-2xl border border-gray-100 shadow-sm h-72">
          <ReviewsTrendChart />
        </div>
      </div>

      {/* FILTERS */}
      <div className="flex gap-2 flex-wrap">
        {["all", "approved", "pending", "rejected"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition border ${
              filter === f
                ? "bg-black text-white border-black"
                : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50"
            }`}
          >
            {f.toUpperCase()}
          </button>
        ))}
      </div>

      {/* REVIEWS LIST */}
      <div className="space-y-5">
        <AnimatePresence>
          {filteredReviews.map((review, i) => (
            <ReviewCard key={review.id} review={review} index={i} />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ---------------- REVIEW CARD ---------------- */

function ReviewCard({ review, index }: any) {
  const [openReply, setOpenReply] = useState(false);
  const [reply, setReply] = useState(review.reply || "");

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ delay: index * 0.05 }}
      className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 space-y-4"
    >
      {/* TOP */}
      <div className="flex justify-between">
        <div>
          <h3 className="font-semibold text-gray-800">{review.user}</h3>
          <p className="text-sm text-gray-500">{review.product}</p>
        </div>

        <StatusBadge status={review.status} />
      </div>

      {/* STARS */}
      <div className="flex gap-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            size={16}
            className={
              i < review.rating
                ? "text-amber-400 fill-amber-400"
                : "text-gray-300"
            }
          />
        ))}
      </div>

      {/* COMMENT */}
      <p className="text-sm text-gray-600 leading-relaxed">{review.comment}</p>

      {/* ADMIN REPLY */}
      {review.reply && (
        <div className="bg-slate-50 border border-slate-200 p-3 rounded-xl">
          <p className="text-xs text-slate-500 mb-1">Admin reply</p>
          <p className="text-sm text-slate-700">{review.reply}</p>
        </div>
      )}

      {/* REPLY BUTTON */}
      <button
        onClick={() => setOpenReply(!openReply)}
        className="text-sm text-blue-600 hover:underline"
      >
        Reply to review
      </button>

      {/* REPLY BOX */}
      <AnimatePresence>
        {openReply && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden space-y-2"
          >
            <textarea
              value={reply}
              onChange={(e) => setReply(e.target.value)}
              placeholder="Write admin response..."
              className="w-full border border-gray-200 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-black/10"
            />

            <button className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-xl hover:scale-[1.02] transition">
              <Send size={16} />
              Send Reply
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ACTIONS */}
      <div className="flex items-center justify-end gap-2 pt-3 border-t border-gray-100">
        <button className="flex items-center gap-1 px-3 py-1.5 rounded-xl text-emerald-700 bg-emerald-50 hover:bg-emerald-100 text-sm transition">
          <Check size={16} />
          Approve
        </button>

        <button className="flex items-center gap-1 px-3 py-1.5 rounded-xl text-rose-700 bg-rose-50 hover:bg-rose-100 text-sm transition">
          <X size={16} />
          Reject
        </button>

        <button className="flex items-center gap-1 px-3 py-1.5 rounded-xl text-gray-600 bg-gray-50 hover:bg-gray-100 text-sm transition">
          <Trash2 size={16} />
          Delete
        </button>
      </div>
    </motion.div>
  );
}

/* ---------------- STATUS BADGE ---------------- */

function StatusBadge({ status }: any) {
  const styles =
    status === "approved"
      ? "bg-emerald-50 text-emerald-700 border-emerald-200"
      : status === "pending"
        ? "bg-amber-50 text-amber-700 border-amber-200"
        : "bg-rose-50 text-rose-700 border-rose-200";

  return (
    <span
      className={`text-xs font-medium px-3 py-1 flex items-center rounded-full border ${styles}`}
    >
      {status.toUpperCase()}
    </span>
  );
}

/* ---------------- ANALYTICS ---------------- */

function AnalyticsCard() {
  return (
    <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
      <h3 className="font-semibold text-gray-800 mb-2">Average Rating</h3>

      <div className="text-4xl font-bold text-gray-900">4.2 ⭐</div>

      <p className="text-sm text-gray-500 mt-2">Based on 128 reviews</p>
    </div>
  );
}

/* ---------------- CHART ---------------- */

function RatingChart() {
  const data = [
    { name: "5★", value: 60, fill: "#10b981" },
    { name: "4★", value: 30, fill: "#3b82f6" },
    { name: "3★", value: 15, fill: "#f59e0b" },
    { name: "2★", value: 8, fill: "#f97316" },
    { name: "1★", value: 5, fill: "#ef4444" },
  ];

  return (
    <div className="w-full h-[180px] flex items-center justify-center">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Tooltip />

          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            innerRadius={50}
            outerRadius={70}
            paddingAngle={4}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

function ReviewsTrendChart() {
  const data = [
    { day: "Mon", reviews: 12 },
    { day: "Tue", reviews: 18 },
    { day: "Wed", reviews: 10 },
    { day: "Thu", reviews: 25 },
    { day: "Fri", reviews: 30 },
    { day: "Sat", reviews: 22 },
    { day: "Sun", reviews: 28 },
  ];

  return (
    <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm h-72">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-800">Reviews Trend</h3>

        <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-600">
          Last 7 days
        </span>
      </div>

      <ResponsiveContainer width="100%" height="85%">
        <LineChart data={data}>
          {/* Remove ugly grid */}
          <XAxis
            dataKey="day"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#2d520b", fontSize: 12 }}
          />

          <Tooltip
            contentStyle={{
              backgroundColor: "#20d690",
              border: "none",
              borderRadius: "10px",
              color: "#fff",
            }}
            labelStyle={{ color: "#0c5ce6" }}
          />

          <Line
            type="monotone"
            dataKey="reviews"
            stroke="#523233"
            strokeWidth={3}
            dot={{
              r: 4,
              fill: "#111827",
              stroke: "#fff",
              strokeWidth: 2,
            }}
            activeDot={{
              r: 6,
              fill: "#111827",
              stroke: "#fff",
              strokeWidth: 2,
            }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
/* ---------------- MOCK DATA ---------------- */

const reviews = [
  {
    id: 1,
    user: "Ali Khan",
    product: "Luxury Sofa",
    rating: 5,
    comment: "Amazing quality and very comfortable!",
    status: "approved",
    reply: "Thank you! We’re happy you loved it 😊",
  },
  {
    id: 2,
    user: "Sarah Ahmed",
    product: "Wooden Chair",
    rating: 4,
    comment: "Good product but delivery was slow.",
    status: "pending",
    reply: "",
  },
  {
    id: 3,
    user: "John Doe",
    product: "Dining Table",
    rating: 2,
    comment: "Not satisfied with the quality.",
    status: "rejected",
    reply: "",
  },
];
