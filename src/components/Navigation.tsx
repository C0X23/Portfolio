"use client";

import { useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { cn } from "@/lib/utils";
import { ModeToggle } from "./mode-toggle";
import { LangToggle } from "./lang-toggle";
import { useTranslations } from "next-intl";

export function Navigation() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const t = useTranslations("Navigation");

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
    setScrolled(latest > 50);
  });

  return (
    <motion.header
      variants={{
        visible: { y: 0 },
        hidden: { y: "-100%" },
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 transition-all duration-300",
        scrolled
          ? "bg-white/80 dark:bg-stone-950/80 backdrop-blur-md border-b border-stone-200 dark:border-stone-800 shadow-sm"
          : "bg-transparent"
      )}
    >
      <div className="container mx-auto flex items-center justify-between">
        <a href="#" className="text-2xl font-bold tracking-tighter text-stone-900 dark:text-stone-50 z-50">
          Corentin<span className="text-stone-500">.</span>
        </a>

        <div className="flex items-center gap-8">
          <nav className="hidden md:block">
            <ul className="flex items-center gap-8">
              <NavItem href="#about">{t("about")}</NavItem>
              <NavItem href="#timeline">{t("timeline")}</NavItem>
              <NavItem href="#projects">{t("projects")}</NavItem>
              <NavItem href="#skills">{t("skills")}</NavItem>
              <NavItem href="#contact" primary>
                {t("contact")}
              </NavItem>
            </ul>
          </nav>
          <div className="relative z-50 flex items-center">
            <ModeToggle />
            <LangToggle />
          </div>
        </div>
      </div>
    </motion.header>
  );
}

function NavItem({
  href,
  children,
  primary = false,
}: {
  href: string;
  children: React.ReactNode;
  primary?: boolean;
}) {
  if (primary) {
    return (
      <li>
        <a
          href={href}
          className="px-5 py-2.5 bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-950 rounded-full font-medium hover:bg-stone-800 dark:hover:bg-stone-200 transition-all hover:scale-105 active:scale-95 shadow-lg shadow-stone-900/10 dark:shadow-none"
        >
          {children}
        </a>
      </li>
    );
  }

  return (
    <li>
      <a
        href={href}
        className="text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-50 font-medium transition-colors relative group"
      >
        {children}
        <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-stone-900 dark:bg-stone-50 scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
      </a>
    </li>
  );
}
