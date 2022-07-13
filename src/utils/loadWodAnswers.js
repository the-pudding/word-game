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
	const extra = ["abolitionary", "accreditable", "adscititious", "adventitious", "alliterative", "altitudinous", "ambitionless", "anorthositic", "antiliterary", "antiliterate", "antimilitary", "antimosquito", "antipolitics", "antirachitic"];
	extra.forEach((e, i) => data.push({
		round: 0,
		text: e,
		lemmas: e,
		timestamp: i * 1000,
		points: 1
	}));
	console.log(data);
	return data;
};