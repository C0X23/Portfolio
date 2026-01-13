"use client";

import { motion } from "framer-motion";
import { GraduationCap, Briefcase, Code } from "lucide-react";
import { useTranslations } from "next-intl";

interface TimelineItemType {
  year: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  tech: string[];
}

export function Timeline() {
  const t = useTranslations("Timeline");

  const formation: TimelineItemType[] = [
    { 
      year: "2021 - 2023",
      title: t("bts_title"),
      description: t("bts_desc"),
      icon: <GraduationCap className="w-5 h-5" />,
      tech: ["C++", "HTML", "CSS", "JavaScript", "Réseaux", "Linux"]
    },
    {
      year: "2023",
      title: t("piscine_title"),
      description: t("piscine_desc"),
      icon: <GraduationCap className="w-5 h-5" />,
      tech: ["C", "Shell", "Git"]
    },
    {
      year: "2023 - 2025",
      title: t("school_title"),
      description: t("school_desc"),
      icon: <Code className="w-5 h-5" />,
      tech: ["C", "C++", "Algorithmie", "Unix"]
    },
  ];

  const experience: TimelineItemType[] = [
    {
      year: t("arcom_year"),
      title: t("arcom_title"),
      description: t("arcom_desc"),
      icon: <Briefcase className="w-5 h-5" />,
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

        {/* Deux colonnes */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto">
          {/* Colonne Formation */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-3 mb-8"
            >
              <div className="w-10 h-10 rounded-full bg-stone-900 dark:bg-stone-100 flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-stone-50 dark:text-stone-900" />
              </div>
              <h3 className="text-xl font-bold text-stone-900 dark:text-stone-100">
                {t("formation_title")}
              </h3>
            </motion.div>
            
            <div className="space-y-4">
              {formation.map((item, index) => (
                <TimelineCard key={index} item={item} index={index} />
              ))}
            </div>
          </div>

          {/* Colonne Expérience */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-3 mb-8"
            >
              <div className="w-10 h-10 rounded-full bg-stone-900 dark:bg-stone-100 flex items-center justify-center">
                <Briefcase className="w-5 h-5 text-stone-50 dark:text-stone-900" />
              </div>
              <h3 className="text-xl font-bold text-stone-900 dark:text-stone-100">
                {t("experience_title")}
              </h3>
            </motion.div>
            
            <div className="space-y-4">
              {experience.map((item, index) => (
                <TimelineCard key={index} item={item} index={index} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function TimelineCard({ item, index }: { item: TimelineItemType; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="group relative"
    >
      <div className="bg-white dark:bg-stone-900 p-6 rounded-2xl border border-stone-200 dark:border-stone-800 shadow-sm hover:shadow-lg hover:border-stone-300 dark:hover:border-stone-700 transition-all duration-300">
        {/* En-tête avec année et icône */}
        <div className="flex items-start justify-between mb-3">
          <span className="px-3 py-1 text-xs font-semibold text-stone-600 dark:text-stone-400 bg-stone-100 dark:bg-stone-800 rounded-full">
            {item.year}
          </span>
          <div className="w-8 h-8 rounded-full bg-stone-100 dark:bg-stone-800 flex items-center justify-center text-stone-600 dark:text-stone-400 group-hover:bg-stone-900 group-hover:text-stone-50 dark:group-hover:bg-stone-100 dark:group-hover:text-stone-900 transition-colors duration-300">
            {item.icon}
          </div>
        </div>

        {/* Titre */}
        <h4 className="text-lg font-bold text-stone-900 dark:text-stone-100 mb-2 transition-colors duration-300">
          {item.title}
        </h4>

        {/* Description */}
        <p className="text-stone-600 dark:text-stone-400 text-sm leading-relaxed mb-4">
          {item.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {item.tech.map((tech: string) => (
            <span
              key={tech}
              className="text-xs font-medium text-stone-500 dark:text-stone-500 hover:text-stone-700 dark:hover:text-stone-300 transition-colors"
            >
              #{tech}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
