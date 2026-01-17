"use client";

import * as Sentry from "@sentry/nextjs";
import { useEffect, useState } from "react";

const translations = {
  fr: {
    title: "Une erreur est survenue",
    description: "Nous nous excusons pour ce désagrément.",
    retry: "Réessayer",
  },
  en: {
    title: "Something went wrong",
    description: "We apologize for the inconvenience.",
    retry: "Try again",
  },
};

function getLocaleFromPath(): "fr" | "en" {
  if (typeof window !== "undefined") {
    const path = window.location.pathname;
    if (path.startsWith("/en")) return "en";
  }
  return "fr";
}

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const [locale, setLocale] = useState<"fr" | "en">("fr");

  useEffect(() => {
    setLocale(getLocaleFromPath());
  }, []);

  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  const t = translations[locale];

  return (
    <html lang={locale}>
      <body className="min-h-screen flex items-center justify-center bg-stone-50 dark:bg-stone-950">
        <div className="text-center px-4">
          <h1 className="text-4xl font-bold text-stone-900 dark:text-stone-50 mb-4">
            {t.title}
          </h1>
          <p className="text-stone-600 dark:text-stone-400 mb-8">
            {t.description}
          </p>
          <button
            onClick={() => reset()}
            className="px-6 py-3 bg-stone-900 dark:bg-stone-50 text-stone-50 dark:text-stone-900 rounded-lg hover:opacity-90 transition-opacity"
          >
            {t.retry}
          </button>
        </div>
      </body>
    </html>
  );
}
