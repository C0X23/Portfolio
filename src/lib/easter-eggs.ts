export const EASTER_EGG_IDS = [
  "profile", "coffee", "flip", "retro", "whoami", "credits", "hello", "xp", "thanos",
] as const;

export type EasterEggId = (typeof EASTER_EGG_IDS)[number];

export function isEasterEggId(value: string): value is EasterEggId {
  return EASTER_EGG_IDS.some((id) => id === value);
}

const KONAMI = ["arrowup", "arrowup", "arrowdown", "arrowdown", "arrowleft", "arrowright", "arrowleft", "arrowright", "b", "a"];

/** Keep the longest matching prefix, including overlapping arrow sequences. */
export function advanceKonami(progress: number, key: string) {
  const entered = [...KONAMI.slice(0, progress), key.toLowerCase()];
  for (let length = Math.min(entered.length, KONAMI.length); length > 0; length--) {
    if (KONAMI.slice(0, length).every((value, index) => value === entered[entered.length - length + index])) {
      return { progress: length === KONAMI.length ? 0 : length, unlocked: length === KONAMI.length };
    }
  }
  return { progress: 0, unlocked: false };
}

type EggAudio = Pick<HTMLAudioElement, "play" | "pause" | "currentTime" | "volume">;

/** A scene owns one audio channel. Closing it also cancels any pending playback. */
export function createEggAudioPlayer(factory: (src: string) => EggAudio = (src) => new Audio(src)) {
  let current: EggAudio | null = null;
  let disposed = false;
  let generation = 0;
  let timer: ReturnType<typeof setTimeout> | null = null;
  const stop = () => {
    generation++;
    if (timer !== null) clearTimeout(timer);
    timer = null;
    current?.pause();
    if (current) current.currentTime = 0;
    current = null;
  };
  return {
    async play(src: string, durationMs?: number) {
      if (disposed) return "cancelled" as const;
      stop();
      const token = generation;
      const audio = factory(src);
      current = audio;
      audio.volume = 0.35;
      try {
        await audio.play();
        if (disposed || token !== generation) {
          audio.pause();
          audio.currentTime = 0;
          return "cancelled" as const;
        }
        if (durationMs !== undefined) timer = setTimeout(() => { if (token === generation) stop(); }, durationMs);
        return "played" as const;
      } catch {
        if (disposed || token !== generation) return "cancelled" as const;
        if (current === audio) stop();
        return "unavailable" as const;
      }
    },
    stop,
    dispose() { disposed = true; stop(); },
  };
}
