<script>
	import Chunk from "$components/helpers/Chunk.svelte";
	export let title;
</script>

<div id="chunk-title">
	<h2>
		<Chunk text="welcome to" max="10" className="combo-user" />
		<Chunk text={title} max="1" className="combo-user" />
	</h2>
</div>

<style>
	h2 {
		display: flex;
		flex-direction: column;
		align-items: center;

		margin: 16px auto;
	}

	/* welcome to */
	:global(#chunk-title .chunk:nth-of-type(1)) {
		font-size: 0.5em;
		transform: translate(-70%, 0) rotate(-5deg);
		z-index: 4;
	}

	/* words */
	:global(#chunk-title .chunk:nth-of-type(2)) {
		font-weight: var(--bold);
		transform: translate(-20%, -20%) rotate(0deg);
		z-index: 3;
	}

	/* against */
	:global(#chunk-title .chunk:nth-of-type(3)) {
		font-weight: var(--bold);
		transform: translate(35%, -25%) rotate(3deg);
		z-index: 2;
	}

	/* strangers */
	:global(#chunk-title .chunk:nth-of-type(4)) {
		font-weight: var(--bold);
		transform: translate(10%, -35%) rotate(1deg);
		z-index: 1;
	}
</style>
