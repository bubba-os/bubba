import { ScrollArea } from "@bubba/ui/scroll-area";
import { motion } from "framer-motion";
import { Activity, Clock, TrendingUp } from "lucide-react";

const icons = {
  Clock,
  Activity,
  TrendingUp,
};

export function StatItem({
  value,
  text,
  icon,
}: {
  value: string;
  text: string;
  icon: keyof typeof icons;
}) {
  const Icon = icons[icon];

  return (
    <motion.div
      className="flex flex-col items-center p-6 rounded-xl border bg-card shadow-sm h-[250px] sm:h-auto"
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <Icon className="h-12 w-12 text-primary mb-4 flex-shrink-0" />
      <h3 className="text-xl font-semibold mb-2">{value}</h3>
      <p className="text-center text-muted-foreground">{text}</p>
    </motion.div>
  );
}
