const lemmaExists = ({ lemmas, corpus }) => {
	const filtered = lemmas.split("|").filter(l => {
		return !!corpus.find(c => c === l);
	});

	return !!filtered.length;
};

export default lemmaExists;
