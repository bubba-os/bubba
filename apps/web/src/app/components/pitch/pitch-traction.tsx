import { motion } from "framer-motion";
import Link from "next/link";

export function SectionTraction() {
  return (
    <div className="relative min-h-screen flex flex-col justify-center items-center p-8">
      <Link
        href="/"
        className="absolute right-8 top-4 font-semibold font-mono hover:text-primary transition-colors"
      >
        Bubba AI
      </Link>

      <motion.h2
        className="text-5xl font-bold mb-8 bg-clip-text"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Business Model
      </motion.h2>
      <motion.p
        className="text-xl max-w-3xl text-center mb-12 leading-relaxed"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        Bubba AI is a commercial open source company. We offer a cloud-hosted
        SaaS version, and an in-app marketplace which acts as an affiliate
        marketplace for our partners. Additionally, some features require an
        enterprise license.
      </motion.p>
      <div className="gap-8 max-w-6xl w-full mb-12 flex flex-col justify-center items-center">
        <motion.div
          className="space-y-6 p-6 rounded-xl  backdrop-blur-sm"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <ul className="space-y-4">
            <li className="flex items-start gap-2">
              <span className="text-lg">
                ✅ Cloud Hosted Software as a Service (SaaS)
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-lg">
                ✅ Additional features and support for customers
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-lg">
                ✅ Optional compliance consulting and audits
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-lg">
                ✅ Affiliate marketplace for partners to sell software,
                consulting, and compliance services.
              </span>
            </li>
          </ul>
        </motion.div>
      </div>
    </div>
  );
}
