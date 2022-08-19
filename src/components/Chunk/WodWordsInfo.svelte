<script>
	import Chunk from "$components/helpers/Chunk.svelte";
	export let lines;
</script>

<p id="chunk-wod-words-info">
	{#each lines as text}
		<Chunk {text} max="15" className="combo-wod" />
	{/each}
</p>

<style>
	/* some words */
	:global(#chunk-wod-words-info .chunk:nth-of-type(1)) {
		transform: translate(0, 0) rotate(0deg);
		z-index: 3;
	}

	/* name got */
	:global(#chunk-wod-words-info .chunk:nth-of-type(2)) {
		transform: translate(-5%, -2px) rotate(0deg);
		z-index: 2;
	}

	/* that you didn't */
	:global(#chunk-wod-words-info .chunk:nth-of-type(3)) {
		transform: translate(5%, -4px) rotate(0deg);
		z-index: 1;
		margin-bottom: 4px;
	}
</style>
