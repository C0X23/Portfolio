export type TerminalTranslator = (key: string) => string;

export type TerminalResolution =
  | { kind: "empty" }
  | { kind: "clear"; command: string }
  | { kind: "navigate"; command: string; egg: "coffee" | "xp" }
  | { kind: "output"; command: string; output: string[] };

export function resolveTerminalCommand(raw: string, t: TerminalTranslator): TerminalResolution {
  const command = raw.trim();
  const normalized = command.toLowerCase().replace(/\s+/g, " ");
  if (!normalized) return { kind: "empty" };
  if (normalized === "clear") return { kind: "clear", command };
  if (normalized === "coffee" || normalized === "xp") return { kind: "navigate", command, egg: normalized };

  const profile = ["Corentin Megret", t("whoami_description"), t("whoami_uptime")];
  const outputs = new Map<string, string[]>([
    ["help", ["whoami · profile · stack · projects · coffee · xp · clear", t("egg_terminal_help")]],
    ["whoami", ["uid=1337(corentin) gid=42(42-lausanne)", `groups=${t("whoami_groups")}`]],
    ["profile", profile],
    ["show profile", profile],
    ["stack", ["Python / Django / Django REST Framework", "PostgreSQL / Redis / Celery", "pytest / GitHub Actions / Docker / Linux", "C / C++ / Unix (42 Lausanne)"]],
    ["projects", [t("egg_terminal_arcom"), t("egg_terminal_arven"), t("egg_terminal_minishell")]],
    ["sudo", [t("egg_terminal_sudo")]],
  ]);
  return { kind: "output", command, output: outputs.get(normalized) ?? [t("egg_terminal_unknown")] };
}
