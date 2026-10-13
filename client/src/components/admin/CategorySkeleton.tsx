import { Grid3X3, Plus } from "lucide-react";

export default function CategorySkeleton() {
  return (
    <div className="space-y-6">
      {/* HEADER SKELETON */}
      <div className="flex items-center justify-between rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="size-9 animate-pulse rounded-lg bg-[#B88E2F]/10 flex items-center justify-center">
            <Grid3X3 className="size-5 text-[#B88E2F]/30" />
          </div>

          <div className="h-6 w-32 animate-pulse rounded-md bg-gray-200" />
        </div>

        <div className="flex h-10 items-center gap-2 rounded-xl bg-gray-200 px-4 animate-pulse">
          <Plus size={18} className="text-gray-400" />
          <div className="h-3 w-24 rounded bg-gray-300" />
        </div>
      </div>

      {/* CATEGORY CARDS SKELETON */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm"
          >
            {/* IMAGE PLACEHOLDER */}
            <div className="h-32 animate-pulse bg-linear-to-r from-gray-100 via-gray-200 to-gray-100" />

            {/* CONTENT PLACEHOLDERS */}
            <div className="space-y-4 p-4">
              {/* Title */}
              <div className="h-5 w-2/3 animate-pulse rounded-md bg-gray-200" />

              {/* Description */}
              <div className="space-y-2">
                <div className="h-3 w-full animate-pulse rounded bg-gray-100" />
                <div className="h-3 w-4/5 animate-pulse rounded bg-gray-100" />
              </div>

              {/* ACTIONS */}
              <div className="flex justify-between border-t border-gray-100 pt-4">
                <div className="h-4 w-14 animate-pulse rounded bg-gray-200" />
                <div className="h-4 w-16 animate-pulse rounded bg-gray-200" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
