<script>
	import Chunk from "$components/helpers/Chunk.svelte";
	export let lines;
</script>

<p id="chunk-common-words-info">
	{#each lines as text}
		<Chunk {text} max="15" className="combo-wod" />
	{/each}
</p>

<style>
	/* common */
	:global(#chunk-common-words-info .chunk:nth-of-type(1)) {
		transform: translate(-5%, 0) rotate(0deg);
		z-index: 3;
	}

	/* words that */
	:global(#chunk-common-words-info .chunk:nth-of-type(2)) {
		transform: translate(0%, -2px) rotate(0deg);
		z-index: 2;
	}

	/* nobody got */
	:global(#chunk-common-words-info .chunk:nth-of-type(3)) {
		transform: translate(-5%, -4px) rotate(0deg);
		z-index: 1;
		margin-bottom: 4px;
	}
</style>
