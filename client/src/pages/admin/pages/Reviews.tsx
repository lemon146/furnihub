import {
  deleteReplyReview,
  deleteReview,
  getAllReviews,
  getReviewStats,
  replyReview,
  updateReplyReview,
} from "@/api/reviews";
import ReviewsSkeleton from "@/components/admin/ReviewsSkeleton";
import { Review, ReviewStats } from "@/types/review";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AnimatePresence, motion } from "framer-motion";
import {
  MessageSquare,
  Pencil,
  Search,
  Send,
  Star,
  Trash2,
  X,
} from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

const PAGE_SIZE = 6;

export function ReviewsPage() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const queryClient = useQueryClient();

  const {
    data: reviewsRes,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["admin-reviews"],
    queryFn: getAllReviews,
  });

  const {
    data: statsRes,
    isPending: isStatsPending,
    isError: isStatsError,
  } = useQuery({
    queryKey: ["review-stats"],
    queryFn: getReviewStats,
  });

  const reviews: Review[] = reviewsRes?.reviews ?? [];
  const stats: ReviewStats | undefined = statsRes?.stats;

  const filtered = reviews.filter((r) => {
    const q = search.toLowerCase();
    return (
      r.user?.fullName?.toLowerCase().includes(q) ||
      r.product?.title?.toLowerCase().includes(q) ||
      r.comment?.toLowerCase().includes(q)
    );
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const invalidate = () => {
    queryClient.invalidateQueries({ queryKey: ["admin-reviews"] });
    queryClient.invalidateQueries({ queryKey: ["review-stats"] });
  };

  const deleteMutation = useMutation({
    mutationFn: deleteReview,
    onSuccess: () => {
      toast.success("Review deleted");
      invalidate();
    },
    onError: () => toast.error("Failed to delete review"),
  });

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-2 bg-white p-4 rounded-2xl shadow-sm border border-gray-100"
      >
        <MessageSquare className="text-gray-700" />
        <h2 className="text-xl font-bold text-gray-800">Reviews Management</h2>
      </motion.div>

      {/* KPI CARDS */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {isStatsPending ? (
          Array.from({ length: 4 }).map((_, i) => <StatCardSkeleton key={i} />)
        ) : isStatsError ? (
          <div className="col-span-full rounded-xl border border-red-100 bg-white p-4">
            <p className="text-sm text-red-600">
              Failed to load review statistics.
            </p>
          </div>
        ) : (
          <>
            <StatCard label="Total Reviews" value={stats?.totalReviews ?? 0} />

            <StatCard
              label="Average Rating"
              value={`${stats?.averageRating ?? 0} ⭐`}
            />

            <StatCard
              label="Pending Replies"
              value={stats?.pendingReplies ?? 0}
            />

            <StatCard
              label="5-Star Reviews"
              value={stats?.fiveStarReviews ?? 0}
            />
          </>
        )}
      </div>

      {/* SEARCH */}
      <div className="relative max-w-md">
        <Search
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          size={18}
        />
        <input
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          placeholder="Search by user, product, or comment..."
          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-black/10"
        />
      </div>

      {/* LIST */}
      {isPending ? (
        <ReviewsSkeleton />
      ) : isError ? (
        <div className="rounded-2xl border border-red-100 bg-white px-6 py-12 text-center">
          <p className="font-medium text-red-600">Failed to load reviews.</p>

          <button
            onClick={() =>
              queryClient.invalidateQueries({
                queryKey: ["admin-reviews"],
              })
            }
            className="mt-4 rounded-xl bg-[#B88E2F] px-5 py-2 text-sm font-medium text-white transition hover:bg-[#a47d25]"
          >
            Try Again
          </button>
        </div>
      ) : paginated.length === 0 ? (
        <p className="py-10 text-center text-gray-500">No reviews found.</p>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2">
          <AnimatePresence>
            {paginated.map((review, i) => (
              <ReviewCard
                key={review._id}
                review={review}
                index={i}
                onDelete={() => deleteMutation.mutate(review._id)}
                onMutated={invalidate}
              />
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* PAGINATION */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 pt-4">
          <button
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
            className="px-3 py-1.5 rounded-lg border text-sm disabled:opacity-40"
          >
            Prev
          </button>
          <span className="text-sm text-gray-600">
            Page {page} of {totalPages}
          </span>
          <button
            disabled={page === totalPages}
            onClick={() => setPage((p) => p + 1)}
            className="px-3 py-1.5 rounded-lg border text-sm disabled:opacity-40"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="bg-white p-4 sm:p-5 rounded-2xl border border-gray-100 shadow-sm">
      <p className="text-xs sm:text-sm text-gray-500">{label}</p>
      <p className="text-2xl sm:text-3xl font-bold text-gray-900 mt-1">
        {value}
      </p>
    </div>
  );
}

function ReviewCard({
  review,
  index,
  onDelete,
  onMutated,
}: {
  review: Review;
  index: number;
  onDelete: () => void;
  onMutated: () => void;
}) {
  const [openReply, setOpenReply] = useState(false);
  const [message, setMessage] = useState(review.reply?.message ?? "");
  const isEditingReply = !!review.reply;

  const replyMutation = useMutation({
    mutationFn: () =>
      isEditingReply
        ? updateReplyReview(review._id, message)
        : replyReview(review._id, message),
    onSuccess: () => {
      toast.success(isEditingReply ? "Reply updated" : "Reply sent");
      setOpenReply(false);
      onMutated();
    },
    onError: () => toast.error("Failed to save reply"),
  });

  const deleteReplyMutation = useMutation({
    mutationFn: () => deleteReplyReview(review._id),
    onSuccess: () => {
      toast.success("Reply deleted");
      setMessage("");
      onMutated();
    },
    onError: () => toast.error("Failed to delete reply"),
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ delay: index * 0.04 }}
      className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 sm:p-5 space-y-3"
    >
      <div className="flex justify-between items-start gap-2">
        <div className="min-w-0">
          <h3 className="font-semibold text-gray-800 truncate">
            {review.user?.fullName ?? "Anonymous"}
          </h3>
          <p className="text-sm text-gray-500 truncate">
            {review.product?.title}
          </p>
        </div>
        <div className="flex gap-1 shrink-0">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              size={14}
              className={
                i < review.rating
                  ? "text-amber-400 fill-amber-400"
                  : "text-gray-300"
              }
            />
          ))}
        </div>
      </div>

      <p className="text-sm text-gray-600 leading-relaxed break-words">
        {review.comment}
      </p>

      {review.reply && !openReply && (
        <div className="bg-slate-50 border border-slate-200 p-3 rounded-xl">
          <p className="text-xs text-slate-500 mb-1">
            Admin reply · {review.reply.user?.fullName}
          </p>
          <p className="text-sm text-slate-700 break-words">
            {review.reply.message}
          </p>
        </div>
      )}

      <div className="flex flex-wrap items-center gap-3 pt-2 border-t border-gray-100">
        <button
          onClick={() => setOpenReply((v) => !v)}
          className="flex items-center gap-1 text-sm text-blue-600 hover:underline"
        >
          <Pencil size={14} />
          {review.reply ? "Edit reply" : "Reply"}
        </button>

        {review.reply && (
          <button
            onClick={() => deleteReplyMutation.mutate()}
            className="flex items-center gap-1 text-sm text-rose-600 hover:underline"
          >
            <X size={14} />
            Remove reply
          </button>
        )}

        <button
          onClick={onDelete}
          className="flex items-center gap-1 text-sm text-gray-500 hover:underline ml-auto"
        >
          <Trash2 size={14} />
          Delete review
        </button>
      </div>

      <AnimatePresence>
        {openReply && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden space-y-2"
          >
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Write admin response..."
              rows={3}
              className="w-full border border-gray-200 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-black/10"
            />
            <button
              onClick={() => replyMutation.mutate()}
              disabled={!message.trim() || replyMutation.isPending}
              className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-xl hover:opacity-90 transition disabled:opacity-40"
            >
              <Send size={16} />
              {replyMutation.isPending ? "Saving..." : "Send Reply"}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
function StatCardSkeleton() {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm sm:p-5">
      <div className="mb-3 h-4 w-24 animate-pulse rounded bg-gray-200" />
      <div className="h-8 w-16 animate-pulse rounded bg-gray-200" />
    </div>
  );
}
