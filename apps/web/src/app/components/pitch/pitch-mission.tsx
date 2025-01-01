import { motion } from "framer-motion";
import Link from "next/link";

export function SectionMission() {
  return (
    <div className="relative min-h-screen flex flex-col justify-center items-center p-8">
      <Link
        href="/"
        className="absolute right-8 top-4 font-semibold font-mono hover:text-primary transition-colors"
      >
        Bubba AI
      </Link>

      <motion.h2
        className="text-5xl font-bold mb-8 bg-clip-text "
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        The Mission
      </motion.h2>

      <motion.p
        className="text-2xl max-w-3xl text-center mb-12 leading-relaxed"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        Get 1,000,000 companies SOC 2, ISO 27001, and GDPR compliant by 2030 by
        building the first open source compliance automation platform.
      </motion.p>
    </div>
  );
}
