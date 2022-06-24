import { writable, derived } from "svelte/store";
import { sum, range } from "d3";

export const ROUNDS = 4;

const createEmptyRounds = () => range(ROUNDS).map(() => []);

const sumRound = (roundGuesses) =>
	sum(
		roundGuesses.filter((d) => d.valid),
		(d) => d.points
	);

export const gameId = writable();
export const active = writable(false);
export const round = writable(-1);

export const gameState = derived([round, active], ([$round, $active], set) => {
	if ($round >= ROUNDS - 1 && !$active) set("post");
	else if (!$active && $round === -1) set("pre");
	else set("mid");
});

export const guesses = writable({ user: createEmptyRounds(), wod: createEmptyRounds() });

export const possibleAnswers = writable([]);

export const roundScore = derived(guesses, ($guesses, set) => {
	const user = $guesses.user.map(sumRound);
	const wod = $guesses.wod.map(sumRound);
	set({ user, wod });
});

export const totalScore = derived(roundScore, ($roundScore, set) => {
	const user = sum($roundScore.user);
	const wod = sum($roundScore.wod);
	set({ user, wod });
});

const flatten = (arr) => [].concat(...arr);
const getFlattenedLemmas = (data) => {
	const raw = data.filter((d) => d.valid).map((d) => d.lemmas.split("|"))
	return flatten(raw);
};

export const lemmasPlayed = derived([guesses, round], ([$guesses, $round], set) => {
	if ($round < 0) return;

	const a = getFlattenedLemmas($guesses.user[$round]);
	const b = getFlattenedLemmas($guesses.wod[$round]);
	const joined = [...a, ...b];
	set(joined);
});

export const overlay = writable(undefined);

export const wod = writable(undefined);
export const wodId = writable(undefined);