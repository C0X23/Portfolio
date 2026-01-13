"use client";

import { Github, Linkedin, Mail } from "lucide-react";
import { useTranslations } from "next-intl";

export function Footer() {
  const currentYear = new Date().getFullYear();
  const t = useTranslations("Footer");

  return (
    <footer className="bg-stone-100 dark:bg-stone-900 border-t border-stone-200 dark:border-stone-800 py-12 md:py-16 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-bold tracking-tighter text-stone-900 dark:text-stone-50 mb-2">CORENTIN</h3>
            <p className="text-stone-500 dark:text-stone-400 text-sm">
              {t("role")}
            </p>
          </div>

          <div className="flex gap-6">
            <FooterLink href="https://github.com/C0X23" icon={<Github className="w-5 h-5" />} label="GitHub" />
            <FooterLink href="https://www.linkedin.com/in/corentin-megret-2b298a23b/" icon={<Linkedin className="w-5 h-5" />} label="LinkedIn" />
            <FooterLink href="mailto:megret.corentin@gmail.com" icon={<Mail className="w-5 h-5" />} label="Email" />
          </div>

          <div className="text-stone-500 dark:text-stone-400 text-sm flex flex-col items-center md:items-end">
            <p>&copy; {currentYear} Corentin Megret.</p>
            <p className="text-xs mt-1 text-stone-400 dark:text-stone-500">{t("rights")}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterLink({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 transition-colors p-2 hover:bg-stone-200/50 dark:hover:bg-stone-800/50 rounded-full"
      aria-label={label}
    >
      {icon}
    </a>
  );
}
