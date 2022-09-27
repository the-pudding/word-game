<script>
	import Chunk from "$components/helpers/Chunk.svelte";
	export let text;
</script>

<p id="chunk-possible">
	{@html text}
</p>

<style>
	p {
		width: 18.75rem;
		margin: 0 auto;
	}

	/* there were X thousand possible words. */
	:global(#chunk-possible .chunk:nth-of-type(1)) {
		transform: translate(-5%, 0) rotate(0deg);
		z-index: 3;
	}

	/* x possible words */
	:global(#chunk-possible .chunk:nth-of-type(2)) {
		transform: translate(5%, -2px) rotate(0deg);
		z-index: 2;
	}

	/* that satifisfied the clue */
	:global(#chunk-possible .chunk:nth-of-type(3)) {
		transform: translate(-5%, -4px) rotate(0deg);
		z-index: 1;
	}
</style>
