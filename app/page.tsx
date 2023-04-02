"use client";
import { InputPanel } from "@/components/InputPanel";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <motion.main
      className="xl:max-w-5xl xl:mx-auto"
      animate={{ opacity: 1, scale: 1 }}
      initial={{ opacity: 0, scale: 0.8 }}
      transition={{ ease: "easeOut" }}
    >
      <InputPanel />
    </motion.main>
  );
}
