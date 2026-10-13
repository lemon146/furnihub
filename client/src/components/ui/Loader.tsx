const Loader = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#FCF8F3]/90 backdrop-blur-md">
      <div
        role="status"
        aria-label="Verifying access"
        className="flex flex-col items-center gap-6"
      >
        {/* Animated logo ring */}
        <div className="relative flex size-24 items-center justify-center">
          {/* Outer ring */}
          <div className="absolute inset-0 rounded-full border-2 border-[#B88E2F]/15" />

          {/* Spinning gold ring */}
          <div className="absolute inset-0 animate-spin rounded-full border-2 border-transparent border-t-[#B88E2F] border-r-[#B88E2F]/40" />

          {/* Inner ring */}
          <div className="absolute inset-3 rounded-full border border-[#B88E2F]/25" />

          {/* Furniture icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className="size-9 text-[#B88E2F]"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 11V8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v3M3 12h18v5H3zM5 17v3m14-3v3M7 12V9h10v3"
            />
          </svg>
        </div>

        {/* Brand and status */}
        <div className="space-y-2 text-center">
          <h2 className="text-xl font-semibold tracking-[0.2em] text-[#3A3025]">
            FURNIRO
          </h2>

          <p className="text-sm text-[#7B7062]">Preparing your workspace</p>
        </div>

        {/* Animated loading dots */}
        <div className="flex items-center gap-2">
          <span className="size-1.5 animate-bounce rounded-full bg-[#B88E2F] [animation-delay:-0.3s]" />
          <span className="size-1.5 animate-bounce rounded-full bg-[#B88E2F] [animation-delay:-0.15s]" />
          <span className="size-1.5 animate-bounce rounded-full bg-[#B88E2F]" />
        </div>

        <span className="sr-only">Checking your permissions...</span>
      </div>
    </div>
  );
};

export default Loader;
