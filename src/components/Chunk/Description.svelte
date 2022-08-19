<script>
	import Chunk from "$components/helpers/Chunk.svelte";
	export let text;
</script>

<p id="chunk-description">
	<Chunk {text} max="13" className="combo-default" />
</p>

<style>
	p {
		width: 150px;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	/* one random */
	:global(#chunk-description .chunk:nth-of-type(1)) {
		transform: translate(0%, 0);
		z-index: 8;
	}

	/* person a day */
	:global(#chunk-description .chunk:nth-of-type(2)) {
		transform: translate(-10%, -2px);
		z-index: 7;
		margin-bottom: 4px;
	}

	/* gets the */
	:global(#chunk-description .chunk:nth-of-type(3)) {
		transform: translate(20%, 0);
		z-index: 6;
	}

	/* chance to */
	:global(#chunk-description .chunk:nth-of-type(4)) {
		transform: translate(-10%, -2px);
		z-index: 5;
	}

	/* play against */
	:global(#chunk-description .chunk:nth-of-type(5)) {
		transform: translate(20%, -4px);
		z-index: 4;
	}

	/* the internet */
	:global(#chunk-description .chunk:nth-of-type(6)) {
		transform: translate(-10%, -6px);
		z-index: 3;
		margin-bottom: 4px;
	}

	/* in a game of */
	:global(#chunk-description .chunk:nth-of-type(7)) {
		transform: translate(-20%, 0);
		z-index: 2;
	}

	/* words */
	:global(#chunk-description .chunk:nth-of-type(8)) {
		transform: translate(50%, -5px) rotate(-8deg);
		z-index: 1;
	}

	@media only screen and (min-width: 640px) {
		p {
			/* width:  */
		}
	}
</style>
