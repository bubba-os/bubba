import { motion } from "framer-motion";
import Link from "next/link";

export function SectionProblem() {
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
        The Problem
      </motion.h2>

      <motion.p
        className="text-2xl max-w-3xl text-center mb-12 leading-relaxed"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        AI has changed how startups launch and develop B2B software, but 65% of
        companies report increasing demands to be compliant with compliance
        frameworks.
      </motion.p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl">
        <div className="p-6 rounded-none border bg-card shadow-sm">
          <h3 className="text-xl font-semibold mb-4">Security Risks</h3>
          <div className="space-y-4">
            <StatItem
              value="55%"
              text="of organizations say security risks are at an all-time high"
            />
            <StatItem
              value="53%"
              text="of companies cite cybersecurity threats as their top concern"
            />
            <StatItem
              value="65%"
              text="of organizations report increasing customer demands for compliance proof"
            />
          </div>
        </div>

        <div className="p-6 rounded-none border bg-card shadow-sm">
          <h3 className="text-xl font-semibold mb-4">Compliance Burden</h3>
          <div className="space-y-4">
            <StatItem
              value="11"
              text="working weeks per year spent on compliance tasks"
            />
            <StatItem
              value="6.5"
              text="hours per week spent assessing vendor risk"
            />
            <StatItem
              value="5"
              text="working weeks per year saved with automation"
            />
          </div>
        </div>
      </div>

      <p className="text-xs text-muted-foreground mt-12">
        Source:{" "}
        <a
          href="https://info.vanta.com/hubfs/2024%20State%20of%20Trust%20Report.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-primary transition-colors"
        >
          State of Trust Report 2024
        </a>
      </p>
    </div>
  );
}

function StatItem({ value, text }: { value: string; text: string }) {
  return (
    <div className="flex flex-col">
      <span className="text-3xl font-bold text-primary font-mono">{value}</span>
      <span className="text-sm text-muted-foreground">{text}</span>
    </div>
  );
}
