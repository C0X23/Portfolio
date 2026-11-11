export const OPEN_COMMAND_MENU_EVENT = "portfolio:open-command-menu";

// Keep a click made while the client-only command menu is still loading.
let open = false;
const listeners = new Set<() => void>();
export const getCommandMenuOpen = () => open;
export const getServerCommandMenuOpen = () => false;
export function subscribeCommandMenu(listener: () => void) {
  listeners.add(listener);
  return () => { listeners.delete(listener); };
}
export function setCommandMenuOpen(value: boolean | ((current: boolean) => boolean)) {
  const next = typeof value === "function" ? value(open) : value;
  if (next === open) return;
  open = next;
  listeners.forEach((listener) => listener());
}
export function requestCommandMenu() {
  setCommandMenuOpen(true);
  if (typeof document !== "undefined") document.dispatchEvent(new CustomEvent(OPEN_COMMAND_MENU_EVENT));
}
