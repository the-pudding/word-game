import loadCSV from '$utils/loadCsv.js';

export default async function loadAnswers(clueIds) {
	const output = [];
	for (let id of clueIds) {
		const url = `https://pudding.cool/games/words-against-strangers-data/clue-answers/${id}.csv?version=${Date.now()}`;
		const raw = await loadCSV(url);
		const data = raw.map(d => ({
			...d,
			points: +d.points
		}));
		output.push(data);
	}
	return output;

};