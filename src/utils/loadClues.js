import { ascending } from 'd3';
import loadCSV from '$utils/loadCsv.js';

export default async function loadClues(id) {
	const url = `https://pudding.cool/games/words-against-strangers-data/game-clues/${id}.csv?version=${Date.now()}`;
	const raw = await loadCSV(url);
	const data = raw.map(d => ({
		...d,
		round: + d.round
	}));

	data.sort((a, b) => ascending(a.round, b.round));
	return data;
};