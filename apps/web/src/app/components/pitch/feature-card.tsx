import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@bubba/ui/card";
import { motion } from "framer-motion";
import { Brain, Code, Link, SquareSlash, Store, Workflow } from "lucide-react";

const icons = {
  Code,
  Link,
  Brain,
  Workflow,
  Store,
  SquareSlash,
};

export function FeatureCard({
  title,
  description,
  icon,
}: {
  title: string;
  description: string;
  icon: keyof typeof icons;
}) {
  const Icon = icons[icon];

  return (
    <motion.div
      className="flex flex-col items-center"
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <Card>
        <CardHeader>
          <Icon className="h-6 w-6 sm:h-8 sm:w-8 text-primary mb-3 sm:mb-4 flex-shrink-0" />
          <CardTitle className="text-lg sm:text-xl">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm sm:text-base text-muted-foreground">
            {description}
          </p>
        </CardContent>
      </Card>
    </motion.div>
  );
}
