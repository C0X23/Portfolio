import assert from "node:assert/strict";
import test from "node:test";
import { loadTypeScript } from "./load-typescript.mjs";

const { resolveTerminalCommand } = await loadTypeScript(new URL("../src/lib/easter-egg-terminal.ts", import.meta.url));

const t = (key) => key;

for (const command of ["constructor", "__proto__", "toString"]) {
  test(`prototype name ${command} is an unknown command with renderable output`, () => {
    const result = resolveTerminalCommand(command, t);
    assert.deepEqual(result, { kind: "output", command, output: ["egg_terminal_unknown"] });
    assert.doesNotThrow(() => result.output.map(String));
  });
}

test("normalizes case and spacing while keeping the typed command for the transcript", () => {
  const result = resolveTerminalCommand("  ShOw \t PrOFiLe\n", t);
  assert.deepEqual(result, {
    kind: "output",
    command: "ShOw \t PrOFiLe",
    output: ["Corentin Megret", "whoami_description", "whoami_uptime"],
  });
});

test("blank input produces no command or transcript entry", () => {
  assert.deepEqual(resolveTerminalCommand(" \t\n ", t), { kind: "empty" });
});

test("clear is a dedicated action", () => {
  assert.deepEqual(resolveTerminalCommand(" CLEAR ", t), { kind: "clear", command: "CLEAR" });
});

test("coffee and xp request navigation only for their exact normalized commands", () => {
  assert.deepEqual(resolveTerminalCommand(" COFFEE ", t), { kind: "navigate", command: "COFFEE", egg: "coffee" });
  assert.deepEqual(resolveTerminalCommand("xp", t), { kind: "navigate", command: "xp", egg: "xp" });
  assert.equal(resolveTerminalCommand("xp reboot", t).kind, "output");
});

test("every advertised display command returns a nonempty list of strings", () => {
  for (const command of ["help", "whoami", "profile", "show profile", "stack", "projects", "sudo"]) {
    const result = resolveTerminalCommand(command, t);
    assert.equal(result.kind, "output");
    assert.ok(result.output.length > 0);
    assert.ok(result.output.every((line) => typeof line === "string"));
  }
});

test("shell syntax and executable-looking text remain inert unknown commands", () => {
  globalThis.__terminalProbe = 0;
  try {
    for (const command of ["whoami; coffee", "xp && coffee", "$(coffee)", "`xp`", "rm -rf /", "globalThis.__terminalProbe = 1", "<script>coffee()</script>"]) {
      assert.deepEqual(resolveTerminalCommand(command, t), {
        kind: "output", command, output: ["egg_terminal_unknown"],
      });
    }
    assert.equal(globalThis.__terminalProbe, 0);
  } finally {
    delete globalThis.__terminalProbe;
  }
});
