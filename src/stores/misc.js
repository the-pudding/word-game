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

export const possibleAnswers = writable([]);

export const roundScore = derived(guesses, ($guesses, set) => {
	const user = $guesses.user.map(sumRound);
	const opponent = $guesses.opponent.map(sumRound);
	set({ user, opponent });
});

export const totalScore = derived(roundScore, ($roundScore, set) => {
	const user = sum($roundScore.user);
	const opponent = sum($roundScore.opponent);
	set({ user, opponent });
});

const flatten = (arr) => [].concat(...arr);
const getFlattenedLemmas = ({ data, opponent }) => {
	const raw = data.filter((d) => d.valid).map((d) => d.lemmas.split("|"))
	const flat = flatten(raw).map(text => ({ text, opponent }));
	return flat;
};

export const lemmasPlayed = derived([guesses, round], ([$guesses, $round], set) => {
	if ($round < 0) return;

	const a = getFlattenedLemmas({ data: $guesses.user[$round], opponent: false });
	const b = getFlattenedLemmas({ data: $guesses.opponent[$round], opponent: true });
	const joined = [...a, ...b];
	set(joined);
});
