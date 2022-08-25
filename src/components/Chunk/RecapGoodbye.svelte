<script>
	import Chunk from "$components/helpers/Chunk.svelte";
	export let text;
</script>

<p id="chunk-recap-goodbye">
	<Chunk {text} max="30" className="combo-default" />
</p>

<style>
	p {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-bottom: 32px;
	}

	:global(#chunk-recap-goodbye .chunk:nth-of-type(1)) {
		transform: translate(0, 0);
		z-index: 2;
	}

	:global(#chunk-recap-goodbye .chunk:nth-of-type(2)) {
		transform: translate(5%, 0) rotate(2deg);
		z-index: 1;
	}
</style>
