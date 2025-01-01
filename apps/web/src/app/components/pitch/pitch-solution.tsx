"use client";

import { Button } from "@bubba/ui/button";
import { motion } from "framer-motion";
import { Brain, Code, Link, SquareSlash, Store, Workflow } from "lucide-react";
import NextLink from "next/link";
import { createElement, useState } from "react";
import { FeatureCard } from "./feature-card";
import { StatItem } from "./stat-item";

const features = [
  {
    title: "Open Source",
    description:
      "Platform designed to automate the most complex compliance frameworks.",
    icon: "Code" as const,
  },
  {
    title: "AI First",
    description:
      "Built with AI at the core, automating the largest pain points, and reducing the cost of compliance.",
    icon: "SquareSlash" as const,
  },
  {
    title: "Deep Integrations",
    description:
      "Seamlessly integrate with the leading HR, Cloud, and Device Management systems.",
    icon: "Link" as const,
  },
  {
    title: "Automated Evidence",
    description:
      "Automate the collection of required continuous evidence for compliance frameworks.",
    icon: "Workflow" as const,
  },
  {
    title: "Built-in Marketplace",
    description:
      "A marketplace of compliance software, training, and auditing services.",
    icon: "Store" as const,
  },
];

const icons = {
  Code,
  Link,
  Brain,
  Workflow,
  Store,
  SquareSlash,
};

export function SectionSolution() {
  return (
    <div className="relative min-h-screen flex flex-col justify-center items-center p-4 sm:p-8">
      <NextLink
        href="/"
        className="absolute right-4 sm:right-8 top-4 font-semibold font-mono hover:text-primary transition-colors"
      >
        Bubba AI
      </NextLink>

      <motion.h2
        className="text-3xl sm:text-5xl font-bold mb-6 sm:mb-8 bg-clip-text text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        The Solution
      </motion.h2>

      <motion.p
        className="text-base sm:text-lg max-w-3xl md:text-center mb-4 sm:mb-8 leading-relaxed px-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        Bubba AI, the first commercial open-source platform that automates
        achieving compliance with SOC 2, ISO 27001 and GDPR.
      </motion.p>

      {/* Mobile View */}
      <div className="block lg:hidden w-full px-4 mb-4">
        <div className="space-y-4">
          {features.map((feature) => (
            <div key={feature.title} className="flex gap-3 items-start">
              <div>
                <h3 className="font-semibold text-base">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Desktop View */}
      <motion.div
        className="hidden lg:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8 max-w-6xl w-full px-4"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        {features.map((feature) => (
          <FeatureCard
            key={feature.title}
            title={feature.title}
            description={feature.description}
            icon={feature.icon}
          />
        ))}
      </motion.div>
    </div>
  );
}
