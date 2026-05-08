"use client";

import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import Link from "next/link";

export default function ChatIcon() {
  return (
    <motion.div
      className="fixed bottom-8 right-8 cursor-pointer rounded-full p-3 bg-purple-600 text-white shadow-lg z-50"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      <Link
        href="/#contact"
        passHref
      >
        <MessageCircle className="h-6 w-6" />
      </Link>
    </motion.div>
  );
}
