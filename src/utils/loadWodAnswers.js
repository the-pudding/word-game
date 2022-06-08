import loadCSV from '$utils/loadCsv.js';

export default async function loadAnswers(id) {
	const url = `https://pudding.cool/projects/word-game-data/wod-answers/${id}.csv?version=${Date.now()}`;
	const raw = await loadCSV(url);
	const data = raw.map(d => ({
		...d,
		round: +d.round,
		timestamp: +d.timestamp,
		points: +d.points,
	}));
	return data;
};