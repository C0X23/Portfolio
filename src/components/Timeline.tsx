"use client";

import { motion } from "framer-motion";
import { GraduationCap, Briefcase, Code } from "lucide-react";
import { useTranslations } from "next-intl";

export function Timeline() {
  const t = useTranslations("Timeline");

  const timelineData = [
    { 
      year: "2021 - 2023",
      title: t("bts_title"),
      description: t("bts_desc"),
      icon: <GraduationCap className="w-5 h-5 text-stone-50" />,
      tech: ["C++", "HTML", "CSS", "JavaScript", "Réseaux", "Linux"]
    },
    {
      year: "2023",
      title: t("piscine_title"),
      description: t("piscine_desc"),
      icon: <GraduationCap className="w-5 h-5 text-stone-50" />,
      tech: ["C", "Shell", "Git"]
    },
    {
      year: "2023 - 2025",
      title: t("school_title"),
      description: t("school_desc"),
      icon: <Code className="w-5 h-5 text-stone-50" />,
      tech: ["C", "C++", "Algorithmie", "Unix"]
    },
    {
      year: t("arcom_year"),
      title: t("arcom_title"),
      description: t("arcom_desc"),
      icon: <Briefcase className="w-5 h-5 text-stone-50" />,
      tech: ["Python", "Django", "SQL", "Docker"]
    }
  ];

  return (
    <section id="timeline" className="py-24 bg-stone-50 dark:bg-stone-950 relative transition-colors duration-300">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-stone-900 to-stone-500 dark:from-stone-100 dark:to-stone-400 mb-4">
            {t("title")}
          </h2>
          <p className="text-stone-600 dark:text-stone-400 max-w-xl mx-auto">
            {t("subtitle")}
          </p>
        </motion.div>

        <div className="overflow-x-auto pb-8 -mx-4 px-4 scrollbar-hide">
          <div className="min-w-[900px] lg:w-full relative py-8 px-4 mt-8">
            {/* Ligne horizontale */}
            <div className="absolute top-[10rem] left-0 right-0 h-0.5 bg-stone-200 dark:bg-stone-800" />

            <div className="flex justify-between gap-8">
              {timelineData.map((item, index) => (
                <TimelineItem key={index} item={item} index={index} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

interface TimelineItemType {
  year: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  tech: string[];
}

function TimelineItem({ item, index }: { item: TimelineItemType, index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="flex-1 relative flex flex-col items-center max-w-xs"
    >
      {/* Année et trait vertical */}
      <div className="flex flex-col items-center mb-0 z-10">
        <span className="px-3 py-1 text-sm font-bold text-stone-500 dark:text-stone-400 bg-stone-100 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-full mb-2 shadow-sm transition-colors duration-300">
          {item.year}
        </span>
        <div className="w-0.5 h-12 bg-stone-300 dark:bg-stone-700 transition-colors duration-300" />
      </div>

      {/* Icone */}
      <div className="relative z-10 w-20 h-20 rounded-full bg-stone-900 dark:bg-stone-500 border-[6px] border-stone-50 dark:border-stone-950 shadow-xl flex items-center justify-center mb-8 shrink-0 transition-all duration-300 hover:scale-110">
        {item.icon}
      </div>

      {/* Carte */}
      <div className="w-full bg-white dark:bg-stone-900 p-6 rounded-2xl border border-stone-200 dark:border-stone-800 shadow-sm hover:shadow-md transition-all duration-300 h-full flex flex-col relative group">
        {/* Petit triangle pointant vers le haut */}
        <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-white dark:bg-stone-900 border-t border-l border-stone-200 dark:border-stone-800 rotate-45 transition-colors duration-300" />

        <h3 className="text-xl font-bold text-stone-900 dark:text-stone-100 mb-2 transition-colors duration-300">{item.title}</h3>
        <p className="text-stone-600 dark:text-stone-400 mb-4 text-sm leading-relaxed flex-grow transition-colors duration-300">
          {item.description}
        </p>
        <div className="flex flex-wrap gap-2 mt-auto">
          {item.tech.map((t: string) => (
            <span key={t} className="text-xs font-medium text-stone-500 dark:text-stone-500">
              #{t}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
