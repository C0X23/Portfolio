"use client";

import * as React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { motion, useReducedMotion } from "framer-motion";
import { RotateCcw, Shuffle, Volume2, VolumeX, X, Terminal, Coffee, Tv, User, Film, Globe, Monitor, Sparkles } from "lucide-react";
import { useTranslations } from "next-intl";
import { createEggAudioPlayer, EASTER_EGG_IDS, isEasterEggId, type EasterEggId } from "@/lib/easter-eggs";
import { CoffeeScene, CreditsScene, HelloScene, TerminalScene, XpScene, type SceneProps } from "./easter-egg-scenes";
import styles from "./easter-eggs.module.css";

export const EGG_COMMANDS = [
  { id: "profile", command: "show profile", icon: Terminal, keywords: ["terminal", "hacker", "sudo", "profil"] },
  { id: "coffee", command: "coffee", icon: Coffee, keywords: ["cafe", "café", "caffeine"] },
  { id: "flip", command: "flip", icon: RotateCcw, keywords: ["rotate", "carte", "retourner"] },
  { id: "retro", command: "retro", icon: Tv, keywords: ["crt", "vintage", "console"] },
  { id: "whoami", command: "whoami", icon: User, keywords: ["corentin", "about", "identité"] },
  { id: "credits", command: "credits", icon: Film, keywords: ["générique", "stack", "cast"] },
  { id: "hello", command: "hello", icon: Globe, keywords: ["world", "bonjour", "code"] },
  { id: "xp", command: "xp", icon: Monitor, keywords: ["windows", "boot", "nostalgie"] },
  { id: "thanos", command: "thanos", icon: Sparkles, keywords: ["snap", "avengers", "claquement"] },
] as const;

const controlClass = "inline-flex min-h-10 items-center justify-center gap-2 rounded-lg border border-stone-200 px-3 py-2 text-xs font-medium text-stone-700 transition-colors hover:bg-stone-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 dark:border-stone-700 dark:text-stone-200 dark:hover:bg-stone-800";

export function EasterEggDialog({ id, onClose, onChange, onRestoreFocus }: {
  id: EasterEggId;
  onClose: () => void;
  onChange: (id: EasterEggId) => void;
  onRestoreFocus: () => void;
}) {
  const t = useTranslations("CommandMenu");
  const reducedMotion = useReducedMotion() ?? false;
  const [replay, setReplay] = React.useState(0);
  const [soundEnabled, setSoundEnabled] = React.useState(false);
  const [soundUnavailable, setSoundUnavailable] = React.useState(false);
  const enabledRef = React.useRef(false);
  const audioRef = React.useRef<ReturnType<typeof createEggAudioPlayer> | null>(null);
  const sceneRef = React.useRef<HTMLDivElement>(null);
  const dialogRef = React.useRef<HTMLDivElement>(null);
  const focusScene = React.useCallback(() => {
    const target = sceneRef.current?.querySelector<HTMLElement>('input, button, [tabindex="0"]');
    (target ?? dialogRef.current)?.focus({ preventScroll: true });
  }, []);

  React.useEffect(() => { focusScene(); }, [id, replay, focusScene]);

  React.useEffect(() => {
    const player = createEggAudioPlayer();
    audioRef.current = player;
    return () => { player.dispose(); audioRef.current = null; };
  }, []);

  const playSound = React.useCallback((src: string) => {
    const player = audioRef.current;
    if (!enabledRef.current || !player) return;
    void player.play(src, src === "/sounds/typing-keyboard.mp3" ? 450 : undefined).then((result) => {
      if (result === "unavailable" && enabledRef.current && audioRef.current === player) setSoundUnavailable(true);
    });
  }, []);

  function changeScene(next: string) {
    if (!isEasterEggId(next)) return;
    audioRef.current?.stop();
    setSoundUnavailable(false);
    onChange(next);
  }

  function toggleSound() {
    const enabled = !soundEnabled;
    enabledRef.current = enabled;
    setSoundEnabled(enabled);
    setSoundUnavailable(false);
    if (!enabled) audioRef.current?.stop();
    else {
      // A short preview also unlocks audio during this explicit user gesture.
      playSound("/sounds/typing-keyboard.mp3");
    }
  }

  const props: SceneProps = { t, reducedMotion, onClose, onEggChange: changeScene, playSound };
  const current = EGG_COMMANDS.find((egg) => egg.id === id)!;
  const Icon = current.icon;

  return (
    <Dialog.Root open onOpenChange={(open) => { if (!open) onClose(); }}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[10000] bg-stone-950/70 backdrop-blur-sm" />
        <Dialog.Content
          ref={dialogRef}
          data-easter-egg={id}
          data-lenis-prevent
          onOpenAutoFocus={(event) => { event.preventDefault(); focusScene(); }}
          onCloseAutoFocus={(event) => { event.preventDefault(); onRestoreFocus(); }}
          className="fixed left-1/2 top-1/2 z-[10001] flex max-h-[calc(100dvh_-_2rem)] w-[calc(100%_-_2rem)] max-w-3xl -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden rounded-2xl border border-stone-200 bg-white text-stone-900 shadow-2xl focus:outline-none dark:border-stone-700 dark:bg-stone-950 dark:text-stone-100"
        >
          <header className="flex shrink-0 items-start gap-3 border-b border-stone-200 px-4 py-4 sm:px-6 dark:border-stone-800">
            <Icon aria-hidden className="mt-1 h-5 w-5 shrink-0 text-blue-600 dark:text-blue-400" />
            <div className="min-w-0 flex-1">
              <Dialog.Title className="text-base font-semibold">{t("egg_title_" + id)}</Dialog.Title>
              <Dialog.Description className="mt-1 text-sm text-stone-500 dark:text-stone-400">{t("egg_description_" + id)}</Dialog.Description>
            </div>
            <Dialog.Close className={controlClass + " shrink-0 px-2.5"} aria-label={t("egg_close")}>
              <X aria-hidden className="h-4 w-4" />
            </Dialog.Close>
          </header>
          <div ref={sceneRef} key={id + replay} className="min-h-0 overflow-y-auto overscroll-contain p-4 sm:p-6" data-lenis-prevent>
            {(id === "profile" || id === "whoami") && <TerminalScene {...props} initialCommand={id} />}
            {id === "coffee" && <CoffeeScene {...props} />}
            {id === "xp" && <XpScene {...props} />}
            {id === "credits" && <CreditsScene {...props} />}
            {id === "hello" && <HelloScene {...props} />}
            {id === "flip" && <FlipScene {...props} />}
            {id === "retro" && <RetroScene {...props} />}
            {id === "thanos" && <SnapScene {...props} />}
          </div>
          <footer className="flex shrink-0 flex-wrap items-center gap-2 border-t border-stone-200 px-4 py-3 sm:px-6 dark:border-stone-800">
            <button type="button" className={controlClass} onClick={() => { audioRef.current?.stop(); setReplay((value) => value + 1); }}>
              <RotateCcw aria-hidden className="h-3.5 w-3.5" />{t("egg_replay")}
            </button>
            <button type="button" className={controlClass} onClick={() => {
              const others = EASTER_EGG_IDS.filter((value) => value !== id);
              changeScene(others[Math.floor(Math.random() * others.length)]);
            }}>
              <Shuffle aria-hidden className="h-3.5 w-3.5" />{t("egg_surprise")}
            </button>
            <button type="button" className={controlClass} aria-pressed={soundEnabled} onClick={toggleSound}>
              {soundEnabled ? <Volume2 aria-hidden className="h-3.5 w-3.5" /> : <VolumeX aria-hidden className="h-3.5 w-3.5" />}
              {t(soundEnabled ? "egg_sound_on" : "egg_sound_off")}
            </button>
            <span className="ml-auto text-xs text-stone-500" aria-live="polite">{soundUnavailable ? t("egg_sound_unavailable") : t("egg_escape")}</span>
          </footer>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

function FlipScene({ t, reducedMotion }: SceneProps) {
  const [turns, setTurns] = React.useState(0);
  const back = turns % 2 === 1;
  return (
    <div className="flex flex-col items-center gap-6 py-4 sm:py-8">
      <div className="w-full max-w-sm" style={{ perspective: 1000 }}>
        <motion.button
          type="button"
          aria-label={t("egg_flip_card")}
          aria-pressed={back}
          onClick={() => setTurns((value) => value + 1)}
          animate={{ rotateY: reducedMotion ? 0 : turns * 180 }}
          transition={reducedMotion ? { duration: 0 } : { type: "spring", stiffness: 90, damping: 17 }}
          className="relative h-56 w-full rounded-2xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-500"
          style={{ transformStyle: "preserve-3d" }}
        >
          <div aria-hidden={back} className="absolute inset-0 flex flex-col justify-between rounded-2xl border border-stone-700 bg-stone-900 p-6 text-left text-stone-100" style={{ backfaceVisibility: "hidden", visibility: reducedMotion && back ? "hidden" : undefined }}>
            <span className="font-mono text-xs text-stone-400">corentin.dev</span>
            <div><span className="text-3xl font-semibold tracking-tight">Corentin Megret</span><p className="mt-2 text-sm text-stone-400">Python · Django · Unix</p></div>
            <span className="font-mono text-xs text-blue-300">{t("egg_flip_front")}</span>
          </div>
          <div aria-hidden={!back} className="absolute inset-0 flex flex-col justify-between rounded-2xl border border-blue-800 bg-blue-950 p-6 text-left text-blue-100" style={{ backfaceVisibility: "hidden", transform: reducedMotion ? undefined : "rotateY(180deg)", visibility: reducedMotion && !back ? "hidden" : undefined }}>
            <span className="font-mono text-xs text-blue-300">return 42;</span>
            <p className="text-2xl font-medium leading-tight">{t("egg_flip_back")}</p>
            <span className="font-mono text-xs text-blue-300">{t("egg_flip_again")}</span>
          </div>
        </motion.button>
      </div>
      <p className="text-center text-sm text-stone-500">{t("egg_flip_hint")}</p>
    </div>
  );
}

function RetroScene({ t, reducedMotion }: SceneProps) {
  const [color, setColor] = React.useState("green");
  const [scanlines, setScanlines] = React.useState(true);
  const palettes = [
    { id: "green", label: t("egg_retro_green"), value: "#86efac" },
    { id: "amber", label: t("egg_retro_amber"), value: "#fcd34d" },
    { id: "ice", label: t("egg_retro_ice"), value: "#a5f3fc" },
  ];
  const phosphor = palettes.find((palette) => palette.id === color)!.value;
  return (
    <div className="space-y-5">
      <div className={styles.crt + (scanlines ? " " + styles.scanlines : "")} style={{ color: phosphor, textShadow: reducedMotion ? "none" : "0 0 12px currentColor" }}>
        <div className="flex justify-between border-b border-current pb-3 text-xs opacity-70"><span>CM-42 / MONOCHROME</span><span>80 × 24</span></div>
        <pre className="my-6 overflow-hidden text-[10px] leading-tight sm:text-sm" aria-hidden>{"   ____ ___  ____  _____ _   _ _____ ___ _   _\n  / ___/ _ \\|  _ \\| ____| \\ | |_   _|_ _| \\ | |\n | |  | | | | |_) |  _| |  \\| | | |  | ||  \\| |\n | |__| |_| |  _ <| |___| |\\  | | |  | || |\\  |\n  \\____\\___/|_| \\_\\_____|_| \\_| |_| |___|_| \\_|"}</pre>
        <p className="mb-2">PORTFOLIO SYSTEM READY.</p>
        <p className="mb-6 text-sm opacity-80">{t("egg_retro_ready")}</p>
        <p className="font-mono text-sm">&gt; Python / Django / 42 Lausanne<span aria-hidden className={reducedMotion ? "" : styles.cursor}> ▌</span></p>
      </div>
      <div className="flex flex-wrap items-center gap-2" role="group" aria-label={t("egg_retro_palette")}>
        {palettes.map((palette) => <button key={palette.id} type="button" className={controlClass} aria-pressed={color === palette.id} onClick={() => setColor(palette.id)}>{palette.label}</button>)}
        <label className="ml-auto flex cursor-pointer items-center gap-2 text-sm text-stone-500">
          <input type="checkbox" checked={scanlines} onChange={(event) => setScanlines(event.target.checked)} className="accent-blue-600" />{t("egg_retro_lines")}
        </label>
      </div>
    </div>
  );
}

function SnapScene({ t, reducedMotion }: SceneProps) {
  const [vanished, setVanished] = React.useState<number[]>([]);
  React.useEffect(() => {
    if (vanished.length === 0) return;
    const timer = window.setTimeout(() => setVanished([]), 5000);
    return () => window.clearTimeout(timer);
  }, [vanished]);
  const labels = ["Python", "Django", "PostgreSQL", "Redis", "Linux", "Docker", "C", "C++", "Git", "pytest", "Celery", "42"];
  function snap() {
    const positions = labels.map((_, index) => index);
    for (let index = positions.length - 1; index > 0; index--) {
      const swap = Math.floor(Math.random() * (index + 1));
      [positions[index], positions[swap]] = [positions[swap], positions[index]];
    }
    setVanished(positions.slice(0, 6));
  }
  return (
    <div className="space-y-6 py-2 text-center">
      <p className="font-serif text-xl text-stone-600 dark:text-stone-300">{t(vanished.length ? "thanos_ironman" : "thanos_quote")}</p>
      <div className="grid grid-cols-3 gap-3 sm:grid-cols-4" aria-hidden>
        {labels.map((label, index) => <motion.div key={label} className="relative flex h-20 items-center justify-center rounded-xl border border-stone-200 bg-stone-50 font-mono text-xs dark:border-stone-800 dark:bg-stone-900 sm:text-sm"
          animate={{ opacity: vanished.includes(index) ? 0 : 1, x: reducedMotion ? 0 : vanished.includes(index) ? 25 : 0, y: reducedMotion ? 0 : vanished.includes(index) ? -15 : 0, scale: reducedMotion ? 1 : vanished.includes(index) ? 0.8 : 1, filter: vanished.includes(index) && !reducedMotion ? "blur(5px)" : "blur(0px)" }}
          transition={{ duration: reducedMotion ? 0 : 0.8, delay: reducedMotion ? 0 : index * 0.035 }}>
          {label}
        </motion.div>)}
      </div>
      <p role="status" className="text-sm text-stone-500">{t(vanished.length ? "egg_snap_half" : "egg_snap_ready")}</p>
      <button type="button" className={controlClass} onClick={() => vanished.length ? setVanished([]) : snap()}>
        <Sparkles aria-hidden className="h-4 w-4" />{t(vanished.length ? "egg_snap_restore" : "egg_snap_action")}
      </button>
    </div>
  );
}
