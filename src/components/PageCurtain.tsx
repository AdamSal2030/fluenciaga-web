"use client";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

/**
 * PageCurtain — DNA brand version (cyan → emerald) and a bit slower.
 * - Uses gradient curtains that match your site accents.
 * - Honors prefers-reduced-motion.
 */
export default function PageCurtain() {
  const pathname = usePathname();
  const [key, setKey] = useState(pathname);
  const prefersReduced = usePrefersReducedMotion();

  useEffect(() => setKey(pathname), [pathname]);

  if (prefersReduced) return null;

  return (
    <AnimatePresence>
      <motion.div
        key={key + "-curtain"}
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        exit={{ opacity: 0 }}
        // slightly slower fade-out than before
        transition={{ delay: 0.9, duration: 0.35 }}
        className="pointer-events-none fixed inset-0 z-[9998]"
      >
        {/* Left curtain (gold → amber) */}
        <motion.div
          initial={{ x: "0%" }}
          animate={{ x: "-100%" }}
          exit={{ x: "-100%" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-y-0 left-0 w-1/2"
          style={{ background: "linear-gradient(135deg, #c9a84c, #e8c97a)" }}
        />

        {/* Right curtain (amber → gold) */}
        <motion.div
          initial={{ x: "0%" }}
          animate={{ x: "100%" }}
          exit={{ x: "100%" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-y-0 right-0 w-1/2"
          style={{ background: "linear-gradient(135deg, #e8c97a, #c9a84c)" }}
        />

        {/* Center logo punch */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 grid place-items-center"
        >
          {/* Put your file in /public/logo.png */}
          <img src="/logo.png" alt="DNA" className="h-16 w-auto drop-shadow-[0_6px_24px_rgba(0,0,0,0.35)]" />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

/** Small hook: match media for reduced motion */
function usePrefersReducedMotion() {
  const [prefers, setPrefers] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setPrefers(mq.matches);
    onChange();
    mq.addEventListener?.("change", onChange);
    return () => mq.removeEventListener?.("change", onChange);
  }, []);
  return prefers;
}
