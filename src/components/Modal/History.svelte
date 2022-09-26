<script>
	import { onMount, tick } from "svelte";
	import storage from "$utils/localStorage.js";
	import Chunk from "$components/helpers/Chunk.svelte";
	let games;
	let wins;
	let ties;
	let losses;

	onMount(async () => {
		games = storage.get("pudding_words_against_strangers") || [];
		await tick();
		wins = games.filter((d) => d.margin > 0).length;
		ties = games.filter((d) => d.margin === 0).length;
		losses = games.filter((d) => d.margin < 0).length;
	});
</script>

<p>
	<Chunk text="your record" className="combo-default" />
</p>

<p id="chunk-record">
	<Chunk text="wins: {wins}" className="combo-user" />
	<Chunk text="ties: {ties}" className="combo-default" />
	<Chunk text="losses: {losses}" className="combo-wod" />
</p>

<style>
	#chunk-record {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin: 16px 0 32px 0;
	}

	:global(#chunk-record .chunk:nth-of-type(1)) {
		z-index: 3;
		transform: translate(-15%, 0) rotate(1deg);
	}

	:global(#chunk-record .chunk:nth-of-type(2)) {
		z-index: 2;
		transform: translate(0, -2px);
	}

	:global(#chunk-record .chunk:nth-of-type(3)) {
		z-index: 1;
		transform: translate(5%, -4px) rotate(-2deg);
	}
</style>
