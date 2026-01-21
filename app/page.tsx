"use client";

import { motion } from "framer-motion";
import {
  Code,
  Cog,
  DraftingCompass,
  LayoutDashboard,
  Search,
  Server,
  Zap,
} from "lucide-react";
import Image from "next/image";
import { FaEnvelope, FaGithub } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import {
  SiFirebase,
  SiGit,
  SiGithub,
  SiNextdotjs,
  SiSupabase,
  SiTailwindcss,
  SiTurborepo,
  SiTypescript,
} from "react-icons/si";
import { Project } from "@/components/main/project";
import { LinkButton } from "@/components/ui/link-button";
import { cn } from "@/lib/utils";

const socials = [
  {
    name: "GitHub",
    icon: FaGithub,
    href: "https://github.com/ThunderboltDev",
  },
  {
    name: "Twitter",
    icon: FaXTwitter,
    href: "https://x.com/Thunderbolt3141",
  },
  {
    name: "Email",
    icon: FaEnvelope,
    href: "mailto:thunderbolt3141592@gmail.com",
  },
];

const skills = [
  {
    name: "Frontend",
    icon: Code,
    skills: [
      {
        name: "Next.js",
        icon: SiNextdotjs,
      },
      {
        name: "TypeScript",
        icon: SiTypescript,
      },
      {
        name: "Tailwind",
        icon: SiTailwindcss,
      },
    ],
  },
  {
    name: "Backend",
    icon: Server,
    skills: [
      {
        name: "Supabase",
        icon: SiSupabase,
      },
      {
        name: "Firebase",
        icon: SiFirebase,
      },
      {
        name: "Convex",
        icon: "/convex.svg",
      },
    ],
  },
  {
    name: "DevOps",
    icon: Cog,
    skills: [
      {
        name: "Git",
        icon: SiGit,
      },
      {
        name: "GitHub Actions",
        icon: SiGithub,
      },
      {
        name: "Turborepo",
        icon: SiTurborepo,
      },
    ],
  },
  {
    name: "Optimization",
    icon: DraftingCompass,
    skills: [
      {
        name: "Responsive Design",
        icon: LayoutDashboard,
      },
      {
        name: "Performance",
        icon: Zap,
      },
      {
        name: "SEO",
        icon: Search,
      },
    ],
  },
];

const getBarHeight = (
  index: number,
  count: number,
  exponentBase: number,
  maxHeight: number
) => {
  const center = (count - 1) / 2;
  const minHeight = 10;

  const distance = Math.abs(index - center);
  const norm = distance / center;
  const factor = exponentBase ** norm - 1;
  const maxFactor = exponentBase - 1;
  const normalized = factor / maxFactor;

  return minHeight + normalized * (maxHeight - minHeight);
};

const getCenterDelay = (index: number, count: number) => {
  const center = (count - 1) / 2;
  const distance = Math.abs(index - center);
  const baseDelay = 0.2;

  return distance * baseDelay;
};

const getDuration = (index: number, count: number) => {
  const center = (count - 1) / 2;
  const distance = Math.abs(index - center);
  const baseDuration = 0.1;

  return distance * baseDuration;
};

const AnimatedBars = ({
  count,
  maxHeight,
  className = "",
  barClassName = "",
}: {
  count: number;
  maxHeight: number;
  className?: string;
  barClassName?: string;
}) => (
  <div className={cn("absolute -z-1 top-[100vh] w-full flex-row", className)}>
    {Array(count)
      .fill(0)
      .map((_, index) => (
        <motion.div
          key={crypto.randomUUID()}
          className={cn("bar relative w-[10vw]", barClassName)}
          initial={{ height: 0 }}
          animate={{ height: getBarHeight(index, count, 10, maxHeight) }}
          transition={{
            duration: getDuration(index, count),
            delay: getCenterDelay(index, count),
            ease: "easeIn",
          }}
        />
      ))}
  </div>
);

export default function Home() {
  return (
    <main className="relative">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="absolute -z-1 top-0 left-1/2 -translate-y-1/2 -translate-x-1/2 size-[min(60vw,28rem)] bg-radial from-accent/15 to-transparent blur-3xl rounded-full"
      />
      <AnimatedBars
        count={10}
        maxHeight={300}
        className="flex md:hidden left-0"
        barClassName="-translate-y-full origin-bottom"
      />
      <AnimatedBars
        count={10}
        maxHeight={100}
        className="flex md:hidden right-0"
        barClassName="bg-linear-to-b -translate-y-px"
      />
      <AnimatedBars
        count={16}
        maxHeight={400}
        className="hidden md:flex left-0"
        barClassName="-translate-y-full origin-bottom"
      />
      <AnimatedBars
        count={16}
        maxHeight={150}
        className="hidden md:flex right-0"
        barClassName="bg-linear-to-b -translate-y-pxs"
      />
      <motion.section
        className="pt-20 sm:pt-32 h-screen"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.h1
          className="mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <span>Hi, I am </span>
          <span className="text-accent">Thunderbolt</span>
        </motion.h1>

        <motion.p
          className="text-center text-lg mb-6 md:text-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          I am a self taught developer who loves building useful and beautiful
          websites that help solve real world problems.
        </motion.p>

        <motion.div
          className="mb-16 flex flex-wrap items-center justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
        >
          <LinkButton
            href="#projects"
            variant="accent"
            data-umami-event="hero_button_clicked"
            disableAnimation={false}
          >
            View My Work
          </LinkButton>
          <LinkButton
            href="mailto:thunderbolt3141592@gmail.com"
            variant="outline"
            data-umami-event="hero_contact_button_clicked"
            disableAnimation={false}
          >
            Get In Touch
          </LinkButton>
        </motion.div>

        <motion.div
          className="flex items-center justify-center gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.8 }}
        >
          {socials.map((social, index) => (
            <motion.a
              key={social.name}
              href={social.href}
              className="group relative flex h-12 w-12 items-center justify-center rounded-full border border-border bg-secondary/30 backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:border-accent hover:bg-accent/10"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1 + index * 0.1, duration: 0.3 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              aria-label={social.name}
            >
              <span className="text-sm font-semibold text-muted-foreground transition-colors group-hover:text-accent">
                <social.icon className="size-5" />
              </span>
              <span className="sr-only">{social.name}</span>
            </motion.a>
          ))}
        </motion.div>
      </motion.section>

      <section className="pt-24 max-w-3xl mx-auto">
        <h2>Skills & Technologies</h2>
        <p className="text-center mt-2">
          These are the technologies and frameworks that I use to bring ideas to
          life.
        </p>
        <div className="mt-16 grid gap-6 sm:grid-cols-2">
          {skills.map((item, index) => (
            <motion.div
              key={item.name}
              className="card group relative hover:border-accent/25 hover:bg-muted/25 hover:shadow-accent/5"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.25 }}
              whileHover={{ y: -4 }}
            >
              <div className="absolute -top-px left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent to-transparent opacity-0 transition-opacity duration-250 ease-out group-hover:opacity-100" />
              <div className="absolute -top-px left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent to-transparent opacity-0 transition-opacity duration-250 ease-out group-hover:opacity-100 blur-xs" />

              <div className="absolute top-0 bottom-0 -right-px w-px bg-gradient-to-b from-transparent via-accent to-transparent opacity-0 transition-opacity duration-250 ease-out group-hover:opacity-100" />
              <div className="absolute top-0 bottom-0 -right-px w-px bg-gradient-to-b from-transparent via-accent to-transparent opacity-0 transition-opacity duration-250 ease-out group-hover:opacity-100 blur-xs" />

              <div className="absolute -bottom-px left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent to-transparent opacity-0 transition-opacity duration-250 ease-out group-hover:opacity-100" />
              <div className="absolute -bottom-px left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent to-transparent opacity-0 transition-opacity duration-250 ease-out group-hover:opacity-100 blur-xs" />

              <div className="absolute top-0 bottom-0 -left-px w-px bg-gradient-to-b from-transparent via-accent to-transparent opacity-0 transition-opacity duration-250 ease-out group-hover:opacity-100" />
              <div className="absolute top-0 bottom-0 -left-px w-px bg-gradient-to-b from-transparent via-accent to-transparent opacity-0 transition-opacity duration-250 ease-out group-hover:opacity-100 blur-xs" />

              <div className="flex items-center gap-3">
                <item.icon className="size-10 text-accent bg-accent/5 group-hover:bg-accent/10 p-2 rounded-sm transition-colors duration-250 ease-out" />
                <h4>{item.name}</h4>
              </div>
              <div className="mt-6 space-y-3">
                {item.skills.map((skill, skillIndex) => (
                  <motion.div
                    key={skill.name}
                    className="flex items-center gap-3 rounded-md bg-background px-3 py-2 transition-colors duration-250 ease-out"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 + skillIndex * 0.05 }}
                  >
                    {typeof skill.icon === "string" ? (
                      <Image
                        width={20}
                        height={20}
                        src={skill.icon}
                        alt={skill.name}
                        className="size-5 pointer-events-none select-none"
                      />
                    ) : (
                      <skill.icon className="size-5 text-muted-foreground" />
                    )}
                    <span className="text-sm font-medium text-muted-foreground">
                      {skill.name}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section>
        <h2 id="projects">My Projects</h2>
        <div className="mt-12 flex gap-8 flex-col md:flex-row">
          <Project
            title="ApexTools"
            description="Discover the best AI tools for productivity, coding, marketing, writing, and more."
            tags={["Next.js", "TypeScript", "Supabase", "tRPC"]}
            projectUrl="https://www.apextools.site?utm_source=portfolio&utm_medium=project&utm_campaign=apextools"
            imageUrl="/projects/apextools.webp"
          />
          <Project
            title="Resound"
            description="Resound is an support platform for websites that combines website widget, real time conversations and team tools powered by AI."
            tags={["Next.js", "TypeScript", "Convex", "Turborepo"]}
            projectUrl="https://resound.thunderboltdev.site?utm_source=portfolio&utm_medium=project&utm_campaign=resound"
            imageUrl="/projects/resound.webp"
          />
          <Project
            title="PDFPal"
            description="An AI powered web platform that helps you analyze and understand your PDFs instantly. Chat, summarize and get valuable insights effortlessly!"
            tags={["Next.js", "TypeScript", "Supabase", "tRPC"]}
            projectUrl="https://pdfpal.thunderboltdev.site?utm_source=portfolio&utm_medium=project&utm_campaign=pdfpal"
            imageUrl="/projects/pdfpal.webp"
          />
        </div>
      </section>
    </main>
  );
}
