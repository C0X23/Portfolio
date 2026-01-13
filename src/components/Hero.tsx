"use client";

import { motion } from "framer-motion";
import { ArrowRight, Github, Linkedin, Mail } from "lucide-react";
import { useTranslations } from "next-intl";

export function Hero() {
  const t = useTranslations("Hero");

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20 bg-stone-50 dark:bg-stone-950 transition-colors duration-300">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-100/50 via-stone-50 to-stone-50 dark:from-blue-900/20 dark:via-stone-950 dark:to-stone-950 -z-10" />
      
      <div className="container px-4 mx-auto text-center z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-xl md:text-2xl font-medium text-blue-600 dark:text-blue-400 mb-4 tracking-wide">
            {t("subtitle")}
          </h2>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-5xl md:text-8xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-stone-900 via-stone-700 to-stone-500 dark:from-stone-100 dark:via-stone-300 dark:to-stone-500 mb-6"
          dangerouslySetInnerHTML={{ __html: t.raw("title") }}
        />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-stone-600 dark:text-stone-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          {t("description")}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="flex flex-col md:flex-row items-center justify-center gap-4"
        >
          <a
            href="#projects"
            className="group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-md bg-stone-900 dark:bg-stone-100 px-8 font-medium text-white dark:text-stone-900 transition-all duration-300 hover:bg-stone-800 dark:hover:bg-stone-200 hover:ring-2 hover:ring-stone-800 hover:ring-offset-2 hover:ring-offset-stone-50 dark:hover:ring-stone-200 dark:hover:ring-offset-stone-950"
          >
            <span>{t("cta")}</span>
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
          
          <div className="flex items-center gap-4 mt-4 md:mt-0 md:ml-6">
            <SocialLink href="https://github.com/C0X23" icon={<Github className="h-5 w-5" />} />
            <SocialLink href="https://www.linkedin.com/in/corentin-megret-2b298a23b/" icon={<Linkedin className="h-5 w-5" />} />
            <SocialLink href="mailto:megret.corentin@gmail.com" icon={<Mail className="h-5 w-5" />} />
          </div>
        </motion.div>
      </div>

      {/* Background Elements */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl -z-10 animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-200/20 rounded-full blur-3xl -z-10 animate-pulse delay-1000" />
    </section>
  );
}

function SocialLink({ href, icon }: { href: string; icon: React.ReactNode }) {
  return (
    <a
      href={href}
      className="p-3 rounded-full bg-stone-200/50 dark:bg-stone-800/50 border border-stone-300 dark:border-stone-700 hover:bg-stone-300 dark:hover:bg-stone-700 hover:border-stone-400 dark:hover:border-stone-600 transition-all text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100"
    >
      {icon}
    </a>
  );
}
