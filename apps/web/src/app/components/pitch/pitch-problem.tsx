import { motion } from "framer-motion";
import Link from "next/link";

export function SectionProblem() {
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
        The Problem
      </motion.h2>

      <motion.p
        className="text-base sm:text-lg max-w-3xl md:text-center mb-4 sm:mb-8 leading-relaxed px-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        AI has changed how startups launch and develop B2B software, but 65% of
        companies report increasing demands to be compliant with compliance
        frameworks.
      </motion.p>

      {/* Mobile View */}
      <div className="block lg:hidden w-full px-4 mb-4">
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-2 text-primary">
              Security Risks
            </h3>
            <ul className="space-y-2 list-disc pl-4">
              <BulletPoint
                value="55%"
                text="of organizations say security risks are at an all-time high"
              />
              <BulletPoint
                value="53%"
                text="of companies cite cybersecurity threats as their top concern"
              />
              <BulletPoint
                value="65%"
                text="of organizations report increasing customer demands for compliance proof"
              />
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2 text-primary">
              Compliance Burden
            </h3>
            <ul className="space-y-2 list-disc pl-4">
              <BulletPoint
                value="11"
                text="working weeks per year spent on compliance tasks"
              />
              <BulletPoint
                value="6.5"
                text="hours per week spent assessing vendor risk"
              />
              <BulletPoint
                value="5"
                text="working weeks per year saved with automation"
              />
            </ul>
          </div>
        </div>
      </div>

      {/* Desktop View */}
      <div className="hidden lg:grid grid-cols-2 gap-4 max-w-6xl w-full px-4 mb-4 sm:mb-8">
        <div className="p-3 sm:p-6 rounded-none border bg-card shadow-sm">
          <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">
            Security Risks
          </h3>
          <div className="space-y-3 sm:space-y-4">
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

        <div className="p-3 sm:p-6 rounded-none border bg-card shadow-sm">
          <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">
            Compliance Burden
          </h3>
          <div className="space-y-3 sm:space-y-4">
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

      <p className="text-xs text-muted-foreground mt-2 sm:mt-4 text-center px-4">
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
      <span className="text-xl sm:text-2xl font-bold text-primary font-mono">
        {value}
      </span>
      <span className="text-xs sm:text-sm text-muted-foreground">{text}</span>
    </div>
  );
}

function BulletPoint({ value, text }: { value: string; text: string }) {
  return (
    <li className="text-sm">
      <span className="font-semibold text-primary">{value}</span> {text}
    </li>
  );
}
