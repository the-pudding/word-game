import loadCSV from '$utils/loadCsv.js';

export default async function loadAnswers(id) {
	const url = `https://pudding.cool/projects/word-game-data/wod-info/${id}.csv?version=${Date.now()}`;
	const raw = await loadCSV(url);
	return raw;
};