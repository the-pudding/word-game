import { writable, derived } from "svelte/store";
// your score, opponent score

const ROUNDS = 3;

export const active = writable(false);
export const round = writable(-1);

export const gameState = derived([round, active], ([$round, $active], set) => {
	if ($round >= ROUNDS - 1 && !$active) set("post");
	else if (!$active && $round === -1) set("pre");
	else set("mid");
});

export const roundScore = writable(0);
export const gameScore = writable(0);

export const guesses = writable([]);