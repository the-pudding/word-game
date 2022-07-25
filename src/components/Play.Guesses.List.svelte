<script>
	import Item from "$components/Play.Guesses.Item.svelte";
	export let guesses;
	export let wod = false;
	export let liHeight;
	export let startOffset;
</script>

<ul class:wod>
	{#each guesses as { valid, text, revealWod, points } (text)}
		<!-- TODO pass height to item -->
		<Item {wod} {valid} {text} {revealWod} {points} {liHeight} {startOffset} />
	{/each}
</ul>

<style>
	ul {
		width: calc(50%);
		display: flex;
		flex-direction: column-reverse;
		justify-content: flex-start;
		align-items: flex-start;
		transition: transform 0.5s ease-out;
		transform: translate(0, var(--offsetY));
	}

	.wod {
		align-items: flex-end;
	}
</style>
