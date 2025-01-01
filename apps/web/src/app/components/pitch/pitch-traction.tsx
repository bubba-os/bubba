import { motion } from "framer-motion";
import Link from "next/link";

const businessModels = [
  {
    title: "Cloud Hosted SaaS",
    description: "Cloud Hosted Software as a Service (SaaS)",
  },
  {
    title: "Enterprise Features",
    description: "Additional features and support for customers",
  },
  {
    title: "Professional Services",
    description: "Optional compliance consulting and audits",
  },
  {
    title: "Marketplace",
    description:
      "Affiliate marketplace for partners to sell software, consulting, and compliance services.",
  },
];

export function SectionTraction() {
  return (
    <div className="relative min-h-screen flex flex-col justify-center items-center p-4 sm:p-8">
      <Link
        href="/"
        className="absolute right-4 sm:right-8 top-4 font-semibold font-mono hover:text-primary transition-colors"
      >
        Bubba AI
      </Link>

      <motion.h2
        className="text-3xl sm:text-5xl font-bold mb-4 sm:mb-6 bg-clip-text text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Business Model
      </motion.h2>

      <motion.p
        className="text-base sm:text-lg max-w-3xl md:text-center mb-4 sm:mb-8 leading-relaxed px-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        Bubba AI is a commercial open source company. We offer a cloud-hosted
        SaaS version, and an in-app marketplace which acts as an affiliate
        marketplace for our partners. Additionally, some features require an
        enterprise license.
      </motion.p>

      {/* Mobile View */}
      <div className="block lg:hidden w-full px-4 mb-4">
        <div className="space-y-4">
          {businessModels.map((model) => (
            <div key={model.title} className="flex flex-col">
              <h3 className="font-semibold text-base text-primary">
                {model.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {model.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Desktop View */}
      <motion.div
        className="hidden lg:block space-y-6 p-6 rounded-xl backdrop-blur-sm max-w-6xl w-full px-4"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <ul className="space-y-4">
          {businessModels.map((model) => (
            <li key={model.title} className="flex items-start gap-2">
              <span className="text-lg sm:text-xl">✅ {model.description}</span>
            </li>
          ))}
        </ul>
      </motion.div>
    </div>
  );
}
