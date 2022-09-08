<script>
	import Chunk from "$components/helpers/Chunk.svelte";
	export let text;
	export let number = 1;
</script>

<h2 id="chunk-title">
	<Chunk text="welcome to" max="10" className="combo-user" />
	<Chunk {text} max="1" className="combo-user" />
	<Chunk text="#{number}" max="4" className="combo-wod" />
</h2>

<style>
	h2 {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin: 16px auto;
	}

	/* welcome to */
	:global(#chunk-title .chunk:nth-of-type(1)) {
		font-size: var(--16px);
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

	/* #X */
	:global(#chunk-title .chunk:nth-of-type(5)) {
		font-size: var(--16px);
		transform: translate(6.75rem, -500%) rotate(3deg);
		z-index: 0;
	}
</style>
