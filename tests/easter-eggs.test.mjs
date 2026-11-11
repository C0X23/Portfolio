import test from 'node:test';
import assert from 'node:assert/strict';
import { loadTypeScript } from './load-typescript.mjs';
const { advanceKonami, createEggAudioPlayer, isEasterEggId } = await loadTypeScript(new URL('../src/lib/easter-eggs.ts', import.meta.url));

test('secret sequence tolerates overlapping arrows and resets after unlock', () => {
  let state = { progress: 0, unlocked: false };
  for (const key of ['ArrowUp', 'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'B', 'A']) {
    state = advanceKonami(state.progress, key);
  }
  assert.deepEqual(state, { progress: 0, unlocked: true });
  assert.deepEqual(advanceKonami(4, 'x'), { progress: 0, unlocked: false });
});

test('unknown scene names cannot become active scenes', () => {
  assert.equal(isEasterEggId('xp'), true);
  assert.equal(isEasterEggId('__proto__'), false);
  assert.equal(isEasterEggId('constructor'), false);
});

function fakeAudio(play = () => Promise.resolve()) {
  return { play, paused: 0, pause() { this.paused++; }, currentTime: 12, volume: 1 };
}

test('a new sound stops the previous sound; closing stops the current sound', async () => {
  const sounds = [];
  const player = createEggAudioPlayer(() => { const audio = fakeAudio(); sounds.push(audio); return audio; });
  assert.equal(await player.play('typing'), 'played');
  assert.equal(await player.play('coffee'), 'played');
  assert.equal(sounds[0].paused, 1);
  assert.equal(sounds[0].currentTime, 0);
  player.dispose();
  assert.equal(sounds[1].paused, 1);
  assert.equal(await player.play('xp'), 'cancelled');
  assert.equal(sounds.length, 2);
});

test('playback resolving after close cannot restart a dismissed scene', async () => {
  let finish;
  const audio = fakeAudio(() => new Promise(resolve => { finish = resolve; }));
  const player = createEggAudioPlayer(() => audio);
  const playback = player.play('xp');
  player.dispose();
  finish();
  assert.equal(await playback, 'cancelled');
  assert.equal(audio.currentTime, 0);
  assert.ok(audio.paused >= 1);
});

test('blocked or missing audio fails without an unhandled rejection', async () => {
  const audio = fakeAudio(() => Promise.reject(new Error('NotAllowedError')));
  const player = createEggAudioPlayer(() => audio);
  assert.equal(await player.play('blocked'), 'unavailable');
  assert.equal(audio.paused, 1);
  player.dispose();
});

test('typing audio stops at the snippet boundary without waiting for a scene close', async () => {
  const audio = fakeAudio();
  const player = createEggAudioPlayer(() => audio);
  await player.play('typing', 5);
  await new Promise(resolve => setTimeout(resolve, 15));
  assert.equal(audio.paused, 1);
  assert.equal(audio.currentTime, 0);
  player.dispose();
});
