"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

const skills = [
  { key: "cpp", level: 95 },
  { key: "python", level: 95 },
  { key: "linux", level: 85 },
  { key: "sql", level: 80 },
  { key: "git", level: 90 },
  { key: "docker", level: 75 },
  { key: "web", level: 90 },
  { key: "react", level: 85 },
  { key: "nextjs", level: 80 },
  { key: "typescript", level: 85 },
];

export function Skills() {
  const t = useTranslations("Skills");

  return (
    <section id="skills" className="py-24 bg-stone-50 dark:bg-stone-950 relative overflow-hidden transition-colors duration-300">
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-stone-900 to-stone-500 dark:from-stone-100 dark:to-stone-400 mb-4">
            {t("title")}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.key}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="group"
            >
              <div className="flex justify-between items-end mb-2">
                <span className="text-lg font-medium text-stone-800 dark:text-stone-200 transition-colors duration-300">{t(skill.key)}</span>
                <span className="text-sm text-stone-500 dark:text-stone-400 transition-colors duration-300">{skill.level}%</span>
              </div>
              <div className="h-2 w-full bg-stone-200 dark:bg-stone-800 rounded-full overflow-hidden transition-colors duration-300">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.level}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.2 }}
                  className="h-full bg-gradient-to-r from-stone-700 to-stone-900 dark:from-stone-400 dark:to-stone-100 rounded-full shadow-sm"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
