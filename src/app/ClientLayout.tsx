"use client";

import { MotionConfig, AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return (
    <MotionConfig transition={{ duration: 0.25, ease: "easeInOut" }}>
      <AnimatePresence mode="wait">
        <motion.div
          key={pathname}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </MotionConfig>
  );
}
