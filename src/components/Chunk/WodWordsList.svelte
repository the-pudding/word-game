<script>
	import Chunk from "$components/helpers/Chunk.svelte";
	export let text;
</script>

<p id="chunk-wod-words-list">
	<Chunk {text} max="1" className="combo-default" />
</p>

<style>
	:global(#chunk-wod-words-list .chunk:nth-of-type(1)) {
		transform: translate(-2%, 0) rotate(0deg);
		z-index: 5;
	}

	:global(#chunk-wod-words-list .chunk:nth-of-type(2)) {
		transform: translate(-4%, -2px) rotate(0deg);
		z-index: 4;
	}

	:global(#chunk-wod-words-list .chunk:nth-of-type(3)) {
		transform: translate(0, -4px) rotate(0deg);
		z-index: 3;
	}

	:global(#chunk-wod-words-list .chunk:nth-of-type(4)) {
		transform: translate(4%, -6px) rotate(0deg);
		z-index: 2;
	}

	:global(#chunk-wod-words-list .chunk:nth-of-type(5)) {
		transform: translate(2%, -8px) rotate(0deg);
		z-index: 1;
	}
</style>
