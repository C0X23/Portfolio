import test from 'node:test';
import assert from 'node:assert/strict';
import { loadTypeScript } from './load-typescript.mjs';
const menu = await loadTypeScript(new URL('../src/lib/command-menu-events.ts', import.meta.url));

test('a request before the lazy menu subscribes is retained', () => {
  menu.setCommandMenuOpen(false);
  menu.requestCommandMenu();
  let notifications = 0;
  const unsubscribe = menu.subscribeCommandMenu(() => notifications++);
  assert.equal(menu.getCommandMenuOpen(), true);
  assert.equal(menu.getServerCommandMenuOpen(), false);
  menu.setCommandMenuOpen(value => !value);
  assert.equal(menu.getCommandMenuOpen(), false);
  assert.equal(notifications, 1);
  unsubscribe();
  menu.requestCommandMenu();
  assert.equal(notifications, 1);
  menu.setCommandMenuOpen(false);
});
