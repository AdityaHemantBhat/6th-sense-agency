import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const words = [
  "AWAKENING INTUITION",
  "CALIBRATING PRECISION",
  "MAXIMIZING IMPACT",
  "INITIALIZING 6TH SENSE",
];

export default function Loader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [wordIndex, setWordIndex] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += Math.floor(Math.random() * 8) + 2;
      if (currentProgress >= 100) {
        currentProgress = 100;
        clearInterval(interval);
        setTimeout(() => {
          setIsExiting(true);
          setTimeout(() => {
            onComplete();
          }, 1200);
        }, 600);
      }
      setProgress(currentProgress);
    }, 80);

    const wordInterval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % words.length);
    }, 600);

    return () => {
      clearInterval(interval);
      clearInterval(wordInterval);
    };
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[100000] flex items-center justify-center pointer-events-none bg-[#080808]"
      initial={{ opacity: 1 }}
      animate={{ opacity: isExiting ? 0 : 1 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      {/* Background Columns - Restored original feel */}
      <div className="absolute inset-0 flex w-full h-full overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="w-1/5 h-full bg-[#080808] border-r border-[#F5F0E8]/5 last:border-r-0"
            initial={{ scaleY: 0, originY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{
              duration: 0.8,
              ease: [0.76, 0, 0.24, 1],
              delay: i * 0.08,
            }}
          />
        ))}
      </div>

      {/* Content Container */}
      <motion.div
        className="relative z-10 flex flex-col items-center justify-center w-full px-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
      >
        {/* Changing Text */}
        <div className="overflow-hidden mb-12 h-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={wordIndex}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="text-[#C8F04D] text-xs md:text-sm font-mono tracking-widest uppercase"
            >
              {words[wordIndex]}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Main Counter & Outline Text */}
        <div className="relative flex items-center justify-center w-full max-w-5xl">
          <motion.h1
            className="text-[13vw] font-display text-transparent leading-none absolute whitespace-pre text-center"
            style={{ WebkitTextStroke: "1px rgba(245, 240, 232, 0.15)" }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            6TH SENSE
            {"\n"}
            AGENCY
          </motion.h1>
          <motion.div
            className="text-[#F5F0E8] text-[8vw] md:text-[6vw] font-display leading-none z-10 mix-blend-difference"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
          >
            {progress}%
          </motion.div>
        </div>

        {/* Improved Progress Bar - Fixed the "line glitch" */}
        <div className="mt-20 relative">
          <motion.div
            className="w-64 md:w-96 h-[1px] bg-[#F5F0E8]/10 relative overflow-hidden"
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
          >
            <motion.div
              className="absolute top-0 left-0 h-full bg-[#C8F04D]"
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.1 }}
            />
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}
