"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { Check, Coffee, Copy, FileText, Folder, Monitor, Play, RotateCcw, Terminal, X } from "lucide-react";
import { resolveTerminalCommand } from "@/lib/easter-egg-terminal";

export interface SceneProps {
  t: (key: string, values?: Record<string, string | number>) => string;
  reducedMotion: boolean;
  onClose: () => void;
  onEggChange: (id: string) => void;
  playSound: (src: string) => void;
}

type TerminalEntry = { command: string; output: string[] };

export function TerminalScene({ t, initialCommand, onEggChange, playSound }: SceneProps & { initialCommand: "profile" | "whoami" }) {
  const [entries, setEntries] = useState<TerminalEntry[]>(() => {
    const result = resolveTerminalCommand(initialCommand === "profile" ? "show profile" : "whoami", t);
    return result.kind === "output" ? [{ command: result.command, output: result.output }] : [];
  });
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const historyPosition = useRef(-1);
  const outputRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (outputRef.current) outputRef.current.scrollTop = outputRef.current.scrollHeight;
  }, [entries]);

  const run = (raw: string) => {
    const result = resolveTerminalCommand(raw, t);
    if (result.kind === "empty") return;
    playSound("/sounds/typing-keyboard.mp3");
    setInput("");
    setHistory((previous) => [...previous.slice(-29), result.command]);
    historyPosition.current = -1;
    if (result.kind === "clear") {
      setEntries([]);
      return;
    }
    if (result.kind === "navigate") {
      onEggChange(result.egg);
      return;
    }
    setEntries((previous) => [...previous.slice(-19), { command: result.command, output: result.output }]);
  };

  const submit = (event: FormEvent) => {
    event.preventDefault();
    run(input);
  };

  return (
    <div className="overflow-hidden rounded-lg border border-stone-700 bg-stone-950 font-mono text-sm text-stone-200">
      <div className="flex items-center justify-between gap-3 border-b border-stone-800 px-4 py-3 text-xs text-stone-400">
        <span className="flex items-center gap-2"><Terminal size={14} aria-hidden="true" />corentin@portfolio:~</span>
        <span>{t("egg_terminal_local")}</span>
      </div>
      <div ref={outputRef} className="h-64 overflow-y-auto overscroll-contain p-4 leading-relaxed sm:h-72" role="log" aria-label={t("egg_terminal_output")} aria-live="polite" data-lenis-prevent>
        {entries.map((entry, index) => (
          <div key={index} className="mb-4 last:mb-0">
            <p className="break-words text-emerald-400"><span aria-hidden="true">$ </span>{entry.command}</p>
            {entry.output.map((line, lineIndex) => <p key={lineIndex} className="whitespace-pre-wrap break-words">{line}</p>)}
          </div>
        ))}
        {entries.length === 0 && <p className="text-stone-500">{t("egg_terminal_cleared")}</p>}
      </div>
      <form onSubmit={submit} className="flex items-center gap-2 border-t border-stone-800 px-4 py-3">
        <span className="text-emerald-400" aria-hidden="true">$</span>
        <input
          value={input}
          onChange={(event) => setInput(event.target.value)}
          onKeyDown={(event) => {
            if (event.key !== "ArrowUp" && event.key !== "ArrowDown") return;
            event.preventDefault();
            if (event.key === "ArrowUp") historyPosition.current = Math.min(historyPosition.current + 1, history.length - 1);
            else historyPosition.current = Math.max(historyPosition.current - 1, -1);
            setInput(historyPosition.current < 0 ? "" : history[history.length - 1 - historyPosition.current] ?? "");
          }}
          aria-label={t("egg_terminal_input")}
          placeholder={t("egg_terminal_placeholder")}
          spellCheck={false}
          autoComplete="off"
          autoCapitalize="off"
          className="min-w-0 flex-1 bg-transparent py-1 text-base text-stone-100 outline-none placeholder:text-stone-500 sm:text-sm"
        />
        <button type="submit" aria-label={t("egg_terminal_run")} className="rounded-md p-2 text-emerald-400 hover:bg-stone-800 focus-visible:outline-2 focus-visible:outline-emerald-400"><Play size={16} aria-hidden="true" /></button>
      </form>
      <div className="flex items-center justify-between gap-3 border-t border-stone-800 px-4 py-2 text-xs text-stone-400">
        <span>{t("egg_terminal_hint")}</span>
        <button type="button" onClick={() => run("help")} className="rounded px-2 py-1 text-emerald-400 hover:bg-stone-800 focus-visible:outline-2 focus-visible:outline-emerald-400">help</button>
      </div>
    </div>
  );
}

export function CoffeeScene({ t, reducedMotion, playSound }: SceneProps) {
  const [level, setLevel] = useState(0);
  const [brewing, setBrewing] = useState(false);
  const [cups, setCups] = useState(0);

  useEffect(() => {
    if (!brewing) return;
    const started = performance.now();
    const timer = window.setInterval(() => {
      const next = Math.min(100, Math.round((performance.now() - started) / 22));
      setLevel(next);
      if (next >= 100) {
        window.clearInterval(timer);
        setBrewing(false);
        setCups((count) => count + 1);
      }
    }, 40);
    return () => window.clearInterval(timer);
  }, [brewing]);

  const pour = () => {
    playSound("/sounds/pouring-coffee.mp3");
    if (reducedMotion) {
      setLevel(100);
      setCups((count) => count + 1);
      return;
    }
    setLevel(0);
    setBrewing(true);
  };
  const status = level === 100 ? "coffee_status_100" : level >= 75 ? "coffee_status_75" : level >= 50 ? "coffee_status_50" : level >= 25 ? "coffee_status_25" : "egg_coffee_waiting";

  return (
    <div className="flex flex-col items-center gap-6 rounded-lg bg-stone-950 px-5 py-7 text-stone-100">
      <p className="text-center text-lg font-medium" role="status">{t(status)}</p>
      <div className="relative mt-8 h-44 w-40" aria-hidden="true">
        <div className="absolute -top-9 left-8 flex w-24 justify-between">
          {[0, 1, 2].map((index) => <motion.span key={index} className="h-9 w-1.5 rounded-full bg-stone-400" initial={false} animate={level >= 50 && !reducedMotion ? { opacity: [0, 0.5, 0], y: [0, -12, -24] } : { opacity: level >= 50 ? 0.3 : 0 }} transition={level >= 50 && !reducedMotion ? { duration: 2.2, delay: index * 0.5, repeat: Infinity } : { duration: 0 }} />)}
        </div>
        <div className="absolute right-0 top-8 h-20 w-8 rounded-r-3xl border-4 border-stone-500" />
        <div className="absolute bottom-3 left-2 right-6 top-0 overflow-hidden rounded-b-[2rem] rounded-t-md border-4 border-stone-500 bg-stone-900">
          <motion.div className="absolute inset-x-0 bottom-0 bg-amber-800" initial={false} animate={{ height: `${level * 0.9}%` }} transition={{ duration: reducedMotion ? 0 : 0.08 }} />
          <div className="absolute left-3 top-4 h-11 w-2 rounded-full bg-white/10" />
        </div>
        <div className="absolute bottom-0 left-0 h-3 w-40 rounded-[50%] bg-stone-600" />
      </div>
      <div className="w-full max-w-xs">
        <div className="mb-2 flex justify-between text-xs text-stone-400"><span>{t("coffee_caffeine")}</span><span className="tabular-nums text-amber-400">{level}%</span></div>
        <div className="h-1.5 overflow-hidden rounded-full bg-stone-800" role="progressbar" aria-label={t("coffee_caffeine")} aria-valuenow={level} aria-valuemin={0} aria-valuemax={100}><div className="h-full rounded-full bg-amber-600" style={{ width: `${level}%` }} /></div>
      </div>
      <button type="button" disabled={brewing} onClick={pour} className="flex min-h-11 items-center gap-2 rounded-md bg-stone-100 px-5 py-2.5 text-sm font-medium text-stone-950 hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-500 disabled:cursor-wait disabled:opacity-50"><Coffee size={16} aria-hidden="true" />{t(brewing ? "egg_coffee_pouring" : level === 100 ? "egg_coffee_again" : "egg_coffee_pour")}</button>
      <p className="text-center text-xs text-stone-400">{cups > 0 ? t("egg_coffee_result", { cups }) : t("egg_coffee_disclaimer")}</p>
    </div>
  );
}

export function XpScene({ t, reducedMotion, onEggChange, playSound }: SceneProps) {
  const [phase, setPhase] = useState<"boot" | "desktop" | "crash">(reducedMotion ? "desktop" : "boot");
  const [progress, setProgress] = useState(0);
  const [notepad, setNotepad] = useState(false);

  useEffect(() => {
    if (phase !== "boot") return;
    const start = performance.now();
    const timer = window.setInterval(() => {
      const next = Math.min(100, Math.floor((performance.now() - start) / 22));
      setProgress(next);
      if (next === 100) {
        window.clearInterval(timer);
        setPhase("desktop");
        playSound("/sounds/windows-xp-startup.wav");
      }
    }, 80);
    return () => window.clearInterval(timer);
  }, [phase, playSound]);

  const reboot = () => {
    setNotepad(false);
    setProgress(0);
    setPhase(reducedMotion ? "desktop" : "boot");
    if (reducedMotion) playSound("/sounds/windows-xp-startup.wav");
  };

  if (phase === "boot") return (
    <div className="flex min-h-80 flex-col items-center justify-center gap-7 rounded-lg bg-black p-7 text-white">
      <Monitor size={46} className="text-sky-400" aria-hidden="true" />
      <p className="text-4xl font-bold tracking-tight">Windows <span className="text-amber-500">XP</span></p>
      <div className="h-3 w-48 overflow-hidden rounded-full border border-stone-600 p-0.5" role="progressbar" aria-label={t("xp_loading_1")} aria-valuemin={0} aria-valuemax={100} aria-valuenow={progress}><div className="h-full rounded-full bg-blue-500" style={{ width: `${progress}%` }} /></div>
      <p className="text-xs text-stone-400" role="status">{t(progress < 50 ? "xp_loading_1" : "xp_loading_2")}</p>
    </div>
  );

  if (phase === "crash") return (
    <div className="flex min-h-80 flex-col items-start gap-5 rounded-lg bg-blue-900 p-6 font-mono text-sm leading-relaxed text-white">
      <p className="text-xl font-bold">:(</p>
      <p>{t("egg_xp_crash")}</p>
      <p className="break-all text-blue-200">STOP: 0x00000042<br />COFFEE_NOT_FOUND</p>
      <p className="text-xs text-blue-200">{t("egg_xp_crash_notice")}</p>
      <button type="button" onClick={reboot} className="mt-auto flex min-h-11 items-center gap-2 rounded border border-white/60 px-4 py-2 hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"><RotateCcw size={15} aria-hidden="true" />{t("egg_xp_reboot")}</button>
    </div>
  );

  return (
    <div className="relative flex min-h-80 flex-col overflow-hidden rounded-lg border border-blue-900 bg-blue-700 font-sans text-white">
      <div className="flex flex-1 flex-wrap content-start gap-4 bg-[linear-gradient(160deg,#2d72bd_0%,#417eaf_45%,#487c3a_46%,#305e29_100%)] p-5 pb-12 sm:min-h-80">
        <button type="button" onClick={() => setNotepad(true)} className="flex w-24 flex-col items-center gap-2 rounded p-2 text-center text-xs drop-shadow hover:bg-white/15 focus-visible:outline-2 focus-visible:outline-white"><FileText size={32} aria-hidden="true" />{t("egg_xp_notepad")}</button>
        <button type="button" onClick={() => onEggChange("profile")} className="flex w-24 flex-col items-center gap-2 rounded p-2 text-center text-xs drop-shadow hover:bg-white/15 focus-visible:outline-2 focus-visible:outline-white"><Folder size={32} className="text-amber-200" aria-hidden="true" />{t("egg_xp_profile")}</button>
        {notepad && <div className="absolute inset-x-3 top-5 z-10 overflow-hidden rounded-t-md border border-blue-950 bg-[#f6f2e9] text-stone-950 shadow-xl sm:inset-x-10">
          <div className="flex items-center justify-between gap-3 bg-blue-800 px-3 py-2 text-xs font-semibold text-white"><span>about.txt · {t("egg_xp_notepad")}</span><button type="button" onClick={() => setNotepad(false)} aria-label={t("egg_xp_close_notepad")} className="rounded bg-red-700 p-1 hover:bg-red-600 focus-visible:outline-2 focus-visible:outline-white"><X size={14} aria-hidden="true" /></button></div>
          <div className="space-y-3 p-4 font-mono text-xs leading-relaxed"><p>Corentin Megret</p><p>{t("whoami_description")}</p><p>{t("egg_xp_notepad_note")}</p></div>
        </div>}
      </div>
      <div className="flex items-center justify-between gap-3 bg-blue-900 p-2 text-xs">
        <button type="button" onClick={() => { setPhase("crash"); playSound("/sounds/windows-xp-critical-stop.wav"); }} className="rounded bg-green-700 px-3 py-2 font-semibold hover:bg-green-600 focus-visible:outline-2 focus-visible:outline-white">{t("egg_xp_crash_button")}</button>
        <span className="pr-1 text-blue-200">{t("egg_xp_desktop_hint")}</span>
      </div>
    </div>
  );
}

const credits = [
  ["Next.js / React", "egg_credits_framework", "https://nextjs.org"],
  ["TypeScript", "egg_credits_types", "https://www.typescriptlang.org"],
  ["Tailwind CSS", "egg_credits_style", "https://tailwindcss.com"],
  ["Framer Motion", "egg_credits_motion", "https://www.framer.com/motion/"],
  ["next-intl", "egg_credits_languages", "https://next-intl.dev"],
  ["Radix / cmdk", "egg_credits_keyboard", "https://www.radix-ui.com"],
  ["Lucide", "egg_credits_icons", "https://lucide.dev"],
  ["Vercel", "egg_credits_hosting", "https://vercel.com"],
] as const;

export function CreditsScene({ t, reducedMotion }: SceneProps) {
  return (
    <div className="rounded-lg bg-stone-950 px-5 py-7 text-stone-100 sm:px-8">
      <p className="mb-2 text-center text-xs uppercase tracking-[0.2em] text-stone-400">{t("credits_powered_by")}</p>
      <p className="mb-7 text-center text-2xl font-semibold">{t("egg_credits_title")}</p>
      <div className="space-y-3">
        {credits.map(([name, role, url], index) => <motion.div key={name} initial={reducedMotion ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reducedMotion ? 0 : 0.25, delay: reducedMotion ? 0 : index * 0.06 }} className="flex flex-wrap items-baseline justify-between gap-x-5 gap-y-1 border-b border-stone-800 pb-3 text-sm"><a href={url} target="_blank" rel="noreferrer" className="font-medium underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-stone-100">{name}</a><span className="text-xs text-stone-400">{t(role)}</span></motion.div>)}
      </div>
      <p className="mt-7 text-center text-sm">Corentin Megret</p>
      <p className="mt-2 text-center text-xs text-stone-400">{t("egg_credits_end")}</p>
    </div>
  );
}

const snippets = {
  Python: 'print("Hello, World!")',
  C: '#include <stdio.h>\n\nint main(void) {\n    printf("Hello, World!\\n");\n    return 0;\n}',
  "C++": '#include <iostream>\n\nint main() {\n    std::cout << "Hello, World!" << std::endl;\n    return 0;\n}',
  JavaScript: 'console.log("Hello, World!");',
  Go: 'package main\n\nimport "fmt"\n\nfunc main() {\n    fmt.Println("Hello, World!")\n}',
} as const;

export function HelloScene({ t }: SceneProps) {
  const [language, setLanguage] = useState<keyof typeof snippets>("Python");
  const [copyState, setCopyState] = useState<"idle" | "copied" | "failed">("idle");
  const copyGeneration = useRef(0);

  useEffect(() => () => { copyGeneration.current += 1; }, []);

  const copy = async () => {
    const request = ++copyGeneration.current;
    setCopyState("idle");
    try {
      if (!navigator.clipboard) throw new Error("Clipboard unavailable");
      await navigator.clipboard.writeText(snippets[language]);
      if (request === copyGeneration.current) setCopyState("copied");
    } catch {
      if (request === copyGeneration.current) setCopyState("failed");
    }
  };

  return (
    <div className="overflow-hidden rounded-lg border border-stone-700 bg-stone-950 text-stone-100">
      <div className="flex flex-wrap gap-1 border-b border-stone-800 p-3" role="group" aria-label={t("egg_hello_languages")}>
        {(Object.keys(snippets) as (keyof typeof snippets)[]).map((name) => <button key={name} type="button" aria-pressed={language === name} onClick={() => { copyGeneration.current += 1; setLanguage(name); setCopyState("idle"); }} className={`min-h-10 rounded-md px-3 py-2 text-xs font-medium focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-stone-100 ${language === name ? "bg-stone-100 text-stone-950" : "text-stone-400 hover:bg-stone-800 hover:text-white"}`}>{name}</button>)}
      </div>
      <div className="flex items-center justify-between gap-3 px-5 pt-4 text-xs text-stone-400"><span>{t("egg_hello_intro")}</span><button type="button" onClick={copy} className="flex min-h-10 items-center gap-2 rounded px-2 text-stone-200 hover:bg-stone-800 focus-visible:outline-2 focus-visible:outline-stone-100">{copyState === "copied" ? <Check size={14} aria-hidden="true" /> : <Copy size={14} aria-hidden="true" />}{t(copyState === "copied" ? "egg_hello_copied" : "egg_hello_copy")}</button></div>
      <pre className="min-h-40 overflow-x-auto p-5 font-mono text-sm leading-7 text-emerald-300" tabIndex={0} aria-label={t("egg_hello_code")}><code>{snippets[language]}</code></pre>
      <div className="border-t border-stone-800 bg-stone-900/40 px-5 py-4 font-mono text-sm"><p className="mb-2 text-xs text-stone-500">{t("egg_hello_output")}</p><p>Hello, World!</p></div>
      <p role="status" className="px-5 py-3 text-xs text-stone-400">{t(copyState === "failed" ? "egg_hello_copy_failed" : "egg_hello_note")}</p>
    </div>
  );
}
