"use client";

import { Button } from "@bubba/ui/button";
import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { FeatureCard } from "./feature-card";
import { StatItem } from "./stat-item";

export function SectionSolution() {
  const [activeTab, setActiveTab] = useState("features");

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
        The Solution
      </motion.h2>

      <motion.p
        className="text-2xl max-w-3xl text-center mb-12 leading-relaxed"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        Bubba AI, the first commercial open-source platform that automates
        achieving compliance with SOC 2, ISO 27001 and GDPR.
      </motion.p>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <>
          <FeatureCard
            title="Open Source"
            description="Platform designed to automate the most complex compliance frameworks."
            icon="Code"
          />
          <FeatureCard
            title="AI First"
            description="Built with AI at the core, automating the largest pain points, and reducing the cost of compliance."
            icon="SquareSlash"
          />
          <FeatureCard
            title="Deep Integrations"
            description="Seamlessly integrate with the leading HR, Cloud, and Device Management systems."
            icon="Link"
          />
          <FeatureCard
            title="Automated Evidence"
            description="Automate the collection of required continuous evidence for compliance frameworks."
            icon="Workflow"
          />{" "}
          <FeatureCard
            title="Built-in Marketplace"
            description="A marketplace of compliance software, training, and auditing services."
            icon="Store"
          />
        </>
      </motion.div>
    </div>
  );
}
