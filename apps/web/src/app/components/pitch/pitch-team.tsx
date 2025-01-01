import { Button } from "@bubba/ui/button";
import { motion } from "framer-motion";
import { Github, Linkedin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function SectionTeam() {
  const team = [
    {
      name: "Lewis Carhart",
      role: "Founder",
      linkedin: "https://www.linkedin.com/in/lewis-carhart-4292b5325/",
      github: "https://github.com/carhartlewis",
      image: "https://avatars.githubusercontent.com/u/78215809?v=4",
    },
  ];

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
        The Team
      </motion.h2>
      <motion.p
        className="text-2xl max-w-3xl text-center mb-12 leading-relaxed"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        We're technical at our core. We're a team of experienced compliance
        professionals and software engineers who are passionate about automating
        compliance.
      </motion.p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl">
        {team.map((member) => (
          <div key={member.name}>
            <Image
              src={member.image}
              alt={member.name}
              width={50}
              height={50}
              className="rounded-full"
            />
            <h3 className="text-xl font-bold">{member.name}</h3>
            <p className="text-muted-foreground">{member.role}</p>
            <div className="flex items-center gap-2">
              <Link href={member.linkedin} target="_blank">
                <Linkedin className="w-4 h-4" />
              </Link>
              <Link href={member.github} target="_blank">
                <Github className="w-4 h-4" />
              </Link>
            </div>
          </div>
        ))}
      </div>
      <motion.h2
        className="mt-8 text-xl font-medium mb-8 bg-clip-text"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        To invest in our early friends pre-seed round, email founders@bubba.ai.
      </motion.h2>{" "}
      <motion.h2
        className="mt-8 text-xl font-medium mb-8 bg-clip-text"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Button asChild>
          <Link href="/">Home</Link>
        </Button>
      </motion.h2>
    </div>
  );
}
