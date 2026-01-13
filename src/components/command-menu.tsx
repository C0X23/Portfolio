"use client";

import * as React from "react";
import { Command } from "cmdk";
import { useTheme } from "next-themes";
import { useRouter, usePathname } from "@/i18n/routing";
import { useLocale, useTranslations } from "next-intl";
import { Laptop, Moon, Sun, User, Briefcase, FileText, Code, Mail, Globe, Search } from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function CommandMenu() {
  const [open, setOpen] = React.useState(false);
  const { setTheme } = useTheme();
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();
  const t = useTranslations("CommandMenu");

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const runCommand = React.useCallback((command: () => unknown) => {
    setOpen(false);
    command();
  }, []);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-stone-950/50 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 flex items-center justify-center p-4">
      <div 
        className="fixed inset-0" 
        onClick={() => setOpen(false)} 
      />
      <Command
        className="relative w-full max-w-[640px] overflow-hidden rounded-xl border border-stone-200 bg-white shadow-2xl dark:border-stone-800 dark:bg-stone-950 animate-in zoom-in-95 duration-100"
        loop
      >
        <div className="flex items-center border-b border-stone-200 dark:border-stone-800 px-3" cmdk-input-wrapper="">
        <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
        <Command.Input
          autoFocus
          placeholder={t("search")}
          className="flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-stone-500 disabled:cursor-not-allowed disabled:opacity-50 dark:text-stone-50"
        />
        <div className="text-xs text-stone-500 border border-stone-200 dark:border-stone-800 rounded px-1.5 py-0.5 select-none">ESC</div>
      </div>
      <Command.List className="max-h-[300px] overflow-y-auto overflow-x-hidden p-2">
        <Command.Empty className="py-6 text-center text-sm text-stone-500">
          No results found.
        </Command.Empty>

        <Command.Group heading={t("navigation")} className="text-stone-500 dark:text-stone-400 text-xs font-medium px-2 py-1.5 mb-1 select-none">
          <CommandItem onSelect={() => runCommand(() => window.location.hash = "#about")}>
            <User className="mr-2 h-4 w-4" />
            <span>About</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => window.location.hash = "#timeline")}>
            <FileText className="mr-2 h-4 w-4" />
            <span>Timeline</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => window.location.hash = "#projects")}>
            <Code className="mr-2 h-4 w-4" />
            <span>Projects</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => window.location.hash = "#skills")}>
            <Briefcase className="mr-2 h-4 w-4" />
            <span>Skills</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => window.location.hash = "#contact")}>
            <Mail className="mr-2 h-4 w-4" />
            <span>Contact</span>
          </CommandItem>
        </Command.Group>

        <Command.Group heading={t("theme")} className="text-stone-500 dark:text-stone-400 text-xs font-medium px-2 py-1.5 mb-1 mt-2 select-none">
          <CommandItem onSelect={() => runCommand(() => setTheme("light"))}>
            <Sun className="mr-2 h-4 w-4" />
            <span>{t("light")}</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => setTheme("dark"))}>
            <Moon className="mr-2 h-4 w-4" />
            <span>{t("dark")}</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => setTheme("system"))}>
            <Laptop className="mr-2 h-4 w-4" />
            <span>{t("system")}</span>
          </CommandItem>
        </Command.Group>

        <Command.Group heading={t("lang")} className="text-stone-500 dark:text-stone-400 text-xs font-medium px-2 py-1.5 mb-1 mt-2 select-none">
          <CommandItem onSelect={() => runCommand(() => router.replace(pathname, { locale: 'fr' }))}>
             <span className="mr-2 flex h-4 w-4 items-center justify-center font-bold text-xs uppercase">FR</span>
            <span>{t("fr")}</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => router.replace(pathname, { locale: 'en' }))}>
            <span className="mr-2 flex h-4 w-4 items-center justify-center font-bold text-xs uppercase">EN</span>
            <span>{t("en")}</span>
          </CommandItem>
        </Command.Group>
      </Command.List>
      </Command>
    </div>
  );
}

function CommandItem({ children, onSelect }: { children: React.ReactNode, onSelect: () => void }) {
  return (
    <Command.Item
      onSelect={onSelect}
      className="relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none aria-selected:bg-stone-100 dark:aria-selected:bg-stone-800 text-stone-900 dark:text-stone-50 data-[disabled]:pointer-events-none data-[disabled]:opacity-50 transition-colors"
    >
      {children}
    </Command.Item>
  );
}
