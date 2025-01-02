import { Button } from "@bubba/ui/button";
import { motion } from "framer-motion";
import { Github, Linkedin, TwitterIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const team = [
  {
    name: "Lewis Carhart",
    role: "Founder",
    x: "https://x.com/lewisbuildsai",
    linkedin: "https://www.linkedin.com/in/lewis-carhart-4292b5325/",
    github: "https://github.com/carhartlewis",
    image: "https://avatars.githubusercontent.com/u/78215809?v=4",
  },
];

export function SectionTeam() {
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
        The Team
      </motion.h2>

      <motion.p
        className="text-base sm:text-lg max-w-3xl md:text-center mb-4 sm:mb-8 leading-relaxed px-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        We're technical at our core. We're a team of experienced compliance
        professionals and software engineers who are passionate about automating
        compliance.
      </motion.p>

      {/* Mobile View */}
      <div className="block lg:hidden w-full px-4 mb-4">
        <div className="space-y-6">
          {team.map((member) => (
            <div key={member.name} className="flex items-center gap-4">
              <Image
                src={member.image}
                alt={member.name}
                width={60}
                height={60}
                className="rounded-full"
              />
              <div>
                <h3 className="font-bold text-lg">{member.name}</h3>
                <p className="text-sm text-muted-foreground">{member.role}</p>
                <div className="flex items-center gap-2 mt-1">
                  <Link href={member.linkedin} target="_blank">
                    <Linkedin className="w-4 h-4 text-muted-foreground hover:text-primary transition-colors" />
                  </Link>
                  <Link href={member.github} target="_blank">
                    <Github className="w-4 h-4 text-muted-foreground hover:text-primary transition-colors" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Desktop View */}
      <div className="hidden lg:grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl w-full px-4">
        {team.map((member) => (
          <div
            key={member.name}
            className="flex flex-col items-center text-center"
          >
            <Image
              src={member.image}
              alt={member.name}
              width={80}
              height={80}
              className="rounded-full mb-4"
            />
            <h3 className="text-xl font-bold">{member.name}</h3>
            <p className="text-muted-foreground">{member.role}</p>
            <div className="flex items-center gap-2 mt-2">
              <Link href={member.x} target="_blank">
                <TwitterIcon className="w-4 h-4 text-muted-foreground hover:text-primary transition-colors" />
              </Link>
              <Link href={member.linkedin} target="_blank">
                <Linkedin className="w-4 h-4 text-muted-foreground hover:text-primary transition-colors" />
              </Link>
              <Link href={member.github} target="_blank">
                <Github className="w-4 h-4 text-muted-foreground hover:text-primary transition-colors" />
              </Link>
            </div>
          </div>
        ))}
      </div>

      <div className="w-full px-4 mt-8">
        <motion.p
          className="text-base sm:text-lg text-center mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          To invest, reach out to founders@bubba.ai.
        </motion.p>

        <div className="flex justify-center">
          <Button asChild>
            <Link href="/">Home</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
