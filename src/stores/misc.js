import { writable, derived } from "svelte/store";
import { sum } from "d3";

export const ROUNDS = 2;

const getScore = (data) => {
	const firsts = data.filter((d) => d.first);
	const total = sum(firsts, (d) => d.points);
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
	const a = $guesses.user.filter(d => d.first).map(d => d.text);
	const b = $guesses.opponent.filter(d => d.first).map(d => d.text);
	const joined = [...a, ...b];
	set(joined);
});