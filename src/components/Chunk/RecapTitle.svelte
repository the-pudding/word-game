<script>
	import Chunk from "$components/helpers/Chunk.svelte";
	export let lines;
	export let winner;
</script>

<h3 id="chunk-recap-title">
	{#each lines as text}
		<Chunk {text} max="20" className="combo-{winner}" />
	{/each}
</h3>

<style>
	h3 {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin: 32px auto 16px auto;
		font-weight: var(--bold);
	}

	:global(#chunk-recap-title .chunk:nth-of-type(1)) {
		transform: translate(0, 0) rotate(-1deg);
		z-index: 2;
	}

	:global(#chunk-recap-title .chunk:nth-of-type(2)) {
		transform: translate(20%, 0) rotate(2deg);
		margin-top: 8px;
		z-index: 1;
	}
</style>
