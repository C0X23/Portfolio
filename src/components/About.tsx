"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useTranslations } from "next-intl";

export function About() {
  const t = useTranslations("About");

  return (
    <section id="about" className="py-24 bg-white dark:bg-stone-900 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="w-full md:w-1/2"
          >
            <div className="relative aspect-square max-w-md mx-auto overflow-hidden rounded-2xl bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 shadow-xl shadow-stone-200/50 dark:shadow-none">
              <Image 
                src="/images/portrait.jpg" 
                alt="Portrait" 
                fill 
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
                className="object-cover"
              />
               <div className="absolute inset-0 bg-gradient-to-t from-stone-900/40 to-transparent z-10" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="w-full md:w-1/2"
          >
            <h2 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-stone-900 to-stone-500 dark:from-stone-100 dark:to-stone-400 mb-6">
              {t("title")}
            </h2>
            <p className="text-stone-600 dark:text-stone-300 text-lg leading-relaxed mb-6">
              {t("description1")}
            </p>
            <p className="text-stone-600 dark:text-stone-300 text-lg leading-relaxed mb-8">
              {t("description2")}
            </p>

            <div className="grid grid-cols-2 gap-6 text-center md:text-left">
              <div>
                <h4 className="text-4xl font-bold text-stone-900 dark:text-stone-100 mb-2">3+</h4>
                <p className="text-sm text-stone-500 dark:text-stone-400 uppercase tracking-widest">{t("yearsEx")}</p>
              </div>
              <div>
                <h4 className="text-4xl font-bold text-stone-900 dark:text-stone-100 mb-2">30+</h4>
                <p className="text-sm text-stone-500 dark:text-stone-400 uppercase tracking-widest">{t("repos")}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
