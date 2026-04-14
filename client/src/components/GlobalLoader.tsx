import { motion, AnimatePresence } from "framer-motion";
import { useLoading } from "../context/LoadingContext";

export default function GlobalLoader() {
  const { loading } = useLoading();

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-md pointer-events-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white px-6 py-5 rounded-xl shadow-lg flex flex-col items-center gap-3"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.8 }}
          >
            <div className="w-8 h-8 border-4 border-gray-300 border-t-black rounded-full animate-spin" />

            <p className="text-sm font-medium text-gray-700">Loading...</p>

            <div className="w-40 h-1 bg-gray-200 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-black"
                animate={{ width: ["0%", "100%"] }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                }}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
