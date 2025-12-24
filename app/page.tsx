"use client";

import { motion } from "framer-motion";
import {
  Code,
  Cog,
  DraftingCompass,
  LayoutDashboard,
  LayoutList,
  Server,
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
import { ButtonLink } from "@/components/ui/button-link";

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
    name: "Tools",
    icon: Cog,
    skills: [
      {
        name: "Git",
        icon: SiGit,
      },
      {
        name: "GitHub",
        icon: SiGithub,
      },
      {
        name: "Turborepo",
        icon: SiTurborepo,
      },
    ],
  },
  {
    name: "Design",
    icon: DraftingCompass,
    skills: [
      {
        name: "Responsive Design",
        icon: LayoutDashboard,
      },
      {
        name: "UI/UX",
        icon: LayoutList,
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

export default function Home() {
  return (
    <main className="relative">
      <div className="md:hidden absolute -z-1 top-[100vh] left-0 w-full flex flex-row">
        {Array(10)
          .fill(0)
          .map((_, index) => (
            <motion.div
              key={crypto.randomUUID()}
              className="bar relative w-[10vw] -translate-y-full origin-bottom"
              initial={{ height: 0 }}
              animate={{ height: getBarHeight(index, 10, 10, 300) }}
              transition={{
                duration: getDuration(index, 10),
                delay: getCenterDelay(index, 10),
                ease: "easeIn",
              }}
            />
          ))}
      </div>
      <div className="md:hidden absolute -z-1 top-[100vh] right-0 w-full flex flex-row">
        {Array(10)
          .fill(0)
          .map((_, index) => (
            <motion.div
              key={crypto.randomUUID()}
              className="bar relative w-[10vw] bg-linear-to-b -translate-y-[1px]"
              initial={{ height: 0 }}
              animate={{ height: getBarHeight(index, 10, 10, 100) }}
              transition={{
                duration: getDuration(index, 10),
                delay: getCenterDelay(index, 10),
                ease: "easeIn",
              }}
            />
          ))}
      </div>
      <div className="hidden md:flex absolute -z-1 top-[100vh] left-0 w-full flex-row">
        {Array(16)
          .fill(0)
          .map((_, index) => (
            <motion.div
              key={crypto.randomUUID()}
              className="bar relative w-[10vw] -translate-y-full origin-bottom"
              initial={{ height: 0 }}
              animate={{ height: getBarHeight(index, 16, 10, 400) }}
              transition={{
                duration: getDuration(index, 16),
                delay: getCenterDelay(index, 16),
                ease: "easeIn",
              }}
            />
          ))}
      </div>
      <div className="hidden md:flex absolute -z-1 top-[100vh] right-0 w-full flex-row">
        {Array(16)
          .fill(0)
          .map((_, index) => (
            <motion.div
              key={crypto.randomUUID()}
              className="bar relative w-[10vw] bg-linear-to-b -translate-y-[1px]"
              initial={{ height: 0 }}
              animate={{ height: getBarHeight(index, 16, 10, 150) }}
              transition={{
                duration: getDuration(index, 16),
                delay: getCenterDelay(index, 16),
                ease: "easeIn",
              }}
            />
          ))}
      </div>
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
          <ButtonLink
            href="#projects"
            variant="accent"
            data-umami-event="hero_button_clicked"
          >
            View My Work
          </ButtonLink>
          <ButtonLink
            href="mailto:thunderbolt3141592@gmail.com"
            variant="outline"
            data-umami-event="hero_contact_button_clicked"
          >
            Get In Touch
          </ButtonLink>
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
            >
              <span className="text-sm font-semibold text-muted-foreground transition-colors group-hover:text-accent">
                <social.icon className="size-5" />
              </span>
            </motion.a>
          ))}
        </motion.div>
      </motion.section>

      <section className="pt-24 max-w-3xl mx-auto">
        <h2>Skills & Technologies</h2>
        <div className="mt-16 grid gap-6 sm:grid-cols-2">
          {skills.map((item, index) => (
            <motion.div
              key={item.name}
              className="card bg-linear-to-r from-secondary/25 to-secondary/25 hover:to-accent/25"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <div className="flex items-center gap-3">
                <item.icon className="size-10 text-accent bg-accent/10 p-2 rounded-sm" />
                <h4>{item.name}</h4>
              </div>
              <div className="mt-6 flex flex-row flex-wrap gap-8">
                {item.skills.map((skill) => (
                  <div key={skill.name} className="flex items-center gap-2">
                    {typeof skill.icon === "string" ? (
                      <Image
                        src={skill.icon}
                        width={24}
                        height={24}
                        alt={skill.name}
                        className="size-6 brightness-75 pointer-events-none select-none"
                      />
                    ) : (
                      <skill.icon className="size-6 brightness-75" />
                    )}
                    <span className="text-base brightness-75">
                      {skill.name}
                    </span>
                  </div>
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
            title="Resound"
            description="Resound is an support platform for websites that combines website widget, real time conversations and team tools powered by AI."
            tags={["Next.js", "TypeScript", "Convex", "Turborepo"]}
            projectUrl="https://resound.thunderboltdev.site?utm_source=portfolio&utm_medium=project&utm_campaign=resound"
            imageUrl="/projects/resound.webp"
          />
          <Project
            title="PDF Pal"
            description="An AI powered web platform that helps you analyze and understand your PDFs instantly. Chat, summarize and get valuable insights effortlessly!"
            tags={["Next.js", "TypeScript", "Supabase", "tRPC"]}
            projectUrl="https://pdfpal.thunderboltdev.site?utm_source=portfolio&utm_medium=project&utm_campaign=pdfpal"
            imageUrl="/projects/pdf-pal.webp"
          />
        </div>
      </section>

      <footer className="border-t border-border px-6 py-12 bg-secondary/50 backdrop-blur-sm">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <div className="text-center md:text-left">
              <p className="text-lg font-semibold text-foreground">
                Thunderbolt
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                Building the web, one line of code at a time.
              </p>
            </div>

            <div className="flex gap-6">
              {[
                { name: "GitHub", href: "https://github.com/ThunderboltDev" },
                { name: "Twitter", href: "https://x.com/Thunderbolt3141" },
              ].map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-muted-foreground transition-colors hover:text-accent"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>

          <div className="mt-8 border-t border-border pt-8 text-center text-sm text-muted-foreground">
            <p>© 2025 Thunderbolt. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
