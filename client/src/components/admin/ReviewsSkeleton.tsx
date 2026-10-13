import { MessageSquare, Search } from "lucide-react";

export default function ReviewsSkeleton() {
  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex items-center gap-3 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
        <div className="flex size-10 animate-pulse items-center justify-center rounded-xl bg-[#B88E2F]/10">
          <MessageSquare className="size-5 text-[#B88E2F]/40" />
        </div>

        <div className="h-6 w-48 animate-pulse rounded-md bg-gray-200" />
      </div>

      {/* KPI CARDS */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm sm:p-5"
          >
            <div className="mb-3 h-4 w-24 max-w-full animate-pulse rounded bg-gray-200" />
            <div className="h-8 w-16 animate-pulse rounded-md bg-gray-200" />
          </div>
        ))}
      </div>

      {/* SEARCH */}
      <div className="relative max-w-md">
        <Search
          size={18}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300"
        />
        <div className="h-11 w-full animate-pulse rounded-xl border border-gray-200 bg-gray-100" />
      </div>

      {/* REVIEW CARDS */}
      <div className="grid gap-5 sm:grid-cols-2">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="space-y-4 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm sm:p-5"
          >
            {/* USER + PRODUCT + STARS */}
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0 flex-1 space-y-2">
                <div className="h-5 w-32 max-w-full animate-pulse rounded bg-gray-200" />
                <div className="h-4 w-40 max-w-full animate-pulse rounded bg-gray-100" />
              </div>

              <div className="flex shrink-0 gap-1">
                {Array.from({ length: 5 }).map((_, starIndex) => (
                  <div
                    key={starIndex}
                    className="size-3.5 animate-pulse rounded-sm bg-amber-100"
                  />
                ))}
              </div>
            </div>

            {/* REVIEW COMMENT */}
            <div className="space-y-2 py-1">
              <div className="h-3 w-full animate-pulse rounded bg-gray-100" />
              <div className="h-3 w-full animate-pulse rounded bg-gray-100" />
              <div className="h-3 w-3/4 animate-pulse rounded bg-gray-100" />
            </div>

            {/* EXISTING ADMIN REPLY PLACEHOLDER */}
            {i % 2 === 0 && (
              <div className="space-y-2 rounded-xl border border-slate-100 bg-slate-50 p-3">
                <div className="h-3 w-32 animate-pulse rounded bg-slate-200" />
                <div className="h-3 w-full animate-pulse rounded bg-slate-200" />
                <div className="h-3 w-2/3 animate-pulse rounded bg-slate-200" />
              </div>
            )}

            {/* ACTIONS */}
            <div className="flex flex-wrap items-center gap-4 border-t border-gray-100 pt-4">
              <div className="h-4 w-16 animate-pulse rounded bg-gray-200" />
              {i % 2 === 0 && (
                <div className="h-4 w-24 animate-pulse rounded bg-gray-200" />
              )}
              <div className="ml-auto h-4 w-24 animate-pulse rounded bg-gray-200" />
            </div>
          </div>
        ))}
      </div>

      {/* PAGINATION */}
      <div className="flex justify-center gap-3 pt-4">
        <div className="h-8 w-16 animate-pulse rounded-lg bg-gray-200" />
        <div className="h-8 w-24 animate-pulse rounded-lg bg-gray-100" />
        <div className="h-8 w-16 animate-pulse rounded-lg bg-gray-200" />
      </div>
    </div>
  );
}
