<script>
	import Chunk from "$components/helpers/Chunk.svelte";
	export let text;
</script>

<p id="chunk-common-words-list">
	<Chunk {text} max="1" className="combo-default" />
</p>

<style>
	:global(#chunk-common-words-list .chunk:nth-of-type(1)) {
		transform: translate(0, 0) rotate(0deg);
		z-index: 5;
	}

	:global(#chunk-common-words-list .chunk:nth-of-type(2)) {
		transform: translate(2%, -2px) rotate(0deg);
		z-index: 4;
	}

	:global(#chunk-common-words-list .chunk:nth-of-type(3)) {
		transform: translate(4%, -4px) rotate(0deg);
		z-index: 3;
	}

	:global(#chunk-common-words-list .chunk:nth-of-type(4)) {
		transform: translate(-2%, -6px) rotate(0deg);
		z-index: 2;
	}

	:global(#chunk-common-words-list .chunk:nth-of-type(5)) {
		transform: translate(-4%, -8px) rotate(0deg);
		z-index: 1;
	}
</style>
