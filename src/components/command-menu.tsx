"use client";

import * as React from "react";
import { Command } from "cmdk";
import * as Dialog from "@radix-ui/react-dialog";
import { useTheme } from "next-themes";
import { useRouter, usePathname } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { Laptop, Moon, Sun, User, Briefcase, FileText, Code, Mail, Search } from "lucide-react";
import { OPEN_COMMAND_MENU_EVENT, getCommandMenuOpen, getServerCommandMenuOpen, setCommandMenuOpen as setOpen, subscribeCommandMenu } from "@/lib/command-menu-events";
import { advanceKonami, type EasterEggId } from "@/lib/easter-eggs";
import { EasterEggDialog, EGG_COMMANDS } from "./easter-egg-dialog";

const groupClass = "text-stone-500 dark:text-stone-400 text-xs font-medium px-2 py-1.5 mb-1 mt-2 select-none";

export function CommandMenu() {
  const open = React.useSyncExternalStore(subscribeCommandMenu, getCommandMenuOpen, getServerCommandMenuOpen);
  const [search, setSearch] = React.useState("");
  const [activeEgg, setActiveEgg] = React.useState<EasterEggId | null>(null);
  const returnFocus = React.useRef<HTMLElement | null>(null);
  const { setTheme } = useTheme();
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations("CommandMenu");
  const nav = useTranslations("Navigation");
  const modalOpen = open || activeEgg !== null;

  const rememberFocus = React.useCallback(() => {
    const focused = document.activeElement;
    returnFocus.current = focused instanceof HTMLElement && focused !== document.body ? focused : null;
  }, []);

  const restoreFocus = React.useCallback(() => {
    const previous = returnFocus.current;
    const fallback = document.querySelector<HTMLElement>("button[aria-keyshortcuts]");
    (previous?.isConnected ? previous : fallback)?.focus({ preventScroll: true });
  }, []);

  React.useEffect(() => {
    let sequence = 0;
    const showMenu = () => {
      if (activeEgg) return;
      if (!open) rememberFocus();
      setSearch("");
      setOpen(true);
    };
    const down = (event: KeyboardEvent) => {
      if (event.isComposing || event.repeat) return;
      if (event.key.toLowerCase() === "k" && (event.metaKey || event.ctrlKey) && !event.altKey) {
        event.preventDefault();
        if (activeEgg) return;
        if (!open) rememberFocus();
        setSearch("");
        setOpen((value) => !value);
        return;
      }
      const target = event.target;
      if (open || activeEgg || event.metaKey || event.ctrlKey || event.altKey ||
        (target instanceof Element && target.closest("input, textarea, select, [contenteditable=true], [role=textbox]"))) {
        sequence = 0;
        return;
      }
      const next = advanceKonami(sequence, event.key);
      sequence = next.progress;
      if (next.unlocked) {
        rememberFocus();
        setActiveEgg("xp");
      }
    };
    document.addEventListener("keydown", down);
    document.addEventListener(OPEN_COMMAND_MENU_EVENT, showMenu);
    return () => {
      document.removeEventListener("keydown", down);
      document.removeEventListener(OPEN_COMMAND_MENU_EVENT, showMenu);
    };
  }, [open, activeEgg, rememberFocus]);

  React.useEffect(() => {
    if (!modalOpen) return;
    const lenis = window.lenis;
    const wasStopped = lenis?.isStopped;
    lenis?.stop();
    return () => {
      if (lenis === window.lenis && !wasStopped) lenis?.start();
    };
  }, [modalOpen]);

  const runCommand = (command: () => void) => {
    setOpen(false);
    setSearch("");
    command();
  };

  return (
    <>
      <Dialog.Root open={open} onOpenChange={(next) => { setOpen(next); setSearch(""); }}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-[9998] bg-stone-950/40 backdrop-blur-sm" />
          <Dialog.Content
            className="fixed left-1/2 top-[min(20vh,7rem)] z-[9999] w-[calc(100%_-_2rem)] max-w-[640px] -translate-x-1/2 overflow-hidden rounded-xl border border-stone-200 bg-white shadow-2xl focus:outline-none dark:border-stone-800 dark:bg-stone-950"
            onCloseAutoFocus={(event) => { event.preventDefault(); if (!activeEgg) restoreFocus(); }}
          >
            <Dialog.Title className="sr-only">{t("title")}</Dialog.Title>
            <Dialog.Description className="sr-only">{t("description")}</Dialog.Description>
            <Command loop label={t("title")}>
              <div className="flex items-center border-b border-stone-200 px-3 dark:border-stone-800">
                <Search aria-hidden className="mr-2 h-4 w-4 shrink-0 text-stone-500" />
                <Command.Input
                  autoFocus
                  value={search}
                  onValueChange={setSearch}
                  aria-label={t("search")}
                  placeholder={t("search")}
                  className="flex h-12 w-full rounded-md bg-transparent py-3 text-base text-stone-900 outline-none placeholder:text-stone-500 sm:text-sm dark:text-stone-50"
                />
                <Dialog.Close className="rounded border border-stone-200 px-1.5 py-1 text-xs text-stone-500 hover:bg-stone-100 dark:border-stone-800 dark:hover:bg-stone-800" aria-label={t("egg_close")}>ESC</Dialog.Close>
              </div>
              <Command.List className="max-h-[min(55dvh,380px)] overflow-y-auto overflow-x-hidden p-2" data-lenis-prevent>
                <Command.Empty className="py-6 text-center text-sm text-stone-500">{t("no_results")}</Command.Empty>
                <Command.Group heading={t("navigation")} className={groupClass}>
                  {[
                    { hash: "about", icon: User },
                    { hash: "timeline", icon: FileText },
                    { hash: "projects", icon: Code },
                    { hash: "skills", icon: Briefcase },
                    { hash: "contact", icon: Mail },
                  ].map(({ hash, icon: Icon }) => (
                    <CommandItem key={hash} keywords={[hash]} onSelect={() => runCommand(() => {
                      const target = document.getElementById(hash);
                      if (target) {
                        window.history.replaceState(null, "", "#" + hash);
                        if (window.lenis) window.lenis.scrollTo(target, { force: true });
                        else target.scrollIntoView({ behavior: "smooth" });
                      }
                    })}>
                      <Icon aria-hidden className="mr-2 h-4 w-4 shrink-0" /><span>{nav(hash)}</span>
                    </CommandItem>
                  ))}
                </Command.Group>
                <Command.Group heading={t("theme")} className={groupClass}>
                  {[
                    { value: "light", icon: Sun },
                    { value: "dark", icon: Moon },
                    { value: "system", icon: Laptop },
                  ].map(({ value, icon: Icon }) => (
                    <CommandItem key={value} onSelect={() => runCommand(() => setTheme(value))}><Icon aria-hidden className="mr-2 h-4 w-4" /><span>{t(value)}</span></CommandItem>
                  ))}
                </Command.Group>
                <Command.Group heading={t("lang")} className={groupClass}>
                  {["fr", "en"].map((locale) => (
                    <CommandItem key={locale} onSelect={() => runCommand(() => router.replace(pathname, { locale }))}>
                      <span aria-hidden className="mr-2 flex h-4 w-4 items-center justify-center text-xs font-bold uppercase">{locale}</span><span>{t(locale)}</span>
                    </CommandItem>
                  ))}
                </Command.Group>
                <Command.Group heading="Easter eggs" className={groupClass}>
                  {EGG_COMMANDS.map(({ id, command, icon: Icon, keywords }) => (
                    <CommandItem key={id} keywords={["easter", "egg", "secret", ...keywords, t("egg_title_" + id)]} onSelect={() => runCommand(() => setActiveEgg(id))}>
                      <Icon aria-hidden className="mr-2 h-4 w-4 shrink-0" />
                      <span className="font-mono">{command}</span>
                      <span className="ml-auto pl-3 text-right text-xs text-stone-500">{t("egg_title_" + id)}</span>
                    </CommandItem>
                  ))}
                </Command.Group>
              </Command.List>
              <div className="border-t border-stone-200 px-4 py-2 text-xs text-stone-500 dark:border-stone-800">{t("keyboard_hint")}</div>
            </Command>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
      {activeEgg && <EasterEggDialog id={activeEgg} onClose={() => setActiveEgg(null)} onChange={setActiveEgg} onRestoreFocus={restoreFocus} />}
    </>
  );
}

function CommandItem({ children, onSelect, keywords }: { children: React.ReactNode; onSelect: () => void; keywords?: string[] }) {
  return (
    <Command.Item
      onSelect={onSelect}
      keywords={keywords}
      className="relative flex min-h-10 cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm text-stone-900 outline-none transition-colors hover:bg-stone-100 aria-selected:bg-stone-100 data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 dark:text-stone-50 dark:hover:bg-stone-800 dark:aria-selected:bg-stone-800"
    >{children}</Command.Item>
  );
}
