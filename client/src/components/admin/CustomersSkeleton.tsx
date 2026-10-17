function CustomersSkeleton() {
  return (
    <div
      role="status"
      aria-busy="true"
      className="p-4 sm:p-6 space-y-6 animate-pulse"
    >
      <span className="sr-only">Loading customers...</span>

      {/* header */}
      <div className="flex flex-col sm:flex-row justify-between gap-3">
        <div className="h-8 w-48 rounded bg-gray-200" />
        <div className="h-10 w-full sm:w-72 rounded-lg bg-gray-200" />
      </div>

      {/* desktop table */}
      <div className="hidden md:block bg-white rounded-xl shadow overflow-hidden">
        <div className="h-11 bg-gray-100" />
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="flex items-center gap-6 border-t p-3">
            <div className="h-4 w-1/4 rounded bg-gray-200" />
            <div className="h-4 w-1/3 rounded bg-gray-200" />
            <div className="h-4 w-12 rounded bg-gray-200" />
            <div className="ml-auto flex gap-2">
              <div className="h-7 w-7 rounded bg-gray-200" />
              <div className="h-7 w-7 rounded bg-gray-200" />
            </div>
          </div>
        ))}
      </div>

      {/* mobile cards */}
      <div className="grid gap-4 md:hidden">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="bg-white shadow rounded-xl p-4 space-y-3">
            <div className="h-4 w-1/2 rounded bg-gray-200" />
            <div className="h-3 w-2/3 rounded bg-gray-200" />
            <div className="h-3 w-1/4 rounded bg-gray-200" />
            <div className="h-9 w-full rounded bg-gray-200" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default CustomersSkeleton;
