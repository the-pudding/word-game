import loadCSV from "$utils/loadCsv.js";

export default async function loadWodInfo(id) {
	const url = `https://pudding.cool/games/words-against-strangers-data/wod-info/${id}.csv?version=${Date.now()}`;
	const raw = await loadCSV(url);
	return raw;
}
