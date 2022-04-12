import { writable, derived } from "svelte/store";
import { sum, range } from "d3";

export const ROUNDS = 4;

const createEmptyRounds = () => range(ROUNDS).map(() => []);

const sumRound = (roundGuesses) =>
  sum(
    roundGuesses.filter((d) => d.valid),
    (d) => d.points
  );

export const active = writable(false);
export const round = writable(-1);

export const gameState = derived([round, active], ([$round, $active], set) => {
  if ($round >= ROUNDS - 1 && !$active) set("post");
  else if (!$active && $round === -1) set("pre");
  else set("mid");
});

export const guesses = writable({ user: createEmptyRounds(), opponent: createEmptyRounds() });
export const score = derived(guesses, ($guesses, set) => {
  const userScores = $guesses.user.map(sumRound);
  const opponentScores = $guesses.opponent.map(sumRound);
  set({ user: userScores, opponent: opponentScores });
});

export const wordsPlayed = derived([guesses, round], ([$guesses, $round], set) => {
  if ($round < 0) return;

  const a = $guesses.user[$round].filter((d) => d.valid).map((d) => d.text);
  const b = $guesses.opponent[$round].filter((d) => d.valid).map((d) => d.text);
  const joined = [...a, ...b];
  set(joined);
});
