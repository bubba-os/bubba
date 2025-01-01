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

export function SectionMarket() {
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
        The Market
      </motion.h2>

      <div className="gap-8 max-w-6xl w-full mb-12 flex flex-col justify-center items-center">
        <motion.div
          className="space-y-6 p-6 rounded-xl  backdrop-blur-sm"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <ul className="space-y-4">
            <li className="flex items-start gap-2">
              <span className="text-4xl font-bold text-primary">$268B</span>
              <span className="text-lg">
                Global cybersecurity market size in 2024
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-4xl font-bold text-primary">$878.48B</span>
              <span className="text-lg">
                Projected cybersecurity market size in 2034
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-4xl font-bold text-primary">12.6%</span>
              <span className="text-lg">CAGR projected through 2034</span>
            </li>
          </ul>
        </motion.div>
      </div>

      <motion.p
        className="text-xl max-w-3xl text-center text-muted-foreground"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <div className="grid grid-cols-3 gap-4">
          <Card>
            <CardHeader>
              <CardTitle>
                <Link
                  href="https://www.pricelevel.com/vendors/vanta/pricing"
                  target="_blank"
                  className="hover:underline underline-offset-4"
                >
                  Vanta
                </Link>
              </CardTitle>
              <CardDescription className="flex items-center justify-center gap-2">
                <Image
                  src="https://www.pricelevel.com/images/vendor-logos/vanta.webp"
                  alt="Vanta"
                  width={50}
                  height={50}
                  className="rounded-full"
                />
              </CardDescription>
            </CardHeader>
            <CardContent>
              <span className="text-2xl font-bold text-primary">$10,000</span>
              <br /> median annual price reported by actual buyers.
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>
                <Link
                  href="https://www.pricelevel.com/vendors/drata/pricing"
                  target="_blank"
                  className="hover:underline underline-offset-4"
                >
                  Drata
                </Link>
              </CardTitle>
              <CardDescription className="flex items-center justify-center gap-2">
                <Image
                  src="https://www.pricelevel.com/images/vendor-logos/drata.webp"
                  alt="Drata"
                  width={50}
                  height={50}
                  className="rounded-full"
                />
              </CardDescription>
            </CardHeader>
            <CardContent>
              <span className="text-2xl font-bold text-primary">$15,000</span>
              <br /> median annual price reported by actual buyers.
            </CardContent>
          </Card>{" "}
          <Card>
            <CardHeader>
              <CardTitle>
                <Link
                  href="https://www.pricelevel.com/vendors/secureframe/pricing"
                  target="_blank"
                  className="hover:underline underline-offset-4"
                >
                  Secureframe
                </Link>
              </CardTitle>
              <CardDescription className="flex items-center justify-center gap-2">
                <Image
                  src="https://www.pricelevel.com/images/vendor-logos/secureframe.webp"
                  alt="Secureframe"
                  width={50}
                  height={50}
                  className="rounded-full"
                />
              </CardDescription>
            </CardHeader>
            <CardContent>
              <span className="text-2xl font-bold text-primary">$46,000</span>
              <br /> median annual price reported by actual buyers.
            </CardContent>
          </Card>
        </div>
      </motion.p>
    </div>
  );
}
