import { writable, derived } from "svelte/store";
import { sum } from "d3";

export const ROUNDS = 4;

const getScore = (data) => {
  const valid = data.filter((d) => d.valid);
  const total = sum(valid, (d) => d.points);
  return total;
};

export const active = writable(false);
export const round = writable(-1);

export const gameState = derived([round, active], ([$round, $active], set) => {
  if ($round >= ROUNDS - 1 && !$active) set("post");
  else if (!$active && $round === -1) set("pre");
  else set("mid");
});

export const guesses = writable({ user: [], opponent: [] });
export const history = writable([]);

export const roundScore = derived(guesses, ($guesses, set) => {
  const user = getScore($guesses.user);
  const opponent = getScore($guesses.opponent);
  set({ user, opponent });
});

export const gameScore = writable({ user: 0, opponent: 0 });

export const wordsPlayed = derived(guesses, ($guesses, set) => {
  const a = $guesses.user.filter((d) => d.valid).map((d) => d.text);
  const b = $guesses.opponent.filter((d) => d.valid).map((d) => d.text);
  const joined = [...a, ...b];
  set(joined);
});
