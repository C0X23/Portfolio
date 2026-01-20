"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/routing";
import { FR, GB } from 'country-flag-icons/react/3x2';
import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

export function LangToggle() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const switchLanguage = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale });
    setIsOpen(false);
  };

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const languages = [
    { code: 'fr', name: 'Français', flag: FR },
    { code: 'en', name: 'English', flag: GB },
  ];

  const currentLang = languages.find(l => l.code === locale) || languages[0];

  return (
    <div className="relative" ref={containerRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-stone-200 dark:border-stone-800 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors ml-2 bg-white/50 dark:bg-stone-900/50 backdrop-blur-sm"
        aria-label="Select language"
      >
        <currentLang.flag className="w-5 rounded-[2px] shadow-sm" />
        <ChevronDown className={`w-3 h-3 text-stone-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      <div
        className={`absolute right-0 top-full mt-2 w-40 bg-white/80 dark:bg-stone-900/80 backdrop-blur-md border border-stone-200 dark:border-stone-800 rounded-xl shadow-xl overflow-hidden p-1 z-50 transition-all duration-150 origin-top-right ${
          isOpen 
            ? 'opacity-100 scale-100 pointer-events-auto' 
            : 'opacity-0 scale-95 pointer-events-none'
        }`}
      >
        {languages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => switchLanguage(lang.code)}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all ${
              locale === lang.code
                ? 'bg-stone-100 dark:bg-stone-800 font-medium text-stone-900 dark:text-stone-100'
                : 'text-stone-600 dark:text-stone-400 hover:bg-stone-50 dark:hover:bg-stone-800/50'
            }`}
          >
            <lang.flag className="w-5 rounded-[2px] shadow-sm" />
            <span>{lang.name}</span>
            {locale === lang.code && (
              <div className="absolute left-0 w-0.5 h-4 bg-blue-500 rounded-full ml-1" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

