import { writable, derived } from "svelte/store";
// your score, opponent score
// time elapsed/remaining

const ROUNDS = 3;

export const active = writable(false);
export const round = writable(-1);

export const gameState = derived([round, active], ([$round, $active], set) => {
	console.log($round, $active);
	if ($round >= ROUNDS && !$active) set("post");
	else if (!$active && $round === -1) set("pre");
	else set("mid");
});
