<script>
	import Chunk from "$components/helpers/Chunk.svelte";
	export let text;
</script>

<p id="chunk-possible">
	<Chunk {text} className="combo-default" max="30" />
</p>

<style>
	p {
		width: 300px;
		margin: 0 auto;
	}

	/* in round x there were */
	:global(#chunk-possible .chunk:nth-of-type(1)) {
		transform: translate(-10%, 0) rotate(0deg);
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
