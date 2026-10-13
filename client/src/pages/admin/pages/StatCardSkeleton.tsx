const StatCardSkeleton = () => {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        {/* Title skeleton */}
        <div className="h-4 w-28 animate-pulse rounded bg-gray-200" />

        {/* Icon skeleton */}
        <div className="h-10 w-10 animate-pulse rounded-lg bg-gray-200" />
      </div>

      {/* Value skeleton */}
      <div className="mt-5 h-8 w-20 animate-pulse rounded bg-gray-200" />

      {/* Bottom text skeleton */}
      <div className="mt-3 h-3 w-32 animate-pulse rounded bg-gray-100" />
    </div>
  );
};

export default StatCardSkeleton;
