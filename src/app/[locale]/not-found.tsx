"use client";

import { motion } from "framer-motion";
import { Home, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-950 flex flex-col items-center justify-center px-4 relative overflow-hidden">
      {/* Cercles décoratifs en arrière-plan */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.05 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="absolute top-1/4 -left-32 w-96 h-96 bg-stone-900 dark:bg-stone-100 rounded-full"
        />
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.03 }}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
          className="absolute bottom-1/4 -right-32 w-[500px] h-[500px] bg-stone-900 dark:bg-stone-100 rounded-full"
        />
      </div>

      {/* Contenu principal */}
      <div className="relative z-10 text-center">
        {/* 404 animé */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative"
        >
          <motion.h1
            className="text-[150px] md:text-[200px] font-black text-stone-200 dark:text-stone-800 leading-none select-none"
            animate={{
              textShadow: [
                "0 0 0px rgba(0,0,0,0)",
                "4px 4px 0px rgba(120,113,108,0.3)",
                "0 0 0px rgba(0,0,0,0)",
              ],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            404
          </motion.h1>
          
          {/* Texte superposé avec effet glitch */}
          <motion.span
            className="absolute inset-0 flex items-center justify-center text-[150px] md:text-[200px] font-black text-stone-900 dark:text-stone-100 leading-none select-none"
            animate={{
              x: [0, -2, 2, -1, 1, 0],
              opacity: [1, 0.8, 1, 0.9, 1],
            }}
            transition={{
              duration: 0.3,
              repeat: Infinity,
              repeatDelay: 3,
            }}
          >
            404
          </motion.span>
        </motion.div>

        {/* Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-4 mb-8"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-stone-900 dark:text-stone-100 mb-3">
            Page introuvable
          </h2>
          <p className="text-stone-600 dark:text-stone-400 max-w-md mx-auto">
            Oups ! Cette page semble avoir disparu dans le code source.
          </p>
        </motion.div>

        {/* Boutons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-950 rounded-full font-medium hover:bg-stone-800 dark:hover:bg-stone-200 transition-all hover:scale-105 active:scale-95 shadow-lg"
          >
            <Home className="w-4 h-4" />
            Retour à l&apos;accueil
          </Link>
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-transparent border border-stone-300 dark:border-stone-700 text-stone-700 dark:text-stone-300 rounded-full font-medium hover:bg-stone-100 dark:hover:bg-stone-800 transition-all hover:scale-105 active:scale-95"
          >
            <ArrowLeft className="w-4 h-4" />
            Page précédente
          </button>
        </motion.div>
      </div>

      {/* Petite animation de particules flottantes */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-stone-300 dark:bg-stone-700 rounded-full"
            style={{
              left: `${15 + i * 15}%`,
              top: `${20 + (i % 3) * 25}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.3,
            }}
          />
        ))}
      </div>
    </div>
  );
}
