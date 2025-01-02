import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@bubba/ui/card";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const marketStats = [
  {
    value: "$268B",
    text: "Global cybersecurity market size in 2024",
  },
  {
    value: "$800B",
    text: "Projected cybersecurity market size in 2034",
  },
  {
    value: "12.6%",
    text: "CAGR projected through 2034",
  },
];

const competitors = [
  {
    name: "Vanta",
    price: "$10,000",
    logo: "https://www.pricelevel.com/images/vendor-logos/vanta.webp",
    link: "https://www.pricelevel.com/vendors/vanta/pricing",
  },
  {
    name: "Drata",
    price: "$15,000",
    logo: "https://www.pricelevel.com/images/vendor-logos/drata.webp",
    link: "https://www.pricelevel.com/vendors/drata/pricing",
  },
  {
    name: "Secureframe",
    price: "$46,000",
    logo: "https://www.pricelevel.com/images/vendor-logos/secureframe.webp",
    link: "https://www.pricelevel.com/vendors/secureframe/pricing",
  },
];

export function SectionMarket() {
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
        The Market
      </motion.h2>

      {/* Mobile View - Market Stats */}
      <div className="block lg:hidden w-full px-4 mb-6">
        <div className="space-y-3">
          {marketStats.map((stat) => (
            <div key={stat.value} className="flex items-baseline gap-2">
              <span className="text-xl font-bold text-primary">
                {stat.value}
              </span>
              <span className="text-sm">{stat.text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Desktop View - Market Stats */}
      <div className="hidden lg:block gap-8 max-w-6xl w-full mb-8">
        <motion.div
          className="space-y-6 p-6 rounded-xl backdrop-blur-sm"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <ul className="space-y-4">
            {marketStats.map((stat) => (
              <li key={stat.value} className="flex items-start gap-2">
                <span className="text-2xl sm:text-4xl font-bold text-primary">
                  {stat.value}
                </span>
                <span className="text-base sm:text-lg">{stat.text}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>

      {/* Mobile View - Competitors */}
      <div className="block lg:hidden w-full px-4">
        <div className="space-y-4">
          {competitors.map((competitor) => (
            <div key={competitor.name} className="flex items-center gap-3">
              <Image
                src={competitor.logo}
                alt={competitor.name}
                width={32}
                height={32}
                className="rounded-full"
              />
              <div>
                <Link
                  href={competitor.link}
                  target="_blank"
                  className="font-semibold hover:text-primary"
                >
                  {competitor.name}
                </Link>
                <div className="text-sm">
                  <span className="text-primary font-semibold">
                    {competitor.price}
                  </span>{" "}
                  <span className="text-muted-foreground">
                    median annual spend per customer
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Desktop View - Competitors */}
      <motion.div
        className="hidden lg:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-4 max-w-6xl w-full px-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        {competitors.map((competitor) => (
          <Card key={competitor.name}>
            <CardHeader>
              <CardTitle>
                <Link
                  href={competitor.link}
                  target="_blank"
                  className="hover:underline underline-offset-4"
                >
                  {competitor.name}
                </Link>
              </CardTitle>
              <CardDescription className="flex items-center justify-center gap-2">
                <Image
                  src={competitor.logo}
                  alt={competitor.name}
                  width={50}
                  height={50}
                  className="rounded-full"
                />
              </CardDescription>
            </CardHeader>
            <CardContent>
              <span className="text-xl sm:text-2xl font-bold text-primary">
                {competitor.price}
              </span>
              <br />
              <span className="text-sm sm:text-base">
                median annual price reported by actual buyers.
              </span>
            </CardContent>
          </Card>
        ))}
      </motion.div>
    </div>
  );
}
